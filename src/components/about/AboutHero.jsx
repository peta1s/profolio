import cameraImage from "../../../assets/NowGen3.avif";
import PolaroidPhoto from "./PolaroidPhoto";

function AboutHero({
  sectionRef,
  printRun,
  isPrinted,
  isPhotoFree,
  isDraggingPhoto,
  isShuttering,
  photoOffset,
  textShape,
  photoRef,
  introRef,
  onShutterClick,
  onShutterAnimationEnd,
  onPrintEnd,
  onPhotoPointerDown,
  onPhotoPointerMove,
  onPhotoPointerUp,
}) {
  return (
    <section id="about-hello" ref={sectionRef} className="about-section about-hero">
      <div className="about-camera-stage">
        <div
          className={`instant-camera${isShuttering ? " is-shuttering" : ""}`}
          style={{ "--print-run": printRun }}
          onAnimationEnd={onShutterAnimationEnd}
        >
          <img className="camera-image" src={cameraImage} alt="Instant camera" />
          <div className={`paper-window${isPhotoFree ? " is-paper-free" : ""}`}>
            <PolaroidPhoto
              ref={photoRef}
              isPrinting={isPrinted}
              isFree={isPhotoFree}
              isDragging={isDraggingPhoto}
              offset={photoOffset}
              onPrintEnd={onPrintEnd}
              onPointerDown={onPhotoPointerDown}
              onPointerMove={onPhotoPointerMove}
              onPointerUp={onPhotoPointerUp}
            />
          </div>
          <button
            className="camera-shutter-hotspot"
            type="button"
            aria-label="Print portrait"
            onClick={onShutterClick}
          />
        </div>
      </div>

      <div ref={introRef} className="about-copy-card">
        <p className="section-eyebrow">Hello</p>
        <h1>I'm Petals</h1>
        <p className="about-hero-meta">
          <span className="about-hero-meta-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 3 2 8l10 5 10-5-10-5Z" />
              <path d="M6 10.6V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.4" />
              <path d="M22 8v6" />
            </svg>
          </span>
          <span>上海立信会计金融学院 数据科学与大数据技术专业</span>
        </p>
        <div className="about-text-flow">
          {textShape.active && (
            <span
              className={`photo-flow-shape is-${textShape.side}`}
              aria-hidden="true"
              style={{
                width: `${textShape.width}px`,
                height: `${textShape.height}px`,
                marginTop: `${textShape.top}px`,
                ...(textShape.side === "left"
                  ? { marginLeft: `${textShape.inset}px` }
                  : { marginRight: `${textShape.inset}px` }),
              }}
            />
          )}
          <p>
            我是一名偏前端与交互方向的开发者，喜欢把还不清晰的想法整理成可用、好看的产品。
            我在意安静的界面、自然的动效，以及那些会让工具变得更顺手的细节。
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
