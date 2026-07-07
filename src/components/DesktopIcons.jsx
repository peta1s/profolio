import { desktopIcons } from "../data/desktopData";
import DesktopIcon from "./DesktopIcon";

function DesktopIcons({ iconPositions, openWindow, updateIconPosition }) {
  return (
    <section className="desktop-icons" aria-label="Desktop icons">
      {desktopIcons.map((item) => (
        <DesktopIcon
          key={item.id}
          item={item}
          position={iconPositions[item.id]}
          openWindow={openWindow}
          updatePosition={updateIconPosition}
        />
      ))}
    </section>
  );
}

export default DesktopIcons;
