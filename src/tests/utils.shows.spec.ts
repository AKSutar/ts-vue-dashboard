/**
 * Unit tests for pure show utilities.
 */
import { describe, expect, it } from "vitest";
import { groupShowsByGenre, sortShowsByRatingDesc, summaryToText } from "@/utils/shows";
import { TvMazeShow } from "@/types/tvmaze";

function utilTest(partial: Partial<TvMazeShow> & Pick<TvMazeShow, "id" | "name" | "genres">): TvMazeShow {
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
      utilTest({ id: 1, name: "B", genres: ["Drama"], rating: { average: 8.2 } }),
      utilTest({ id: 2, name: "A", genres: ["Drama"], rating: { average: 8.2 } }),
      utilTest({ id: 3, name: "C", genres: ["Drama"], rating: { average: 9.1 } })
    ];
    const sorted = sortShowsByRatingDesc(list);
    expect(sorted.map((x) => x.id)).toEqual([3, 2, 1]);
  });

  it("groupShowsByGenre creates 'Other' when no genres", () => {
    const list = [utilTest({ id: 1, name: "NoGenre", genres: [] })];
    const buckets = groupShowsByGenre(list);
    expect(Object.keys(buckets)).toContain("Other");
    expect(buckets.Other[0].id).toBe(1);
  });
});
