import { appleIcon } from "../data/desktopData";
import { useClock } from "../hooks/useClock";

function MenuBar({ mode, onOpenWindow, onToggleMode }) {
  const clock = useClock();

  return (
    <header className="menu-bar">
      <nav className="menu-left" aria-label="Main">
        <button
          className="apple-button"
          type="button"
          onClick={() => onOpenWindow("aboutWindow")}
          aria-label="Open about"
        >
          <img src={appleIcon} alt="" />
        </button>
        <strong>Petals</strong>
        <button type="button" onClick={() => onOpenWindow("aboutWindow")}>
          About
        </button>
        <button type="button" onClick={() => onOpenWindow("projectsWindow")}>
          Work
        </button>
        <button type="button" onClick={() => onOpenWindow("cameraWindow")}>
          Camera
        </button>
        <button type="button" onClick={() => onOpenWindow("galleryWindow")}>
          Gallery
        </button>
        <button type="button" onClick={() => onOpenWindow("notesWindow")}>
          Notes
        </button>
        <button type="button" onClick={() => onOpenWindow("contactWindow")}>
          Contact
        </button>
      </nav>

      <div className="menu-right">
        <button className="mode-pill" type="button" onClick={onToggleMode}>
          {mode === "night" ? "Night" : "Sunset"}
        </button>
        <span id="clock">{clock}</span>
      </div>
    </header>
  );
}

export default MenuBar;
