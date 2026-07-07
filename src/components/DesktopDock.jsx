import { useEffect } from "react";
import { gsap } from "gsap";
import { desktopIcons } from "../data/desktopData";

function DesktopDock({ activeWindows, openWindow }) {
  useEffect(() => {
    const dock = document.querySelector("[data-desktop-dock]");
    if (!dock) return undefined;

    const items = Array.from(dock.querySelectorAll("[data-dock-item]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (prefersReducedMotion.matches || !canHover.matches) {
      return undefined;
    }

    const tweens = items.map((item) => ({
      scaleX: gsap.quickTo(item, "scaleX", { duration: 0.24, ease: "power3.out" }),
      scaleY: gsap.quickTo(item, "scaleY", { duration: 0.24, ease: "power3.out" }),
      y: gsap.quickTo(item, "y", { duration: 0.24, ease: "power3.out" }),
    }));

    const resetItems = () => {
      tweens.forEach(({ scaleX, scaleY, y }) => {
        scaleX(1);
        scaleY(1);
        y(0);
      });
    };

    const moveItems = (event) => {
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(event.clientX - center);
        const proximity = Math.max(0, 1 - distance / 150);
        const eased = proximity * proximity * (3 - 2 * proximity);

        tweens[index].scaleX(1 + eased * 0.86);
        tweens[index].scaleY(1 + eased * 0.86);
        tweens[index].y(eased * -26);
      });
    };

    const handleFocusOut = (event) => {
      if (!dock.contains(event.relatedTarget)) resetItems();
    };

    dock.addEventListener("pointermove", moveItems);
    dock.addEventListener("pointerleave", resetItems);
    dock.addEventListener("focusout", handleFocusOut);

    return () => {
      dock.removeEventListener("pointermove", moveItems);
      dock.removeEventListener("pointerleave", resetItems);
      dock.removeEventListener("focusout", handleFocusOut);
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <nav className="desktop-dock" aria-label="Dock" data-desktop-dock>
      {desktopIcons.map((item) => (
        <button
          aria-label={`Open ${item.label}`}
          className={`dock-item${item.trash ? " dock-trash" : ""}${item.ipod ? " dock-ipod" : ""}`}
          data-dock-item
          key={item.id}
          onClick={() => openWindow(item.id)}
          type="button"
        >
          <span className="dock-label">{item.label}</span>
          {item.ipod ? (
            <span className="dock-ipod-glyph" aria-hidden="true">
              <span className="dock-ipod-glint" />
              <span className="dock-ipod-screen">
                <span className="dock-ipod-screen-shine" />
              </span>
              <span className="dock-ipod-wheel">
                <span className="dock-ipod-wheel-label dock-ipod-wheel-menu">Menu</span>
                <span className="dock-ipod-wheel-label dock-ipod-wheel-prev">◀◀</span>
                <span className="dock-ipod-wheel-label dock-ipod-wheel-next">▶▶</span>
                <span className="dock-ipod-wheel-label dock-ipod-wheel-play">▶Ⅱ</span>
                <span className="dock-ipod-wheel-center" />
              </span>
            </span>
          ) : (
            <img src={item.icon} alt="" />
          )}
          <span
            aria-hidden="true"
            className={`dock-indicator${activeWindows[item.id] ? " is-active" : ""}`}
          />
        </button>
      ))}
    </nav>
  );
}

export default DesktopDock;
