import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { fetchAlbumTracks, getCachedAlbumTracks } from "../utils/itunes";

const getAlbumKey = (album) => (album ? `${album.title}::${album.artist}` : "");

function IpodWindow({ player, library: musicLibrary = [], actions }) {
  const [progress, setProgress] = useState(18);
  const [tracks, setTracks] = useState([]);
  const [tracksStatus, setTracksStatus] = useState("idle");
  const sliderRef = useRef(null);
  const currentAlbum = player?.current ?? null;
  const queue = player?.queue ?? [];
  const library = musicLibrary.length > 0 ? musicLibrary : player?.library ?? [];
  const isPlaying = Boolean(player?.isPlaying);
  const currentKey = getAlbumKey(currentAlbum);
  const statusText = isPlaying ? "Now playing" : "Paused";
  const sliderAlbums = useMemo(() => {
    if (!currentAlbum) {
      return [];
    }

    const source = library.length > 0 ? library : [currentAlbum, ...queue];
    const uniqueAlbums = source.filter(
      (album, index, albums) =>
        album && albums.findIndex((candidate) => getAlbumKey(candidate) === getAlbumKey(album)) === index,
    );

    if (uniqueAlbums.length <= 1) {
      return [{ album: currentAlbum, offset: 0 }];
    }

    const activeIndex = Math.max(
      0,
      uniqueAlbums.findIndex((album) => getAlbumKey(album) === currentKey),
    );

    if (uniqueAlbums.length < 5) {
      return uniqueAlbums
        .map((album, index) => ({
          album,
          offset: index - activeIndex,
        }))
        .filter(({ offset }) => Math.abs(offset) <= 2);
    }

    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = (activeIndex + offset + uniqueAlbums.length) % uniqueAlbums.length;
      return {
        album: uniqueAlbums[index],
        offset,
      };
    });
  }, [currentAlbum, currentKey, library, queue]);

  useEffect(() => {
    setProgress(18);
  }, [currentKey]);

  useEffect(() => {
    if (!currentAlbum) {
      setTracks([]);
      setTracksStatus("idle");
      return undefined;
    }

    let ignore = false;
    const cachedTracks = getCachedAlbumTracks(currentAlbum);

    if (cachedTracks) {
      setTracks(cachedTracks);
      setTracksStatus("done");
      return undefined;
    }

    setTracks([]);
    setTracksStatus(currentAlbum.appleCollectionId ? "loading" : "done");

    if (!currentAlbum.appleCollectionId) {
      return undefined;
    }

    fetchAlbumTracks(currentAlbum).then((nextTracks) => {
      if (ignore) return;
      setTracks(nextTracks);
      setTracksStatus("done");
    });

    return () => {
      ignore = true;
    };
  }, [currentAlbum]);

  useLayoutEffect(() => {
    const cards = sliderRef.current?.querySelectorAll(".ipod-cover-card");

    if (!cards?.length) {
      return undefined;
    }

    gsap.to(
      cards,
      {
        x: (_index, card) => Number(card.dataset.offset) * 44,
        scale: (_index, card) => (card.dataset.offset === "0" ? 1 : 0.72),
        opacity: (_index, card) => {
          const offset = Math.abs(Number(card.dataset.offset));
          if (offset === 0) return 1;
          return offset > 1 ? 0.34 : 0.72;
        },
        rotateY: (_index, card) => Number(card.dataset.offset) * -8,
        zIndex: (_index, card) => 10 - Math.abs(Number(card.dataset.offset)),
        duration: 0.42,
        ease: "power3.out",
        overwrite: "auto",
      },
    );

    return () => gsap.killTweensOf(cards);
  }, [sliderAlbums]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const intervalId = window.setInterval(() => {
      setProgress((value) => (value >= 98 ? 2 : value + 1));
    }, 900);

    return () => window.clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="window-body ipod-body">
      <div className="ipod-device" aria-label="iPod music player">
        <div className="ipod-top-glint" aria-hidden="true" />
        <section className="ipod-screen" aria-live="polite">
          <div className="ipod-screen-bar">
            <span>iPod</span>
            <span>{statusText}</span>
          </div>

          {currentAlbum ? (
            <>
              <div className="ipod-cover-slider" ref={sliderRef} aria-label="Album covers">
                {sliderAlbums.map(({ album, offset }) => (
                  <div
                    className={`ipod-cover-card${offset === 0 ? " is-active" : ""}`}
                    data-offset={offset}
                    key={getAlbumKey(album)}
                    style={{
                      "--offset": offset,
                      opacity: offset === 0 ? 1 : Math.abs(offset) > 1 ? 0.34 : 0.72,
                      transform: `translateX(${offset * 44}px) scale(${offset === 0 ? 1 : 0.72}) rotateY(${offset * -8}deg)`,
                      zIndex: 10 - Math.abs(offset),
                    }}
                  >
                    {album.cover ? (
                      <img src={album.cover} alt={`${album.title} cover`} draggable="false" />
                    ) : (
                      <span className="ipod-cover-fallback" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              <div className="ipod-album-heading">
                <strong>{currentAlbum.title}</strong>
                <p>{currentAlbum.artist}</p>
              </div>
            </>
          ) : (
            <div className="ipod-empty-state">
              <strong>No album selected</strong>
              <p>Pick an album from About me.</p>
            </div>
          )}

          <div className="ipod-progress" aria-label="Playback progress">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="ipod-track-list">
            {tracksStatus === "loading" ? (
              <p className="ipod-track-placeholder">Loading songs...</p>
            ) : tracks.length > 0 ? (
              tracks.slice(0, 8).map((track, index) => (
                <p key={track.id ?? `${track.title}-${index}`}>
                  <small>{track.number ?? index + 1}</small>
                  <span>{track.title}</span>
                  {track.duration && <em>{track.duration}</em>}
                </p>
              ))
            ) : (
              <p className="ipod-track-placeholder">No track list cached yet.</p>
            )}
          </div>
        </section>

        <section className="ipod-wheel" aria-label="iPod controls">
          <button className="ipod-wheel-menu" type="button" onClick={actions?.onTogglePlay}>
            Menu
          </button>
          <button
            className="ipod-wheel-prev"
            type="button"
            aria-label="Previous album"
            onClick={actions?.onPrevious}
          >
            ◀◀
          </button>
          <button
            className="ipod-wheel-next"
            type="button"
            aria-label="Next album"
            onClick={actions?.onNext}
          >
            ▶▶
          </button>
          <button className="ipod-wheel-play" type="button" onClick={actions?.onTogglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            className={`ipod-wheel-center${isPlaying ? " is-playing" : ""}`}
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={actions?.onTogglePlay}
          >
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default IpodWindow;
