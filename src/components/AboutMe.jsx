import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { experiences, movieItems, musicItems, navItems, techStack } from "../data/aboutData";
import AboutHero from "./about/AboutHero";
import AboutSidebar from "./about/AboutSidebar";
import ExperienceSection from "./about/ExperienceSection";
import ProximityStackGrid from "./about/ProximityStackGrid";
import ShelfRow from "./about/ShelfRow";

export { musicItems } from "../data/aboutData";


function AboutMe({ musicPlayer, onMusicAction, onOpenProject }) {
  const [printRun, setPrintRun] = useState(0);
  const [isPhotoFree, setIsPhotoFree] = useState(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [isShuttering, setIsShuttering] = useState(false);
  const [photoOffset, setPhotoOffset] = useState({ x: 0, y: 0 });
  const [textShape, setTextShape] = useState({ active: false });
  const [activeSection, setActiveSection] = useState("hello");
  const [shelfFilters, setShelfFilters] = useState({ music: "favorites", movies: "favorites" });
  const dragStartRef = useRef(null);
  const photoRef = useRef(null);
  const introRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRefs = useRef({});
  const isPrinted = printRun > 0;

  const setSectionRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  const updateTextShape = useCallback(() => {
    if (!isPhotoFree || !photoRef.current || !introRef.current) {
      setTextShape({ active: false });
      return;
    }

    const photoRect = photoRef.current.getBoundingClientRect();
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
  }, [isPhotoFree]);

  const printPhoto = () => {
    setIsPhotoFree(false);
    setIsDraggingPhoto(false);
    setPhotoOffset({ x: 0, y: 0 });
    setTextShape({ active: false });

    if (!isPrinted) {
      setPrintRun(1);
      return;
    }

    setPrintRun(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setPrintRun((current) => current + 1));
    });
  };

  const handleShutterClick = (event) => {
    event.stopPropagation();
    setIsShuttering(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsShuttering(true);
        printPhoto();
      });
    });
  };

  const handlePrintEnd = () => {
    setIsPhotoFree(true);
    window.requestAnimationFrame(updateTextShape);
  };

  const handlePhotoPointerDown = (event) => {
    if (!isPhotoFree) {
      return;
    }

    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: photoOffset.x,
      originY: photoOffset.y,
    };
    setIsDraggingPhoto(true);
  };

  const handlePhotoPointerMove = (event) => {
    const dragStart = dragStartRef.current;

    if (!dragStart || dragStart.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    setPhotoOffset({
      x: dragStart.originX + event.clientX - dragStart.startX,
      y: dragStart.originY + event.clientY - dragStart.startY,
    });
  };

  const handlePhotoPointerUp = (event) => {
    const dragStart = dragStartRef.current;

    if (!dragStart || dragStart.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    dragStartRef.current = null;
    setIsDraggingPhoto(false);
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
  }, [photoOffset, updateTextShape]);

  useLayoutEffect(() => {
    window.addEventListener("resize", updateTextShape);
    return () => window.removeEventListener("resize", updateTextShape);
  }, [updateTextShape]);

  return (
    <div className="window-body about-body">
      <div ref={contentRef} className="about-shell" onScroll={handleContentScroll}>
        <AboutSidebar activeSection={activeSection} navItems={navItems} onNavClick={handleNavClick} />

        <main className="about-content">
          <AboutHero
            sectionRef={setSectionRef("hello")}
            printRun={printRun}
            isPrinted={isPrinted}
            isPhotoFree={isPhotoFree}
            isDraggingPhoto={isDraggingPhoto}
            isShuttering={isShuttering}
            photoOffset={photoOffset}
            textShape={textShape}
            photoRef={photoRef}
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
