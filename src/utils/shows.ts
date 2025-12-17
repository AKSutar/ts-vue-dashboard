/**
 * Show-related pure utilities: sorting, grouping, etc.
 */
import type { TvMazeShow } from "@/types/tvmaze";

export type GenreBuckets = Record<string, TvMazeShow[]>;

/** Converts TVmaze summary HTML into a short, readable plain text snippet. */
export function summaryToText(summaryHtml: string | null | undefined): string {
  if (!summaryHtml) return "";
  const withoutTags = summaryHtml.replace(/<[^>]*>/g, "");
  return withoutTags.replace(/\s+/g, " ").trim();
}

/** Returns a safe numeric rating value for sorting. */
export function getRatingValue(show: TvMazeShow): number {
  return show.rating?.average ?? 0;
}

/** Sorts shows by rating (desc) then by name (asc). */
export function sortShowsByRatingDesc(shows: TvMazeShow[]): TvMazeShow[] {
  return [...shows].sort((a, b) => {
    const ra = getRatingValue(a);
    const rb = getRatingValue(b);
    if (rb !== ra) return rb - ra;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Groups shows by genre and sorts each genre bucket by rating.
 * Shows with no genres are grouped into "Other".
 */
export function groupShowsByGenre(shows: TvMazeShow[]): GenreBuckets {
  const buckets: GenreBuckets = {};

  for (const show of shows) {
    const genres = (show.genres?.length ? show.genres : ["Other"]) as string[];
    for (const genre of genres) {
      (buckets[genre] ??= []).push(show);
    }
  }

  for (const genre of Object.keys(buckets)) {
    buckets[genre] = sortShowsByRatingDesc(buckets[genre]);
  }

  return buckets;
}
