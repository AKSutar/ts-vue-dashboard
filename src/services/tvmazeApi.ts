/**
 * TVmaze API client:
 * - Central place for all HTTP calls.
 * - Uses fetch + small JSON helper and explicit error handling.
 */
import { TvMazeSearchResult, TvMazeShow } from "@/types/tvmaze";

const BASE_URL = "https://api.tvmaze.com";

/** Reads JSON and throws a descriptive error for responses. */
async function fetchJson<Data>(input: RequestInfo | URL, init?: RequestInit): Promise<Data> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Data;
}

/**
 * Fetch a page of the show index.
 * TVmaze paginates the show index with up to 250 results per page.
 */
export async function fetchShowsPage(page: number): Promise<TvMazeShow[]> {
  const url = new URL(`${BASE_URL}/shows`);
  url.searchParams.set("page", String(page));
  return fetchJson<TvMazeShow[]>(url);
}

/**
 * Fetch full details for a show by ID.
 * Endpoint: /shows/:id
 */
export async function fetchShowById(id: number): Promise<TvMazeShow> {
  return fetchJson<TvMazeShow>(`${BASE_URL}/shows/${id}`);
}

/**
 * Search shows by name.
 * Endpoint: /search/shows?q=:query
 */
export async function searchShowsByName(query: string): Promise<TvMazeSearchResult[]> {
  const url = new URL(`${BASE_URL}/search/shows`);
  url.searchParams.set("q", query);
  return fetchJson<TvMazeSearchResult[]>(url);
}
