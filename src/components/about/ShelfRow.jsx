import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { fetchMusicArtwork, getCachedMusicArtwork } from "../../utils/itunes";
import { fetchMoviePoster, hasTmdbCredentials, warnMissingTmdbCredentials } from "../../utils/tmdb";
import MusicActionMenu from "./MusicActionMenu";

function ShelfRow({
  type,
  label,
  externalLabel,
  externalHref,
  items,
  activeFilter,
  onFilterChange,
  onMusicAction,
  activeMusicKey,
}) {
  const filterbarRef = useRef(null);
  const filterButtonRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, width: 0, x: 0 });
  const [musicCovers, setMusicCovers] = useState({});
  const [moviePosters, setMoviePosters] = useState({});
  const [moviePosterRequests, setMoviePosterRequests] = useState({});
  const [moviePosterLoadState, setMoviePosterLoadState] = useState({});
  const [musicActionMenu, setMusicActionMenu] = useState(null);
  const years = useMemo(
    () => [...new Set(items.map((item) => item.year))].sort((left, right) => right.localeCompare(left)),
    [items],
  );
  const favoriteCount = items.filter((item) => item.favorite).length;
  const filterOptions = [
    ...(favoriteCount > 0 ? [{ id: "favorites", label: `${label} (${favoriteCount})`, icon: "★" }] : []),
    ...years.map((year) => ({
      id: year,
      label: `${year} (${items.filter((item) => item.year === year).length})`,
    })),
  ];
  const filteredItems = useMemo(
    () =>
      activeFilter === "favorites"
        ? items.filter((item) => item.favorite)
        : items.filter((item) => item.year === activeFilter),
    [activeFilter, items],
  );

  useEffect(() => {
    if (type !== "music") {
      return undefined;
    }

    let ignore = false;
    const cachedEntries = filteredItems
      .map((item) => [`${item.title}::${item.artist}`, getCachedMusicArtwork(item)])
      .filter(([, coverUrl]) => coverUrl);

    if (cachedEntries.length > 0) {
      setMusicCovers((current) => {
        const next = { ...current };
        let changed = false;

        cachedEntries.forEach(([key, coverUrl]) => {
          if (next[key] !== coverUrl) {
            next[key] = coverUrl;
            changed = true;
          }
        });

        return changed ? next : current;
      });
    }

    async function loadCovers() {
      for (const item of filteredItems) {
        if (ignore) {
          break;
        }

        const key = `${item.title}::${item.artist}`;
        const cachedCover = getCachedMusicArtwork(item);

        if (cachedCover) {
          continue;
        }

        const artworkUrl = await fetchMusicArtwork(item);

        if (ignore || !artworkUrl) {
          continue;
        }

        setMusicCovers((current) =>
          current[key] === artworkUrl
            ? current
            : {
                ...current,
                [key]: artworkUrl,
              },
        );
      }
    }

    const timeoutId = window.setTimeout(loadCovers, 450);

    return () => {
      ignore = true;
      window.clearTimeout(timeoutId);
    };
  }, [activeFilter, filteredItems, type]);

  useEffect(() => {
    if (type !== "movies") {
      return undefined;
    }

    if (!hasTmdbCredentials()) {
      warnMissingTmdbCredentials();
      setMoviePosterRequests((current) => {
        const next = { ...current };
        let changed = false;

        filteredItems.forEach((item) => {
          if (next[item.title] !== "done") {
            next[item.title] = "done";
            changed = true;
          }
        });

        return changed ? next : current;
      });
      return undefined;
    }

    let ignore = false;

    setMoviePosterRequests((current) => {
      const next = { ...current };
      let changed = false;

      filteredItems.forEach((item) => {
        if (next[item.title] !== "loading" && next[item.title] !== "done") {
          next[item.title] = "loading";
          changed = true;
        }
      });

      return changed ? next : current;
    });

    async function loadPosters() {
      const entries = await Promise.all(
        filteredItems.map(async (item) => {
          try {
            return [item.title, await fetchMoviePoster(item.title)];
          } catch (error) {
            console.warn(`Could not load poster for "${item.title}".`, error);
            return [item.title, null];
          }
        }),
      );

      if (ignore) {
        return;
      }

      setMoviePosters((current) => {
        const next = { ...current };
        let changed = false;

        entries.forEach(([title, posterUrl]) => {
          if (posterUrl && next[title] !== posterUrl) {
            next[title] = posterUrl;
            changed = true;
          }
        });

        return changed ? next : current;
      });

      setMoviePosterRequests((current) => {
        const next = { ...current };
        let changed = false;

        entries.forEach(([title]) => {
          if (next[title] !== "done") {
            next[title] = "done";
            changed = true;
          }
        });

        return changed ? next : current;
      });
    }

    loadPosters();

    return () => {
      ignore = true;
    };
  }, [activeFilter, filteredItems, type]);

  const setMoviePosterImageState = useCallback((title, src, status) => {
    setMoviePosterLoadState((current) => {
      const currentState = current[title];

      if (currentState?.src === src && currentState.status === status) {
        return current;
      }

      return {
        ...current,
        [title]: { src, status },
      };
    });
  }, []);

  const handleMoviePosterLoad = useCallback(
    (event, title, src) => {
      const image = event.currentTarget;
      const markLoaded = () => setMoviePosterImageState(title, src, "loaded");

      if (image.decode) {
        image.decode().then(markLoaded).catch(markLoaded);
        return;
      }

      markLoaded();
    },
    [setMoviePosterImageState],
  );

  const handleMoviePosterError = useCallback(
    (title, src) => {
      setMoviePosterImageState(title, src, "failed");
    },
    [setMoviePosterImageState],
  );

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeButton = filterButtonRefs.current[activeFilter];
      const filterbar = filterbarRef.current;

      if (!activeButton || !filterbar) {
        setIndicatorStyle({ opacity: 0, width: 0, x: 0 });
        return;
      }

      setIndicatorStyle({
        opacity: 1,
        width: activeButton.offsetWidth,
        x: activeButton.offsetLeft,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeFilter, items]);

  const gridClassName = [
    "media-grid",
    "shelf-grid",
    type === "music" ? "music-grid" : "",
    activeFilter === "favorites" ? "favorites-grid" : "",
    activeFilter !== "favorites" ? "year-grid" : "",
    type === "movies" ? "movie-grid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderMediaVisual = (item) => {
    if (type === "movies") {
      const posterSrc = moviePosters[item.title] ?? item.cover;
      const requestState = moviePosterRequests[item.title];
      const imageState = moviePosterLoadState[item.title];
      const isLoaded =
        Boolean(posterSrc) && imageState?.src === posterSrc && imageState.status === "loaded";
      const isFailed =
        Boolean(posterSrc) && imageState?.src === posterSrc && imageState.status === "failed";
      const isUnavailable = !posterSrc && requestState === "done";
      const isLoading = !isLoaded && !isFailed && !isUnavailable;

      return (
        <span
          className={[
            "poster-frame",
            isLoaded ? "is-loaded" : "",
            isLoading ? "is-loading" : "",
            isFailed || isUnavailable ? "is-empty" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-busy={isLoading}
        >
          <span className="poster-loader" aria-hidden="true" />
          {posterSrc && !isFailed && (
            <img
              className="movie-poster-image"
              draggable="false"
              src={posterSrc}
              alt={`${item.title} poster`}
              aria-hidden={!isLoaded}
              onLoad={(event) => handleMoviePosterLoad(event, item.title, posterSrc)}
              onError={() => handleMoviePosterError(item.title, posterSrc)}
            />
          )}
        </span>
      );
    }

    const coverSrc =
      musicCovers[`${item.title}::${item.artist}`] ?? item.coverUrl ?? item.cover ?? getCachedMusicArtwork(item);

    return coverSrc ? (
      <img draggable="false" src={coverSrc} alt={`${item.title} cover`} />
    ) : (
      <span className="album-frame" aria-hidden="true" />
    );
  };

  const closeMusicActionMenu = useCallback(() => {
    setMusicActionMenu(null);
  }, []);

  const handleMusicCardClick = useCallback(
    (event, item) => {
      if (type !== "music") return;

      const card = event.currentTarget;
      const cover = card.querySelector(":scope > img, :scope > .album-frame");
      const rect = (cover ?? card).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const side = window.innerWidth - centerX > 190 ? "right" : "left";
      const x = Math.min(Math.max(centerX, 96), window.innerWidth - 96);
      const y = Math.min(Math.max(centerY, 96), window.innerHeight - 96);

      setMusicActionMenu({ item, side, x, y });
    },
    [type],
  );

  const handleMusicAction = useCallback(
    (action, item) => {
      onMusicAction?.(action, item);
      closeMusicActionMenu();
    },
    [closeMusicActionMenu, onMusicAction],
  );

  const renderMediaCard = (item, index) => {
    const itemKey = `${item.title}::${item.artist}`;
    const className = [
      "media-card",
      type === "movies" ? "movie-card" : "",
      type === "music" ? "music-card" : "",
      item.favorite ? "favorite-card" : "",
      type === "music" && activeMusicKey === itemKey ? "is-playing-album" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const style = { "--item-delay": `${Math.min(index, 12) * 26}ms` };
    const content = (
      <>
        <span className="favorite-badge" aria-label={item.favorite ? "Favorite" : "Not favorite"}>
          {item.favorite ? "★" : ""}
        </span>
        {renderMediaVisual(item)}
        {type !== "movies" && (
          <>
            <strong>{item.title}</strong>
            {item.artist && <span>{item.artist}</span>}
          </>
        )}
      </>
    );

    if (type === "music") {
      return (
        <button
          aria-haspopup="menu"
          className={className}
          key={`${item.year}-${item.title}`}
          onClick={(event) => handleMusicCardClick(event, item)}
          style={style}
          type="button"
        >
          {content}
        </button>
      );
    }

    return (
      <a
        className={className}
        href={item.href}
        key={`${item.year}-${item.title}`}
        rel="noreferrer"
        style={style}
        target="_blank"
      >
        {content}
      </a>
    );
  };

  return (
    <div className="shelf-row">
      <div ref={filterbarRef} className="shelf-filterbar" aria-label={`${label} filters`}>
        <span
          className="shelf-active-indicator"
          aria-hidden="true"
          style={{
            opacity: indicatorStyle.opacity,
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.x}px)`,
          }}
        />
        {filterOptions.map((option) => (
          <button
            ref={(node) => {
              filterButtonRefs.current[option.id] = node;
            }}
            className={activeFilter === option.id ? "is-active" : ""}
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
          >
            {option.icon && <span aria-hidden="true">{option.icon}</span>}
            {option.label}
          </button>
        ))}
        <a className="shelf-external-link" href={externalHref} rel="noreferrer" target="_blank">
          {externalLabel} ↗
        </a>
      </div>

      <div key={`${type}-${activeFilter}`} className={gridClassName}>
        {filteredItems.map((item, index) => renderMediaCard(item, index))}
      </div>
      {type === "music" && (
        <MusicActionMenu
          menu={musicActionMenu}
          onAction={handleMusicAction}
          onClose={closeMusicActionMenu}
        />
      )}
    </div>
  );
}

export default ShelfRow;
