import { useRef } from "react";
import { windows } from "../data/desktopData";
import { clamp } from "../utils/clamp";
import TrafficLights from "./TrafficLights";
import WindowContent from "./WindowContent";

function DesktopWindow({
  id,
  active,
  zIndex,
  position,
  selectedProjectId,
  musicLibrary,
  musicPlayer,
  musicPlayerActions,
  bringToFront,
  closeWindow,
  openProject,
  updatePosition,
}) {
  const dragRef = useRef(null);
  const config = windows[id];
  const isDesktopDevice = id === "ipodWindow" || id === "cameraWindow";
  const deviceClass = id === "ipodWindow" ? " ipod-desktop-window" : id === "cameraWindow" ? " camera-desktop-window" : "";

  const style = {
    "--left": position?.left ?? config.left,
    "--top": position?.top ?? config.top,
    "--width": config.width,
    zIndex,
  };

  const handlePointerDown = (event) => {
    if (event.target.closest("button")) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const windowElement = event.currentTarget.closest(".window");
    const rect = windowElement.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialLeft: rect.left,
      initialTop: rect.top,
    };
    bringToFront(id);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;

    const windowElement = event.currentTarget.closest(".window");
    const nextLeft = drag.initialLeft + event.clientX - drag.startX;
    const nextTop = drag.initialTop + event.clientY - drag.startY;
    const maxLeft = window.innerWidth - windowElement.offsetWidth - 12;
    const maxTop = window.innerHeight - windowElement.offsetHeight - 12;

    updatePosition(id, {
      left: `${clamp(nextLeft, 12, Math.max(12, maxLeft))}px`,
      top: `${clamp(nextTop, 42, Math.max(42, maxTop))}px`,
    });
  };

  const stopDragging = (event) => {
    const drag = dragRef.current;
    if (!drag) return;

    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    }
  };

  return (
    <section
      className={`window${active ? " active" : ""}${dragRef.current ? " dragging" : ""}${
        isDesktopDevice ? ` desktop-device-window${deviceClass}` : ""
      }`}
      id={id}
      style={style}
      onPointerDown={(event) => {
        bringToFront(id);
        if (isDesktopDevice) handlePointerDown(event);
      }}
      onPointerMove={isDesktopDevice ? handlePointerMove : undefined}
      onPointerUp={isDesktopDevice ? stopDragging : undefined}
      onPointerCancel={isDesktopDevice ? stopDragging : undefined}
    >
      {!isDesktopDevice && (
        <div
          className="window-titlebar"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
        >
          <TrafficLights onClose={() => closeWindow(id)} />
          <strong>{config.title}</strong>
        </div>
      )}
      {isDesktopDevice && (
        <button
          className="device-window-close"
          type="button"
          aria-label={`Close ${config.title}`}
          onClick={() => closeWindow(id)}
        >
          ×
        </button>
      )}
      <WindowContent
        id={id}
        selectedProjectId={selectedProjectId}
        musicLibrary={musicLibrary}
        musicPlayer={musicPlayer}
        musicPlayerActions={musicPlayerActions}
        openProject={openProject}
      />
    </section>
  );
}

export default DesktopWindow;
