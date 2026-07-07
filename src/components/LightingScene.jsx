import { useEffect, useState } from "react";

const lightingClasses = {
  sunset: "Garden_wrapperSunset__GMbTm",
  night: "Garden_wrapperNight__8bazo",
};

function LightingScene({ mode }) {
  const [nightReady, setNightReady] = useState(false);

  useEffect(() => {
    setNightReady(false);

    try {
      window.localStorage.setItem("desktop-lighting-mode", mode);
    } catch {
      // Storage can be unavailable in some local previews.
    }

    if (mode !== "night") return undefined;

    const timer = window.setTimeout(() => setNightReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, [mode]);

  const className = [
    "lighting-scene",
    lightingClasses[mode],
    mode === "night" && nightReady ? "night-ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} data-mode={mode} aria-hidden="true">
      <div className="Garden_wrapper__y6Ust">
        <div className="Garden_container__0sRQg">
          <div className="Garden_trail__8rmAn lighting-stage">
            <div className="Lights_sunsetBackground__Omair light-layer light-sunset" />
            <div className="Lights_nightBackground__tpozV light-layer light-night" />

            <div className="Garden_trailLightNight___VQvo" />
            <div className="Garden_trailLightNight2__CmhTb" />
            <div className="Garden_trailLightNight3__xQqzv" />
            <div className="Garden_trailLightNight4___ebtm" />
            <div className="Garden_trailLightNight5__0f_fN" />

            <div className="Garden_grainSunset__rmWct light-grain light-sunset" />
            <div className="Garden_grainNight__OhbAl light-grain light-night" />

            <div className="Lights_effects__nyLMS">
              <div className="Lights_warmTones___v0gz light-layer light-always" />
              <div className="Lights_gradientContrast___oBWf light-layer light-sunset" />
              <div className="Lights_pinkLight__TbChu light-layer light-night" />
              <div className="Lights_nightGlow__MamFz light-layer light-night" />
              <div className="Lights_topAccentNight__0gOoN light-layer light-night" />
              <div className="Lights_floorLightNight___VX1h light-layer light-night" />
              <div className="Lights_colorNight__gMTfp light-layer light-night" />
              <div className="Lights_leftLightNight__gH7VI light-layer light-night" />
              <div className="Lights_leftLightNight2__rhH4g light-layer light-night" />
              <div className="Lights_lightBlueLight__4ieE0 light-layer light-night" />
              <div className="Lights_sunsetGlow__7NhTG light-layer light-sunset" />
              <div className="Lights_topAccentSunset__0Qxad light-layer light-sunset" />
              <div className="Lights_leftLightAfternoon__89dOz light-layer light-sunset light-left-afternoon-sunset" />
              <div className="Lights_floorLightSunset__PTWQ1 light-layer light-sunset" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LightingScene;
