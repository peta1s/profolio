const TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TMDB_TITLE_QUERIES = {
  "沙丘1": "沙丘",
  "沙丘2": "沙丘2",
  "异形1": "异形",
  "异形2": "异形2",
  "异形3": "异形3",
  "F1：狂飙飞车": "F1 The Movie",
};

const posterCache = new Map();
let hasWarnedMissingCredentials = false;

function getTmdbCredentials() {
  return {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    readAccessToken: import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN,
  };
}

export function hasTmdbCredentials() {
  const { apiKey, readAccessToken } = getTmdbCredentials();
  return Boolean(apiKey || readAccessToken);
}

export function warnMissingTmdbCredentials() {
  if (hasWarnedMissingCredentials || hasTmdbCredentials()) {
    return;
  }

  hasWarnedMissingCredentials = true;
  console.warn(
    "TMDB credentials are missing. Add VITE_TMDB_API_KEY or VITE_TMDB_READ_ACCESS_TOKEN to .env, then restart the Vite dev server.",
  );
}

function getSearchQuery(title) {
  return TMDB_TITLE_QUERIES[title] ?? title;
}

export async function fetchMoviePoster(title) {
  if (posterCache.has(title)) {
    return posterCache.get(title);
  }

  const { apiKey, readAccessToken } = getTmdbCredentials();

  if (!apiKey && !readAccessToken) {
    warnMissingTmdbCredentials();
    posterCache.set(title, null);
    return null;
  }

  const params = new URLSearchParams({
    query: getSearchQuery(title),
    include_adult: "false",
    language: "zh-CN",
    page: "1",
  });

  if (apiKey) {
    params.set("api_key", apiKey);
  }

  const response = await fetch(`${TMDB_SEARCH_URL}?${params.toString()}`, {
    headers: readAccessToken ? { Authorization: `Bearer ${readAccessToken}` } : undefined,
  });

  if (!response.ok) {
    console.warn(`TMDB poster request failed for "${title}" with status ${response.status}.`);
    posterCache.set(title, null);
    return null;
  }

  const payload = await response.json();
  const result = payload.results?.find((movie) => movie.poster_path);
  const posterUrl = result?.poster_path ? `${TMDB_IMAGE_BASE_URL}${result.poster_path}` : null;

  if (!posterUrl) {
    console.warn(`TMDB did not return a poster for "${title}".`);
  }

  posterCache.set(title, posterUrl);
  return posterUrl;
}
