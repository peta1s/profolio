const ITUNES_LOOKUP_URL = "https://itunes.apple.com/lookup";
const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";
const LOCAL_CACHE_KEY = "profolio:music-artwork-cache:v1";
const REQUEST_DELAY_MS = 3_200;
const THROTTLE_COOLDOWN_MS = 60_000;

const memoryCache = new Map();
const pendingRequests = new Map();
const warnedMessages = new Set();
let requestQueue = Promise.resolve();
let blockedUntil = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function warnOnce(key, message, detail) {
  if (warnedMessages.has(key)) {
    return;
  }

  warnedMessages.add(key);

  if (detail) {
    console.warn(message, detail);
  } else {
    console.warn(message);
  }
}

function normalizeCacheText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getCacheKey({ title, artist = "" }) {
  return `${normalizeCacheText(artist)}::${normalizeCacheText(title)}`;
}

function readLocalCache() {
  if (typeof window === "undefined" || !window.localStorage) {
    return {};
  }

  try {
    const rawCache = window.localStorage.getItem(LOCAL_CACHE_KEY);
    return rawCache ? JSON.parse(rawCache) : {};
  } catch (error) {
    warnOnce("local-cache-read", "Could not read music artwork cache.", error);
    return {};
  }
}

function writeLocalCache(cache) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    warnOnce("local-cache-write", "Could not write music artwork cache.", error);
  }
}

function readCachedEntry(cacheKey) {
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const localEntry = readLocalCache()[cacheKey] ?? null;
  memoryCache.set(cacheKey, localEntry);
  return localEntry;
}

function writeCachedEntry(cacheKey, entry) {
  const nextEntry = {
    ...entry,
    updatedAt: Date.now(),
  };

  memoryCache.set(cacheKey, nextEntry);

  const localCache = readLocalCache();
  localCache[cacheKey] = nextEntry;
  writeLocalCache(localCache);
}

function getTrackDuration(durationMs) {
  if (!durationMs) {
    return "";
  }

  const totalSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function normalizeTrack(result) {
  return {
    id: result.trackId,
    title: result.trackName,
    number: result.trackNumber ?? null,
    duration: getTrackDuration(result.trackTimeMillis),
    previewUrl: result.previewUrl ?? null,
  };
}

function getArtworkUrl(result) {
  const artworkUrl = result?.artworkUrl100 ?? result?.artworkUrl60 ?? result?.artworkUrl30;

  if (!artworkUrl) {
    return null;
  }

  return artworkUrl.replace(/\/\d+x\d+bb\.(jpg|png|webp)$/i, "/600x600bb.$1");
}

function scoreResult(result, title, artist) {
  const normalizedTitle = normalizeCacheText(title);
  const normalizedArtist = normalizeCacheText(artist);
  const resultTitle = normalizeCacheText(result.collectionName ?? result.trackName ?? "");
  const resultArtist = normalizeCacheText(result.artistName ?? "");

  let score = 0;

  if (resultTitle === normalizedTitle) {
    score += 4;
  } else if (
    resultTitle &&
    (resultTitle.includes(normalizedTitle) || normalizedTitle.includes(resultTitle))
  ) {
    score += 2;
  }

  if (resultArtist === normalizedArtist) {
    score += 4;
  } else if (
    resultArtist &&
    (resultArtist.includes(normalizedArtist) || normalizedArtist.includes(resultArtist))
  ) {
    score += 2;
  }

  return score;
}

function enqueueRequest(url) {
  const queuedRequest = requestQueue
    .catch(() => undefined)
    .then(() => wait(REQUEST_DELAY_MS))
    .then(() => {
      if (Date.now() < blockedUntil) {
        return null;
      }

      return fetch(url);
    });

  requestQueue = queuedRequest.then(
    () => undefined,
    () => undefined,
  );

  return queuedRequest;
}

async function fetchItunesJson(url, cacheKey) {
  const response = await enqueueRequest(url);

  if (!response) {
    return null;
  }

  if (response.status === 403 || response.status === 429) {
    blockedUntil = Date.now() + THROTTLE_COOLDOWN_MS;
    warnOnce(
      "itunes-throttled",
      "iTunes Search API is throttling requests; queued lookups are paused temporarily.",
    );
    return null;
  }

  if (!response.ok) {
    warnOnce(cacheKey, `iTunes request failed with status ${response.status}.`);
    return null;
  }

  return response.json();
}

async function lookupArtwork(collectionId, cacheKey) {
  const params = new URLSearchParams({ id: String(collectionId) });
  const payload = await fetchItunesJson(`${ITUNES_LOOKUP_URL}?${params.toString()}`, cacheKey);

  if (!payload) {
    return null;
  }

  const result = payload?.results?.find((item) => getArtworkUrl(item));
  const coverUrl = getArtworkUrl(result);

  if (!coverUrl) {
    return null;
  }

  return {
    appleCollectionId: Number(collectionId),
    coverUrl,
  };
}

async function searchArtwork(item, cacheKey) {
  const { title, artist = "", itunes = {} } = item;
  const searchTerm = itunes.term ?? [title, artist].filter(Boolean).join(" ");
  const params = new URLSearchParams({
    term: searchTerm,
    country: itunes.country ?? "US",
    media: "music",
    entity: "album",
    limit: "5",
  });
  const payload = await fetchItunesJson(`${ITUNES_SEARCH_URL}?${params.toString()}`, cacheKey);

  if (!payload) {
    return null;
  }

  const results = payload?.results ?? [];
  const bestResult = results
    .filter((result) => getArtworkUrl(result))
    .sort((left, right) => scoreResult(right, title, artist) - scoreResult(left, title, artist))[0];
  const coverUrl = getArtworkUrl(bestResult);

  if (!coverUrl) {
    warnOnce(cacheKey, `iTunes did not return artwork for "${title}" by "${artist}".`);
    return null;
  }

  return {
    appleCollectionId: bestResult.collectionId ?? null,
    coverUrl,
  };
}

export function getCachedMusicArtwork(item) {
  if (item.coverUrl || item.cover) {
    return item.coverUrl ?? item.cover;
  }

  const cachedEntry = readCachedEntry(getCacheKey(item));
  return cachedEntry?.coverUrl ?? null;
}

export function getCachedAlbumTracks(item) {
  const cacheKey = getCacheKey(item);
  const cachedEntry = readCachedEntry(cacheKey);
  return cachedEntry?.tracks ?? null;
}

export async function fetchAlbumTracks(item) {
  const collectionId = item?.appleCollectionId ?? item?.itunes?.appleCollectionId;

  if (!collectionId) {
    return [];
  }

  const cacheKey = getCacheKey(item);
  const cachedEntry = readCachedEntry(cacheKey);

  if (cachedEntry?.tracks) {
    return cachedEntry.tracks;
  }

  if (Date.now() < blockedUntil) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      id: String(collectionId),
      entity: "song",
    });
    const payload = await fetchItunesJson(`${ITUNES_LOOKUP_URL}?${params.toString()}`, `${cacheKey}:tracks`);

    if (!payload?.results) {
      return [];
    }

    const tracks = payload.results
      .filter((result) => result.wrapperType === "track" && result.kind === "song" && result.trackName)
      .sort((left, right) => (left.trackNumber ?? 0) - (right.trackNumber ?? 0))
      .map(normalizeTrack);

    writeCachedEntry(cacheKey, {
      ...cachedEntry,
      appleCollectionId: Number(collectionId),
      coverUrl: cachedEntry?.coverUrl ?? item.coverUrl ?? item.cover ?? null,
      tracks,
    });

    return tracks;
  } catch (error) {
    warnOnce(`${cacheKey}:tracks`, `Could not load tracks for "${item.title}" by "${item.artist}".`, error);
    return [];
  }
}

export async function fetchMusicArtwork(item) {
  const cacheKey = getCacheKey(item);
  const localCover = item.coverUrl ?? item.cover;

  if (localCover) {
    writeCachedEntry(cacheKey, {
      appleCollectionId: item.appleCollectionId ?? null,
      coverUrl: localCover,
    });
    return localCover;
  }

  const cachedEntry = readCachedEntry(cacheKey);

  if (cachedEntry?.coverUrl) {
    return cachedEntry.coverUrl;
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  if (Date.now() < blockedUntil) {
    return null;
  }

  const request = (async () => {
    try {
      const collectionId = item.appleCollectionId ?? item.itunes?.appleCollectionId ?? cachedEntry?.appleCollectionId;
      const lookupEntry = collectionId ? await lookupArtwork(collectionId, cacheKey) : null;
      const nextEntry = lookupEntry ?? (await searchArtwork(item, cacheKey));

      if (nextEntry?.coverUrl) {
        writeCachedEntry(cacheKey, nextEntry);
        return nextEntry.coverUrl;
      }
    } catch (error) {
      warnOnce(cacheKey, `Could not load artwork for "${item.title}" by "${item.artist}".`, error);
    } finally {
      pendingRequests.delete(cacheKey);
    }

    return null;
  })();

  pendingRequests.set(cacheKey, request);
  return request;
}
