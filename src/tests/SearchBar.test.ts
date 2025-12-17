/**
 * Unit tests for SearchBar component events.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBar from "@/components/SearchBar.vue";

describe("SearchBar", () => {
  it("emits update:modelValue on input", async () => {
    const wrapper = mount(SearchBar, { props: { modelValue: "" } });
    await wrapper.find("input").setValue("office");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["office"]);
  });

  it("emits search on submit", async () => {
    const wrapper = mount(SearchBar, { props: { modelValue: "office" } });
    await wrapper.find("form").trigger("submit");
    expect(wrapper.emitted("search")?.[0]).toEqual(["office"]);
  });
});
