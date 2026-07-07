import { windowIds } from "../data/desktopData";
import DesktopWindow from "./DesktopWindow";

function WindowManager({
  activeWindows,
  zIndices,
  windowPositions,
  selectedProjectId,
  musicLibrary,
  musicPlayer,
  musicPlayerActions,
  bringToFront,
  closeWindow,
  openProject,
  updateWindowPosition,
}) {
  return windowIds.map((id) => (
    <DesktopWindow
      key={id}
      id={id}
      active={Boolean(activeWindows[id])}
      zIndex={zIndices[id] ?? 40}
      position={windowPositions[id]}
      selectedProjectId={selectedProjectId}
      musicLibrary={musicLibrary}
      musicPlayer={musicPlayer}
      musicPlayerActions={musicPlayerActions}
      bringToFront={bringToFront}
      closeWindow={closeWindow}
      openProject={openProject}
      updatePosition={updateWindowPosition}
    />
  ));
}

export default WindowManager;
