import { useEffect, useRef, useState } from "react";
import DesktopDock from "./components/DesktopDock";
import DesktopIcons from "./components/DesktopIcons";
import IntroNote from "./components/IntroNote";
import LightingScene from "./components/LightingScene";
import MenuBar from "./components/MenuBar";
import WindowManager from "./components/WindowManager";
import portraitImage from "../assets/polaroid-portrait.webp";
import portraitImageTwo from "../assets/polaroid-portrait-2.jpg";
import { experiences, musicItems, techStack } from "./data/aboutData";
import { projectShowcases } from "./data/projectData";
import { getInitialLightingMode } from "./utils/lightingMode";

const getAlbumKey = (album) => (album ? `${album.title}::${album.artist}` : "");

const normalizeAlbum = (album) => ({
  ...album,
  cover: album.coverUrl ?? album.cover ?? null,
});

const playableAlbums = musicItems.map(normalizeAlbum);
const initialAlbum = playableAlbums.find((album) => album.favorite) ?? playableAlbums[0] ?? null;
const initialQueue = playableAlbums
  .filter((album) => album.favorite && getAlbumKey(album) !== getAlbumKey(initialAlbum))
  .slice(0, 4);

const collectDeferredImageUrls = () => {
  const urls = new Set([portraitImage, portraitImageTwo]);

  experiences.forEach((experience) => {
    if (experience.logo) urls.add(experience.logo);
  });

  techStack.forEach((tech) => {
    if (tech.icon) urls.add(tech.icon);
  });

  projectShowcases.forEach((project) => {
    if (project.image) urls.add(project.image);
    project.images?.forEach((image) => urls.add(image));
    project.detailImages?.forEach((item) => {
      if (item.image) urls.add(item.image);
    });
  });

  return Array.from(urls);
};

const deferredImageUrls = collectDeferredImageUrls();

function App() {
  const [mode, setMode] = useState(getInitialLightingMode);
  const [activeWindows, setActiveWindows] = useState({});
  const [zIndices, setZIndices] = useState({});
  const [windowPositions, setWindowPositions] = useState({});
  const [iconPositions, setIconPositions] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [musicPlayer, setMusicPlayer] = useState({
    current: initialAlbum,
    queue: initialQueue,
    isPlaying: false,
    library: playableAlbums,
  });
  const topZ = useRef(60);

  useEffect(() => {
    let imageRequests = [];

    const preloadImages = () => {
      imageRequests = deferredImageUrls.map((url) => {
        const image = new Image();
        image.decoding = "async";
        image.src = url;
        return image;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadImages, { timeout: 2400 });
      return () => {
        window.cancelIdleCallback(idleId);
        imageRequests = [];
      };
    }

    const timeoutId = window.setTimeout(preloadImages, 700);
    return () => {
      window.clearTimeout(timeoutId);
      imageRequests = [];
    };
  }, []);

  const scrollWindowContentToTop = (id, behavior = "auto") => {
    const contentSelectorById = {
      aboutWindow: ".about-shell",
      projectsWindow: ".projects-body",
    };
    const selector = contentSelectorById[id];

    if (!selector) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.querySelector(`#${id} ${selector}`)?.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : behavior,
        });
      });
    });
  };

  const bringToFront = (id) => {
    topZ.current += 1;
    setZIndices((current) => ({ ...current, [id]: topZ.current }));
  };

  const openWindow = (id, options = {}) => {
    setActiveWindows((current) => ({ ...current, [id]: true }));
    bringToFront(id);

    if (options.resetScroll !== false) {
      scrollWindowContentToTop(id);
    }

    if (window.matchMedia("(max-width: 900px)").matches) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
            block: "start",
          });
        });
      });
    }
  };

  const openProject = (projectId, options = {}) => {
    setSelectedProjectId(projectId);
    openWindow("projectsWindow", options);
  };

  const closeWindow = (id) => {
    setActiveWindows((current) => ({ ...current, [id]: false }));
  };

  const updateWindowPosition = (id, position) => {
    setWindowPositions((current) => ({ ...current, [id]: position }));
  };

  const updateIconPosition = (id, position) => {
    setIconPositions((current) => ({ ...current, [id]: position }));
  };

  const toggleMode = () => {
    setMode((current) => (current === "night" ? "sunset" : "night"));
  };

  const playAlbum = (album) => {
    const selected = normalizeAlbum(album);

    setMusicPlayer((current) => ({
      ...current,
      current: selected,
      queue: current.queue.filter((queuedAlbum) => getAlbumKey(queuedAlbum) !== getAlbumKey(selected)),
      isPlaying: true,
    }));
    openWindow("ipodWindow");
  };

  const playAlbumNext = (album) => {
    const selected = normalizeAlbum(album);

    setMusicPlayer((current) => {
      const selectedKey = getAlbumKey(selected);
      const queue = current.queue.filter((queuedAlbum) => getAlbumKey(queuedAlbum) !== selectedKey);

      if (!current.current) {
        return {
          ...current,
          current: selected,
          queue,
          isPlaying: true,
        };
      }

      return {
        ...current,
        queue: [selected, ...queue],
      };
    });
    openWindow("ipodWindow");
  };

  const addAlbumToQueue = (album) => {
    const selected = normalizeAlbum(album);

    setMusicPlayer((current) => {
      const selectedKey = getAlbumKey(selected);
      const alreadyQueued = current.queue.some((queuedAlbum) => getAlbumKey(queuedAlbum) === selectedKey);
      const isCurrent = current.current && getAlbumKey(current.current) === selectedKey;

      if (alreadyQueued || isCurrent) {
        return current;
      }

      return {
        ...current,
        queue: [...current.queue, selected],
      };
    });
    openWindow("ipodWindow");
  };

  const handleMusicAction = (action, album) => {
    if (action === "play") {
      playAlbum(album);
      return;
    }

    if (action === "next") {
      playAlbumNext(album);
      return;
    }

    addAlbumToQueue(album);
  };

  const playNextAlbum = () => {
    setMusicPlayer((current) => {
      if (current.queue.length > 0) {
        const [nextAlbum, ...queue] = current.queue;
        return {
          current: nextAlbum,
          queue,
          isPlaying: true,
        };
      }

      if (!current.current || playableAlbums.length === 0) {
        return current;
      }

      const currentIndex = playableAlbums.findIndex(
        (album) => getAlbumKey(album) === getAlbumKey(current.current),
      );
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % playableAlbums.length : 0;

      return {
        ...current,
        current: playableAlbums[nextIndex],
        isPlaying: true,
      };
    });
  };

  const playPreviousAlbum = () => {
    setMusicPlayer((current) => {
      if (!current.current || playableAlbums.length === 0) {
        return current;
      }

      const currentIndex = playableAlbums.findIndex(
        (album) => getAlbumKey(album) === getAlbumKey(current.current),
      );
      const previousIndex =
        currentIndex > 0 ? currentIndex - 1 : Math.max(0, playableAlbums.length - 1);

      return {
        ...current,
        current: playableAlbums[previousIndex],
        isPlaying: true,
      };
    });
  };

  const toggleMusicPlayback = () => {
    setMusicPlayer((current) => {
      if (!current.current) {
        return {
          ...current,
          current: initialAlbum,
          isPlaying: Boolean(initialAlbum),
        };
      }

      return {
        ...current,
        isPlaying: !current.isPlaying,
      };
    });
  };

  return (
    <>
      <LightingScene mode={mode} />
      <main className="desktop-shell" id="desktop">
        <MenuBar mode={mode} onOpenWindow={openWindow} onToggleMode={toggleMode} />
        <IntroNote />
        <DesktopIcons
          iconPositions={iconPositions}
          openWindow={openWindow}
          updateIconPosition={updateIconPosition}
        />
        <DesktopDock activeWindows={activeWindows} openWindow={openWindow} />
        <WindowManager
          activeWindows={activeWindows}
          zIndices={zIndices}
          windowPositions={windowPositions}
          selectedProjectId={selectedProjectId}
          musicLibrary={playableAlbums}
          musicPlayer={musicPlayer}
          musicPlayerActions={{
            onMusicAction: handleMusicAction,
            onNext: playNextAlbum,
            onPrevious: playPreviousAlbum,
            onTogglePlay: toggleMusicPlayback,
          }}
          bringToFront={bringToFront}
          closeWindow={closeWindow}
          openProject={openProject}
          updateWindowPosition={updateWindowPosition}
        />
      </main>
    </>
  );
}

export default App;
