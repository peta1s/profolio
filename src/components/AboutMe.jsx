import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import portraitImage from "../../assets/polaroid-portrait.webp";
import portraitImageTwo from "../../assets/polaroid-portrait-2.jpg";
import { experiences, movieItems, musicItems, navItems, techStack } from "../data/aboutData";
import AboutHero from "./about/AboutHero";
import AboutSidebar from "./about/AboutSidebar";
import ExperienceSection from "./about/ExperienceSection";
import ProximityStackGrid from "./about/ProximityStackGrid";
import ShelfRow from "./about/ShelfRow";

const PHOTO_DEVELOP_DURATION = 2450;
const POLAROID_PHOTOS = [
  {
    id: "portrait-one",
    imageSrc: portraitImage,
    finalRotate: "5deg",
    finalX: "-46.5%",
    finalY: "14%",
    stackIndex: 1,
  },
  {
    id: "portrait-two",
    imageSrc: portraitImageTwo,
    finalRotate: "3.5deg",
    finalX: "-46.5%",
    finalY: "14%",
    stackIndex: 2,
    imageFit: "cover",
    imageTop: "0",
    imageLeft: "0",
    imageWidth: "100%",
    imageHeight: "100%",
  },
];

function AboutMe({ musicPlayer, onMusicAction, onOpenProject }) {
  const [printRun, setPrintRun] = useState(0);
  const [printedPhotos, setPrintedPhotos] = useState([]);
  const [draggingPhotoId, setDraggingPhotoId] = useState(null);
  const [isShuttering, setIsShuttering] = useState(false);
  const [isPrintQueued, setIsPrintQueued] = useState(false);
  const [textShape, setTextShape] = useState({ active: false });
  const [activeSection, setActiveSection] = useState("hello");
  const [shelfFilters, setShelfFilters] = useState({ music: "favorites", movies: "favorites" });
  const dragStartRef = useRef(null);
  const developTimersRef = useRef({});
  const isPrintQueuedRef = useRef(false);
  const photoRefs = useRef({});
  const introRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRefs = useRef({});
  const isPrinted = printedPhotos.length > 0;
  const canPrintPhoto =
    !isPrintQueued &&
    printedPhotos.length < POLAROID_PHOTOS.length &&
    printedPhotos.every((photo) => photo.isFree);

  const setSectionRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  const updateTextShape = useCallback(() => {
    const latestFreePhoto = [...printedPhotos].reverse().find((photo) => photo.isFree);
    const latestPhotoRef = latestFreePhoto ? photoRefs.current[latestFreePhoto.id] : null;

    if (!latestFreePhoto || !latestPhotoRef || !introRef.current) {
      setTextShape({ active: false });
      return;
    }

    const photoRect = latestPhotoRef.getBoundingClientRect();
    const introRect = introRef.current.getBoundingClientRect();
    const overlapX = Math.max(
      0,
      Math.min(photoRect.right, introRect.right) - Math.max(photoRect.left, introRect.left),
    );
    const overlapY = Math.max(
      0,
      Math.min(photoRect.bottom, introRect.bottom) - Math.max(photoRect.top, introRect.top),
    );

    if (overlapX < 16 || overlapY < 16) {
      setTextShape({ active: false });
      return;
    }

    const gap = 14;
    const side =
      photoRect.left + photoRect.width / 2 < introRect.left + introRect.width / 2
        ? "left"
        : "right";
    const top = Math.max(0, Math.round(photoRect.top - introRect.top - gap / 2));
    const height = Math.min(
      Math.round(photoRect.height + gap),
      Math.max(0, Math.round(introRect.height - top)),
    );
    const width = Math.min(Math.round(photoRect.width + gap), Math.round(introRect.width - gap));
    const inset =
      side === "left"
        ? Math.max(0, Math.round(photoRect.left - introRect.left - gap / 2))
        : Math.max(0, Math.round(introRect.right - photoRect.right - gap / 2));

    setTextShape({ active: true, side, top, width, height, inset });
  }, [printedPhotos]);

  const printPhoto = () => {
    if (
      printedPhotos.length >= POLAROID_PHOTOS.length ||
      printedPhotos.some((photo) => !photo.isFree)
    ) {
      return;
    }

    const nextPhoto = POLAROID_PHOTOS[printedPhotos.length];
    window.clearTimeout(developTimersRef.current[nextPhoto.id]);
    setPrintRun((run) => run + 1);
    setDraggingPhotoId(null);
    setTextShape({ active: false });
    setPrintedPhotos((current) => [
      ...current,
      {
        ...nextPhoto,
        isFree: false,
        isDeveloped: false,
        offset: { x: 0, y: 0 },
      },
    ]);
  };

  const handleShutterClick = (event) => {
    event.stopPropagation();

    if (!canPrintPhoto || isPrintQueuedRef.current) {
      return;
    }

    isPrintQueuedRef.current = true;
    setIsPrintQueued(true);
    setIsShuttering(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsShuttering(true);
        printPhoto();
      });
    });
  };

  const handlePrintEnd = (photoId) => {
    isPrintQueuedRef.current = false;
    setIsPrintQueued(false);
    setPrintedPhotos((current) =>
      current.map((photo) => (photo.id === photoId ? { ...photo, isFree: true } : photo)),
    );

    window.clearTimeout(developTimersRef.current[photoId]);
    developTimersRef.current[photoId] = window.setTimeout(() => {
      setPrintedPhotos((current) =>
        current.map((photo) =>
          photo.id === photoId ? { ...photo, isDeveloped: true } : photo,
        ),
      );
      delete developTimersRef.current[photoId];
    }, PHOTO_DEVELOP_DURATION);
    window.requestAnimationFrame(updateTextShape);
  };

  const handlePhotoPointerDown = (photoId, event) => {
    const photo = printedPhotos.find((item) => item.id === photoId);

    if (!photo?.isFree) {
      return;
    }

    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerId: event.pointerId,
      photoId,
      startX: event.clientX,
      startY: event.clientY,
      originX: photo.offset.x,
      originY: photo.offset.y,
    };
    setDraggingPhotoId(photoId);
  };

  const handlePhotoPointerMove = (event) => {
    const dragStart = dragStartRef.current;

    if (!dragStart || dragStart.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    setPrintedPhotos((current) =>
      current.map((photo) =>
        photo.id === dragStart.photoId
          ? {
              ...photo,
              offset: {
                x: dragStart.originX + event.clientX - dragStart.startX,
                y: dragStart.originY + event.clientY - dragStart.startY,
              },
            }
          : photo,
      ),
    );
  };

  const handlePhotoPointerUp = (event) => {
    const dragStart = dragStartRef.current;

    if (!dragStart || dragStart.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    dragStartRef.current = null;
    setDraggingPhotoId(null);
  };

  const handleNavClick = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const handleShelfFilterChange = (type, filter) => {
    setShelfFilters((current) => ({ ...current, [type]: filter }));
  };

  const handleContentScroll = () => {
    const container = contentRef.current;

    if (!container) {
      return;
    }

    let nextActive = "hello";
    const containerRect = container.getBoundingClientRect();

    for (let index = navItems.length - 1; index >= 0; index -= 1) {
      const item = navItems[index];
      const section = sectionRefs.current[item.id];

      if (section && section.getBoundingClientRect().top - containerRect.top <= 120) {
        nextActive = item.id;
        break;
      }
    }

    setActiveSection(nextActive);
  };

  useLayoutEffect(() => {
    updateTextShape();
  }, [printedPhotos, updateTextShape]);

  useLayoutEffect(() => {
    window.addEventListener("resize", updateTextShape);
    return () => window.removeEventListener("resize", updateTextShape);
  }, [updateTextShape]);

  useEffect(() => {
    return () => {
      Object.values(developTimersRef.current).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    const sections = navItems
      .map((item) => sectionRefs.current[item.id])
      .filter(Boolean);

    if (!container || sections.length === 0) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return undefined;
    }

    container.classList.add("has-section-reveal");

    sections.forEach((section, index) => {
      section.classList.add("is-section-reveal");
      section.style.setProperty("--reveal-delay", `${Math.min(index * 55, 180)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        root: container,
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.16,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      container.classList.remove("has-section-reveal");
      sections.forEach((section) => {
        section.classList.remove("is-section-reveal", "is-revealed");
        section.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return (
    <div className="window-body about-body">
      <div ref={contentRef} className="about-shell" onScroll={handleContentScroll}>
        <AboutSidebar activeSection={activeSection} navItems={navItems} onNavClick={handleNavClick} />

        <main className="about-content">
          <AboutHero
            sectionRef={setSectionRef("hello")}
            printRun={printRun}
            isPrinted={isPrinted}
            photos={printedPhotos}
            draggingPhotoId={draggingPhotoId}
            isShuttering={isShuttering}
            canPrintPhoto={canPrintPhoto}
            textShape={textShape}
            photoRefs={photoRefs}
            introRef={introRef}
            onShutterClick={handleShutterClick}
            onShutterAnimationEnd={() => setIsShuttering(false)}
            onPrintEnd={handlePrintEnd}
            onPhotoPointerDown={handlePhotoPointerDown}
            onPhotoPointerMove={handlePhotoPointerMove}
            onPhotoPointerUp={handlePhotoPointerUp}
          />

          <ExperienceSection
            sectionRef={setSectionRef("experience")}
            experiences={experiences}
            onOpenProject={onOpenProject}
          />

          <section id="about-stack" ref={setSectionRef("stack")} className="about-section">
            <div className="section-heading">
              <p className="section-eyebrow">Stack</p>
              <p className="section-description">常用的开发工具与技术栈。</p>
            </div>
            <ProximityStackGrid items={techStack} />
          </section>

          <section id="about-music" ref={setSectionRef("music")} className="about-section shelf-section">
            <div className="section-heading">
              <p className="section-eyebrow">Music</p>
              <p className="section-description">★ - favorite</p>
            </div>
            <ShelfRow
              type="music"
              label="Music"
              externalLabel="NetEase"
              externalHref="https://music.163.com/"
              items={musicItems}
              activeFilter={shelfFilters.music}
              activeMusicKey={
                musicPlayer?.current
                  ? `${musicPlayer.current.title}::${musicPlayer.current.artist}`
                  : null
              }
              onFilterChange={(filter) => handleShelfFilterChange("music", filter)}
              onMusicAction={onMusicAction}
            />
          </section>

          <section id="about-movies" ref={setSectionRef("movies")} className="about-section shelf-section">
            <div className="section-heading">
              <p className="section-eyebrow">Movies</p>
              <p className="section-description">“电影发明以后，人类的生命，比起以前延长了至少三倍。”</p>
            </div>
            <ShelfRow
              type="movies"
              label="Movies"
              externalLabel="Douban"
              externalHref="https://movie.douban.com/"
              items={movieItems}
              activeFilter={shelfFilters.movies}
              onFilterChange={(filter) => handleShelfFilterChange("movies", filter)}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default AboutMe;
