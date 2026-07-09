import { useState } from "react";
import cameraImage from "../../../assets/NowGen3.avif";
import degreeIcon from "../../../assets/degree.svg";
import locationIcon from "../../../assets/location.svg";
import shutterNoteImage from "../../../assets/shutter-note.png";
import PolaroidPhoto from "./PolaroidPhoto";

function AboutHero({
  sectionRef,
  printRun,
  isPrinted,
  photos,
  draggingPhotoId,
  isShuttering,
  canPrintPhoto,
  textShape,
  photoRefs,
  introRef,
  onShutterClick,
  onShutterAnimationEnd,
  onPrintEnd,
  onPhotoPointerDown,
  onPhotoPointerMove,
  onPhotoPointerUp,
}) {
  const [isHintDismissed, setIsHintDismissed] = useState(false);
  const printingPhotos = photos.filter((photo) => !photo.isFree);
  const freePhotos = photos.filter((photo) => photo.isFree);
  const handleShutterClick = (event) => {
    if (!canPrintPhoto) {
      return;
    }

    setIsHintDismissed(true);
    onShutterClick?.(event);
  };

  return (
    <section id="about-hello" ref={sectionRef} className="about-section about-hero">
      <div className="about-camera-stage">
        <div
          className={`instant-camera${isShuttering ? " is-shuttering" : ""}`}
          style={{ "--print-run": printRun }}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) {
              onShutterAnimationEnd?.(event);
            }
          }}
        >
          <img className="camera-image" src={cameraImage} alt="Instant camera" />
          <div className="camera-flash-burst" aria-hidden="true" />
          {!isHintDismissed && (
            <div className="shutter-click-hint">
              <img src={shutterNoteImage} alt="" />
              <span>try clicking the button</span>
              <button
                className="shutter-click-hint-close"
                type="button"
                aria-label="Close shutter hint"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsHintDismissed(true);
                }}
              >
                ×
              </button>
            </div>
          )}
          <div className="paper-window">
            {printingPhotos.map((photo) => (
              <PolaroidPhoto
                key={photo.id}
                ref={(node) => {
                  photoRefs.current[photo.id] = node;
                }}
                imageSrc={photo.imageSrc}
                isPrinting={isPrinted}
                isFree={false}
                isDeveloping={false}
                isDeveloped={photo.isDeveloped}
                isDragging={false}
                offset={photo.offset}
                finalRotate={photo.finalRotate}
                finalX={photo.finalX}
                finalY={photo.finalY}
                stackIndex={photo.stackIndex}
                imageFit={photo.imageFit}
                imageTop={photo.imageTop}
                imageLeft={photo.imageLeft}
                imageWidth={photo.imageWidth}
                imageHeight={photo.imageHeight}
                onPrintEnd={() => onPrintEnd(photo.id)}
                onPointerDown={(event) => onPhotoPointerDown(photo.id, event)}
                onPointerMove={onPhotoPointerMove}
                onPointerUp={onPhotoPointerUp}
              />
            ))}
          </div>
          <div className="photo-free-layer">
            {freePhotos.map((photo) => (
              <PolaroidPhoto
                key={photo.id}
                ref={(node) => {
                  photoRefs.current[photo.id] = node;
                }}
                imageSrc={photo.imageSrc}
                isPrinting={isPrinted}
                isFree
                isDeveloping={!photo.isDeveloped}
                isDeveloped={photo.isDeveloped}
                isDragging={draggingPhotoId === photo.id}
                offset={photo.offset}
                finalRotate={photo.finalRotate}
                finalX={photo.finalX}
                finalY={photo.finalY}
                stackIndex={photo.stackIndex}
                imageFit={photo.imageFit}
                imageTop={photo.imageTop}
                imageLeft={photo.imageLeft}
                imageWidth={photo.imageWidth}
                imageHeight={photo.imageHeight}
                onPrintEnd={() => onPrintEnd(photo.id)}
                onPointerDown={(event) => onPhotoPointerDown(photo.id, event)}
                onPointerMove={onPhotoPointerMove}
                onPointerUp={onPhotoPointerUp}
              />
            ))}
          </div>
          <button
            className="camera-shutter-hotspot"
            type="button"
            aria-label="Print portrait"
            disabled={!canPrintPhoto}
            onClick={handleShutterClick}
          />
        </div>
      </div>

      <div ref={introRef} className="about-copy-card">
        <p className="section-eyebrow">Hello!</p>
        <h1>I'm Petals</h1>
        <div className="about-hero-meta">
          <span className="about-hero-meta-item">
            <span className="about-hero-meta-icon" aria-hidden="true">
              <img src={degreeIcon} alt="" />
            </span>
            <span className="about-hero-meta-text">
              上海立信会计金融学院-数据科学与大数据技术
            </span>
          </span>
          <span className="about-hero-meta-item">
            <span className="about-hero-meta-icon" aria-hidden="true">
              <img src={locationIcon} alt="" />
            </span>
            <span className="about-hero-meta-text">Base 上海</span>
          </span>
        </div>
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
          我是一名偏前端与交互方向的开发者，喜欢把还不清晰的想法整理成可用、好看的产品。 我在意安静的界面、自然的动效，以及那些会让工具变得更顺手的细节。
          </p>
        </div>
        <div className="about-contact-pill">
          <span className="about-contact-pill-text">
          持续寻找前端/全栈开发工程师工作机会！
            <a className="about-contact-link" href="mailto:2630376648@qq.com">
              点这里           </a>
            与我取得联系
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
