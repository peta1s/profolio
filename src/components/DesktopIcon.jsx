import { useRef } from "react";
import { clamp } from "../utils/clamp";

function DesktopIcon({ item, position, openWindow, updatePosition }) {
  const dragRef = useRef(null);

  const handlePointerDown = (event) => {
    if (window.matchMedia("(max-width: 900px)").matches) return;

    event.preventDefault();
    const icon = event.currentTarget;
    const rect = icon.getBoundingClientRect();
    const parentRect = icon.offsetParent?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialLeft: rect.left - parentRect.left,
      initialTop: rect.top - parentRect.top,
      maxLeft: parentRect.width - rect.width - 12,
      maxTop: parentRect.height - rect.height - 12,
      moved: false,
    };
    icon.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;

    updatePosition(item.id, {
      x: `${clamp(drag.initialLeft + dx, 18, Math.max(18, drag.maxLeft))}px`,
      y: `${clamp(drag.initialTop + dy, 18, Math.max(18, drag.maxTop))}px`,
    });
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag) return;

    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    }
    if (!drag.moved) openWindow(item.id);
  };

  const handleClick = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      openWindow(item.id);
    }
  };

  return (
    <button
      className={`desktop-icon${item.trash ? " trash-icon" : ""}${item.ipod ? " ipod-desktop-icon" : ""}`}
      type="button"
      style={{ "--x": position?.x ?? item.x, "--y": position?.y ?? item.y }}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        dragRef.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") openWindow(item.id);
      }}
    >
      {item.ipod ? (
        <span className="desktop-ipod-glyph" aria-hidden="true">
          <span className="desktop-ipod-glint" />
          <span className="desktop-ipod-screen">
            <span className="desktop-ipod-screen-shine" />
          </span>
          <span className="desktop-ipod-wheel">
            <span className="desktop-ipod-wheel-label desktop-ipod-wheel-menu">Menu</span>
            <span className="desktop-ipod-wheel-label desktop-ipod-wheel-prev">◀◀</span>
            <span className="desktop-ipod-wheel-label desktop-ipod-wheel-next">▶▶</span>
            <span className="desktop-ipod-wheel-label desktop-ipod-wheel-play">▶Ⅱ</span>
            <span className="desktop-ipod-wheel-center" />
          </span>
        </span>
      ) : (
        <img src={item.icon} alt="" draggable="false" />
      )}
      <span>{item.label}</span>
    </button>
  );
}

export default DesktopIcon;
