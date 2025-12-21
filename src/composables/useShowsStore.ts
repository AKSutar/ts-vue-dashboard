/**
 * A tiny "store" implemented with module-scoped refs.
 * - Caches show index pages in localStorage.
 */

import { computed, ref } from "vue";
import { TvMazeShow } from "@/types/tvmaze";
import { fetchShowById, fetchShowsPage, searchShowsByName } from "@/services/tvmazeApi";

type CachedIndex = {
  savedAt: number;
  pages: number[];
  shows: TvMazeShow[];
};

const CACHE_KEY = "tv-dashboard:index-cache-v1";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24h; TVmaze mentions show-index caching up to 24 hours.

const shows = ref<TvMazeShow[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const showById = computed(() => {
  const map = new Map<number, TvMazeShow>();
  for (const show of shows.value) map.set(show.id, show);
  return map;
});

/** Loads cached data if present and still fresh. */
function readCache(): CachedIndex | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedIndex;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Writes the full cache payload. */
function writeCache(payload: CachedIndex): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota / privacy mode failures.
  }
}

/**
 * Loads a few pages from the TVmaze show index.
 * Keeping the number small makes initial render fast.
 */
export async function loadIndexPages(pages: number[]): Promise<void> {
  errorMessage.value = null;

  const cached = readCache();
  if (cached && pages.every((page) => cached.pages.includes(page))) {
    shows.value = cached.shows;
    return;
  }

  isLoading.value = true;
  try {
    const results = await Promise.all(pages.map((page) => fetchShowsPage(page)));
    const merged = results.flat();

    // Deduplicate by show id.
    const byId = new Map<number, TvMazeShow>();
    for (const merge of merged) byId.set(merge.id, merge);

    shows.value = Array.from(byId.values());
    writeCache({ savedAt: Date.now(), pages, shows: shows.value });
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : "Unknown error";
  } finally {
    isLoading.value = false;
  }
}

/** Returns show details from memory, or fetches them from /shows/:id. */
export async function getShowDetails(id: number): Promise<TvMazeShow> {
  const existing = showById.value.get(id);
  if (existing) return existing;

  const full = await fetchShowById(id);
  shows.value = [...shows.value, full];
  return full;
}

/**
 * Searches using TVmaze search endpoint; returns a show list.
 * This does NOT mutate the main index by default.
 */
export async function searchRemote(query: string): Promise<TvMazeShow[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results = await searchShowsByName(trimmed);
  return results.map((result) => result.show);
}

export function useShowsState() {
  return {
    shows,
    isLoading,
    errorMessage
  };
}
