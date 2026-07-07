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
      onAnimationEnd={onPrintEnd}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="printed-photo-image">
        <img src={portraitImage} alt="" />
      </div>
    </div>
  );
});

export default PolaroidPhoto;
