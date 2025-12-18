/**
 * Tests for RatingPill formatting.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import RatingPill from "@/components/RatingPill.vue";

describe("RatingPill", () => {
  it("renders N/A when rating is null/undefined", () => {
    const wrapper = mount(RatingPill, { props: { rating: null } });
    expect(wrapper.text()).toContain("N/A");
  });

  it("formats rating to 1 decimal place", () => {
    const wrapper = mount(RatingPill, { props: { rating: 8.245 } });
    expect(wrapper.text()).toContain("8.2");
  });
});
