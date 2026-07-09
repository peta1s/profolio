import { forwardRef } from "react";
import portraitImage from "../../../assets/polaroid-portrait.jpg";


const PolaroidPhoto = forwardRef(function PolaroidPhoto(
  {
    isPrinting,
    isFree,
    isDragging,
    offset,
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
        isFree ? "is-free" : "",
        isDragging ? "is-dragging" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--drag-x": `${offset.x}px`,
        "--drag-y": `${offset.y}px`,
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
            <img className="printed-photo-portrait" src={portraitImage} alt="" />
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
