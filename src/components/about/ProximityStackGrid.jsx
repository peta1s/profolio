import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

const STACK_PROXIMITY_RADIUS = 200;
const STACK_PROXIMITY_MAX_SCALE = 2.5;
const STACK_PROXIMITY_DURATION = 0.35;

function ProximityStackGrid({ items }) {
  const gridRef = useRef(null);
  const itemRefs = useRef([]);
  const scatterLayout = useMemo(() => {
    const columns = 3;
    const rows = Math.ceil(items.length / columns);
    const randomOffset = gsap.utils.random(-8, 8, 0.1, true);
    const randomRotate = gsap.utils.random(-8, 8, 0.1, true);

    return items.map((item, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = ((column + 0.5) / columns) * 100 + randomOffset();
      const y = ((row + 0.5) / rows) * 100 + randomOffset();
      const rotation = randomRotate();

      return {
        ...item,
        x: Math.min(90, Math.max(10, x)),
        y: Math.min(88, Math.max(12, y)),
        rotation,
      };
    });
  }, [items]);

  const updateScales = useCallback((pointerX, pointerY) => {
    itemRefs.current.forEach((node) => {
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(pointerX - centerX, pointerY - centerY);
      const proximity = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, STACK_PROXIMITY_RADIUS, 1, 0, distance),
      );
      const scale = 1 + (STACK_PROXIMITY_MAX_SCALE - 1) * proximity;
      const baseRotation = Number(node.dataset.rotation ?? 0);

      gsap.to(node, {
        rotation: baseRotation,
        scale,
        y: 0,
        zIndex: Math.round(1 + proximity * 20),
        duration: STACK_PROXIMITY_DURATION,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, []);

  const resetScales = useCallback(() => {
    gsap.to(itemRefs.current.filter(Boolean), {
      rotation: (index, node) => Number(node.dataset.rotation ?? 0),
      scale: 1,
      y: 0,
      zIndex: 1,
      duration: STACK_PROXIMITY_DURATION * 2,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  useLayoutEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);

    nodes.forEach((node) => {
      gsap.set(node, {
        xPercent: -50,
        yPercent: -50,
        rotation: Number(node.dataset.rotation ?? 0),
        scale: 1,
        y: 0,
        transformOrigin: "50% 50%",
      });
    });

    return () => {
      gsap.killTweensOf(nodes);
    };
  }, [scatterLayout]);

  return (
    <ul
      ref={gridRef}
      className="tech-stack proximity-stack"
      aria-label="Technology stack"
      onPointerMove={(event) => updateScales(event.clientX, event.clientY)}
      onPointerLeave={resetScales}
    >
      {scatterLayout.map((tech, index) => (
        <li
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          key={tech.name}
          data-rotation={tech.rotation}
          style={{
            left: `${tech.x}%`,
            top: `${tech.y}%`,
          }}
        >
          <span className="stack-sticker-orb">
            <img src={tech.icon} alt="" draggable="false" />
          </span>
          <span className="stack-sticker-label">{tech.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default ProximityStackGrid;
