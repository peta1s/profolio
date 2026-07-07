import { useEffect, useMemo, useRef, useState } from "react";
import dragIcon from "../../assets/drag.svg";
import { photoRoll } from "../data/photoData";

const TILE_WIDTH = 1840;
const TILE_HEIGHT = 1320;
const RENDER_BUFFER = 820;

const patternSlots = [
  { x: 78, y: 82, width: 220 },
  { x: 410, y: 210, width: 250 },
  { x: 760, y: 108, width: 310 },
  { x: 1210, y: 190, width: 260 },
  { x: 1510, y: 72, width: 230 },
  { x: 210, y: 560, width: 285 },
  { x: 640, y: 690, width: 220 },
  { x: 990, y: 520, width: 300 },
  { x: 1390, y: 670, width: 250 },
  { x: 96, y: 1000, width: 330 },
  { x: 1040, y: 1020, width: 280 },
];

const positiveModulo = (value, modulo) => ((value % modulo) + modulo) % modulo;

const getVariant = (tileX, tileY, slotIndex) => {
  const seed = Math.sin(tileX * 12.9898 + tileY * 78.233 + slotIndex * 37.719) * 43758.5453;
  const fraction = seed - Math.floor(seed);
  const second = Math.sin(seed * 0.017 + slotIndex * 9.71) * 10000;
  const secondFraction = second - Math.floor(second);

  return {
    dx: Math.round((fraction - 0.5) * 82),
    dy: Math.round((secondFraction - 0.5) * 72),
    scale: 0.94 + positiveModulo(Math.round(seed), 12) * 0.01,
  };
};

const getPhotoIndex = (tileX, tileY, slotIndex) =>
  positiveModulo(tileX * 5 + tileY * 11 + slotIndex * 3, photoRoll.length);

function GalleryWindow() {
  const viewportRef = useRef(null);
  const dragRef = useRef(null);
  const pointerFrameRef = useRef(null);
  const pointerTargetRef = useRef({ x: 0.5, y: 0.5 });
  const pointerCurrentRef = useRef({ x: 0.5, y: 0.5 });
  const [viewportSize, setViewportSize] = useState({ width: 1200, height: 760 });
  const [offset, setOffset] = useState({ x: -360, y: -180 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!viewportRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setViewportSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    },
    [],
  );

  const visibleCards = useMemo(() => {
    const minWorldX = -offset.x - RENDER_BUFFER;
    const maxWorldX = -offset.x + viewportSize.width + RENDER_BUFFER;
    const minWorldY = -offset.y - RENDER_BUFFER;
    const maxWorldY = -offset.y + viewportSize.height + RENDER_BUFFER;
    const minTileX = Math.floor(minWorldX / TILE_WIDTH);
    const maxTileX = Math.floor(maxWorldX / TILE_WIDTH);
    const minTileY = Math.floor(minWorldY / TILE_HEIGHT);
    const maxTileY = Math.floor(maxWorldY / TILE_HEIGHT);
    const cards = [];

    for (let tileY = minTileY; tileY <= maxTileY; tileY += 1) {
      for (let tileX = minTileX; tileX <= maxTileX; tileX += 1) {
        patternSlots.forEach((slot, slotIndex) => {
          const photo = photoRoll[getPhotoIndex(tileX, tileY, slotIndex)];
          const variant = getVariant(tileX, tileY, slotIndex);
          const width = Math.round(slot.width * variant.scale);
          const worldX = tileX * TILE_WIDTH + slot.x + variant.dx;
          const worldY = tileY * TILE_HEIGHT + slot.y + variant.dy;

          cards.push({
            id: `${tileX}:${tileY}:${slotIndex}:${photo.id}`,
            photo,
            left: worldX + offset.x,
            top: worldY + offset.y,
            width,
            depth: 0.58 + positiveModulo(slotIndex * 7 + tileX + tileY, 8) * 0.08,
          });
        });
      }
    }

    return cards;
  }, [offset, viewportSize]);

  const moveViewport = (dx, dy) => {
    setOffset((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }));
  };

  const handleWheel = (event) => {
    event.preventDefault();

    const multiplier = event.deltaMode === 1 ? 16 : 1;
    const deltaX = event.shiftKey ? event.deltaY : event.deltaX;
    const deltaY = event.shiftKey ? 0 : event.deltaY;

    moveViewport(-deltaX * multiplier, -deltaY * multiplier);
  };

  const beginPan = (event) => {
    if (event.button !== 0) return;

    event.preventDefault();
    setIsDragging(true);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePan = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setOffset({
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    });
  };

  const endPan = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const writeViewportPointer = (x, y) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.style.setProperty("--mx", `${Math.round(x * 100)}%`);
    viewport.style.setProperty("--my", `${Math.round(y * 100)}%`);
    viewport.style.setProperty("--follow-x", `${((x - 0.5) * 34).toFixed(2)}px`);
    viewport.style.setProperty("--follow-y", `${((y - 0.5) * 34).toFixed(2)}px`);
    viewport.style.setProperty("--tilt-x", `${((0.5 - y) * 5.2).toFixed(2)}deg`);
    viewport.style.setProperty("--tilt-y", `${((x - 0.5) * 5.2).toFixed(2)}deg`);
  };

  const tickViewportPointer = () => {
    const current = pointerCurrentRef.current;
    const target = pointerTargetRef.current;
    const next = {
      x: current.x + (target.x - current.x) * 0.12,
      y: current.y + (target.y - current.y) * 0.12,
    };

    pointerCurrentRef.current = next;
    writeViewportPointer(next.x, next.y);

    if (Math.abs(target.x - next.x) > 0.001 || Math.abs(target.y - next.y) > 0.001) {
      pointerFrameRef.current = window.requestAnimationFrame(tickViewportPointer);
      return;
    }

    pointerCurrentRef.current = target;
    writeViewportPointer(target.x, target.y);
    pointerFrameRef.current = null;
  };

  const scheduleViewportPointer = (x, y) => {
    pointerTargetRef.current = { x, y };
    if (pointerFrameRef.current) return;

    pointerFrameRef.current = window.requestAnimationFrame(tickViewportPointer);
  };

  const updateViewportPointer = (event) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

    scheduleViewportPointer(x, y);
  };

  const handleViewportPointerMove = (event) => {
    updateViewportPointer(event);
    handlePan(event);
  };

  const resetViewportPointer = (event) => {
    if (dragRef.current) return;

    scheduleViewportPointer(0.5, 0.5);
  };

  return (
    <div className="window-body gallery-body">
      <div
        className={`infinite-gallery-viewport${isDragging ? " is-dragging" : ""}`}
        ref={viewportRef}
        onPointerDown={beginPan}
        onPointerMoveCapture={handleViewportPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onPointerLeave={resetViewportPointer}
        onWheel={handleWheel}
      >
        <header className="infinite-gallery-header">
          <h1>my recent camera roll</h1>
        </header>

        <div className="infinite-gallery-hint" aria-hidden="true">
          <img src={dragIcon} alt="" />
          <span>SCROLL/DRAG TO MOVE</span>
        </div>

        <div className="infinite-gallery-world">
          {visibleCards.map(({ id, photo, left, top, width, depth }) => (
            <figure
              className="infinite-gallery-card"
              key={id}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                "--motion-depth": depth,
              }}
            >
              <div className="infinite-gallery-frame">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  style={{ objectPosition: photo.objectPosition }}
                  draggable="false"
                />
              </div>
              <figcaption>
                <strong>{photo.caption}</strong>
                <span>{photo.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryWindow;
