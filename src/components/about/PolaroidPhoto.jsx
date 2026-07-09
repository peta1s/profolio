import { forwardRef } from "react";


const PolaroidPhoto = forwardRef(function PolaroidPhoto(
  {
    imageSrc,
    isPrinting,
    isFree,
    isDeveloping,
    isDeveloped,
    isDragging,
    offset,
    finalRotate,
    finalX,
    finalY,
    stackIndex,
    imageFit,
    imageTop,
    imageLeft,
    imageWidth,
    imageHeight,
    onPrintEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[
        "printed-photo",
        isPrinting ? "is-printing" : "",
        isPrinting && !isDeveloped ? "is-undeveloped" : "",
        isDeveloping ? "is-developing" : "",
        isFree ? "is-free" : "",
        isDragging ? "is-dragging" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--drag-x": `${offset.x}px`,
        "--drag-y": `${offset.y}px`,
        "--paper-final-rotate": finalRotate,
        "--paper-final-x": finalX,
        "--paper-final-y": finalY,
        "--photo-stack-index": stackIndex,
        "--photo-image-fit": imageFit,
        "--photo-image-top": imageTop,
        "--photo-image-left": imageLeft,
        "--photo-image-width": imageWidth,
        "--photo-image-height": imageHeight,
      }}
      aria-hidden={!isPrinting}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          onPrintEnd?.(event);
        }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="printed-photo-paper" aria-hidden="true">
        <div className="printed-photo-top-padding" />
        <div className="printed-photo-image-row">
          <div className="printed-photo-side-padding" />
          <div className="printed-photo-image">
            <div className="printed-photo-placeholder" />
            <img className="printed-photo-portrait" src={imageSrc} alt="" />
            <div className="printed-photo-image-shadow" />
            <div className="printed-photo-grain" />
          </div>
          <div className="printed-photo-side-padding" />
        </div>
      </div>
    </div>
  );
});

export default PolaroidPhoto;
