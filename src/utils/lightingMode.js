export function getInitialLightingMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("mode") === "sunset") return "sunset";
  if (params.get("mode") === "night") return "night";

  try {
    const saved = window.localStorage.getItem("desktop-lighting-mode");
    if (saved === "sunset" || saved === "night") return saved;
  } catch {
    // Storage can be unavailable in some local previews.
  }

  return "night";
}
