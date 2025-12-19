/**
 * Tests for ShowCard interactions (click + keyboard).
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ShowCard from "@/components/ShowCard.vue";
import { TvMazeShow } from "@/types/tvmaze";

function makeShow(partial: Partial<TvMazeShow> & Pick<TvMazeShow, "id" | "name" | "genres">): TvMazeShow {
  return {
    rating: { average: null },
    ...partial
  } as TvMazeShow;
}

describe("ShowCard", () => {
  it("emits open with show id on click", async () => {
    const show = makeShow({ id: 10, name: "TripTank", genres: ["Animation"], rating: { average: 8.3 } });

    const wrapper = mount(ShowCard, {
      props: { show },
      global: {
        stubs: {
          RatingPill: { template: "<div />" }
        }
      }
    });

    await wrapper.find("article").trigger("click");
    expect(wrapper.emitted("open")?.[0]).toEqual([10]);
  });

  it("emits open with show id on Enter key", async () => {
    const show = makeShow({ id: 11, name: "Demo 2", genres: ["Comedy"], rating: { average: 7.1 } });

    const wrapper = mount(ShowCard, {
      props: { show },
      global: {
        stubs: {
          RatingPill: { template: "<div />" }
        }
      }
    });

    await wrapper.find("article").trigger("keydown.enter");
    expect(wrapper.emitted("open")?.[0]).toEqual([11]);
  });
});
