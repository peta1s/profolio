import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function MusicActionMenu({ menu, onAction, onClose }) {
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const actions = [
    { id: "play", label: "播放", icon: "▶" },
    { id: "next", label: "下一首播放", icon: "»" },
    { id: "queue", label: "添加到播放列表", icon: "+" },
  ];

  useLayoutEffect(() => {
    if (!menu || !menuRef.current) return undefined;

    const buttons = Array.from(menuRef.current.querySelectorAll(".music-radial-action"));
    const sideMultiplier = menu.side === "left" ? -1 : 1;
    const positions = [
      { x: 78 * sideMultiplier, y: -44 },
      { x: 96 * sideMultiplier, y: 0 },
      { x: 78 * sideMultiplier, y: 44 },
    ];

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.18, ease: "power2.out" },
    );
    gsap.fromTo(
      menuRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.22, ease: "back.out(1.7)" },
    );
    gsap.fromTo(
      buttons,
      { x: 0, y: 0, scale: 0.72, opacity: 0 },
      {
        x: (index) => positions[index].x,
        y: (index) => positions[index].y,
        scale: 1,
        opacity: 1,
        duration: 0.32,
        ease: "back.out(1.65)",
        stagger: 0.035,
      },
    );

    return () => {
      gsap.killTweensOf([overlayRef.current, menuRef.current, ...buttons]);
    };
  }, [menu]);

  useEffect(() => {
    if (!menu) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menu, onClose]);

  if (!menu) return null;

  return (
    <>
      <button
        ref={overlayRef}
        className="music-action-backdrop"
        type="button"
        aria-label="Close music actions"
        onClick={onClose}
      />
      <div
        ref={menuRef}
        className={`music-radial-menu is-${menu.side}`}
        role="menu"
        aria-label={`${menu.item.title} actions`}
        style={{
          left: `${menu.x}px`,
          top: `${menu.y}px`,
        }}
      >
        {actions.map((action) => (
          <button
            className="music-radial-action"
            key={action.id}
            type="button"
            role="menuitem"
            aria-label={action.label}
            data-label={action.label}
            onClick={() => onAction(action.id, menu.item)}
          >
            <span aria-hidden="true">{action.icon}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default MusicActionMenu;
