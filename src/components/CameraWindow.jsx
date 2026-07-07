import { useCallback, useState } from "react";
import grScreenImage from "../../assets/gr-screen.png";
import { photoRoll } from "../data/photoData";

function CameraWindow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenMode, setScreenMode] = useState("photo");
  const currentPhoto = photoRoll[currentIndex];

  const changePhoto = useCallback((direction) => {
    setScreenMode("photo");
    setCurrentIndex((index) => (index + direction + photoRoll.length) % photoRoll.length);
  }, []);

  const selectPhoto = useCallback((index) => {
    setCurrentIndex(index);
    setScreenMode("photo");
  }, []);

  return (
    <div className="window-body camera-body">
      <div className="camera-stage" aria-label="Ricoh GR camera controls">
        <div className="camera-shell">
          <div className="gr-screen-rig">
            <img className="gr-screen-device" src={grScreenImage} alt="Ricoh GR camera screen" />
            <div className={`gr-live-view${screenMode === "album" ? " is-album" : ""}`} aria-live="polite">
              {screenMode === "album" ? (
                <div className="gr-screen-album" aria-label="Camera roll thumbnails">
                  {photoRoll.map((photo, index) => (
                    <button
                      className={index === currentIndex ? "is-current" : ""}
                      key={photo.id}
                      type="button"
                      aria-label={`Show ${photo.title}`}
                      onClick={() => selectPhoto(index)}
                    >
                      <img
                        src={photo.image}
                        alt=""
                        style={{ objectPosition: photo.screenPosition }}
                        draggable="false"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <img
                  key={currentPhoto.id}
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  style={{ objectPosition: currentPhoto.screenPosition }}
                  draggable="false"
                />
              )}
            </div>
            <button
              className="gr-hotspot gr-hotspot-prev"
              type="button"
              aria-label="Previous photo"
              data-tip="Previous"
              onClick={() => changePhoto(-1)}
            />
            <button
              className="gr-hotspot gr-hotspot-next"
              type="button"
              aria-label="Next photo"
              data-tip="Next"
              onClick={() => changePhoto(1)}
            />
            <button
              className="gr-hotspot gr-hotspot-album"
              type="button"
              aria-label="Open camera album"
              data-tip="Album"
              onClick={() => setScreenMode((mode) => (mode === "album" ? "photo" : "album"))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraWindow;
