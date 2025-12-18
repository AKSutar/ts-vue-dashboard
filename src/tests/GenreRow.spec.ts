/**
 * Tests for GenreRow rendering.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import GenreRow from "@/components/GenreRow.vue";
import type { TvMazeShow } from "@/types/tvmaze";

const shows: TvMazeShow[] = [
  { id: 1, name: "Alpha", genres: ["Drama"], rating: { average: 9.2 } } as TvMazeShow,
  { id: 2, name: "Beta", genres: ["Drama"], rating: { average: 7.0 } } as TvMazeShow
];

describe("GenreRow", () => {
  it("renders the title and show count", () => {
    const wrapper = mount(GenreRow, {
      props: { title: "Drama", shows },
      global: {
        stubs: {
          // Stubbing ShowCard makes the test focused and stable.
          ShowCard: { template: "<div class='stub-card'></div>" }
        }
      }
    });

    expect(wrapper.text()).toContain("Drama");
    expect(wrapper.text()).toContain("2 shows");
  });

  it("renders one card per show", () => {
    const wrapper = mount(GenreRow, {
      props: { title: "Drama", shows },
      global: { stubs: { ShowCard: { template: "<div class='stub-card'></div>" } } }
    });

    expect(wrapper.findAll(".stub-card")).toHaveLength(2);
  });
});
