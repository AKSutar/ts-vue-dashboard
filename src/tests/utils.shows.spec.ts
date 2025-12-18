/**
 * Unit tests for pure show utilities.
 */
import { describe, expect, it } from "vitest";
import { getRatingValue, groupShowsByGenre, sortShowsByRatingDesc, summaryToText } from "@/utils/shows";
import type { TvMazeShow } from "@/types/tvmaze";

function s(partial: Partial<TvMazeShow> & Pick<TvMazeShow, "id" | "name" | "genres">): TvMazeShow {
  return {
    rating: { average: null },
    ...partial
  } as TvMazeShow;
}

describe("shows utils", () => {
  it("summaryToText strips tags", () => {
    expect(summaryToText("<p>Hello <b>World</b></p>")).toBe("Hello World");
  });

  it("sortShowsByRatingDesc sorts rating desc then name", () => {
    const list = [
      s({ id: 1, name: "B", genres: ["Drama"], rating: { average: 8.2 } }),
      s({ id: 2, name: "A", genres: ["Drama"], rating: { average: 8.2 } }),
      s({ id: 3, name: "C", genres: ["Drama"], rating: { average: 9.1 } })
    ];
    const sorted = sortShowsByRatingDesc(list);
    expect(sorted.map((x) => x.id)).toEqual([3, 2, 1]);
  });

  it("groupShowsByGenre creates 'Other' when no genres", () => {
    const list = [s({ id: 1, name: "NoGenre", genres: [] })];
    const buckets = groupShowsByGenre(list);
    expect(Object.keys(buckets)).toContain("Other");
    expect(buckets.Other[0].id).toBe(1);
  });

  it("getRatingValue is safe for null", () => {
    expect(getRatingValue(s({ id: 1, name: "X", genres: ["Drama"], rating: { average: null } }))).toBe(0);
  });
});
