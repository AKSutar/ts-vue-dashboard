<!-- SearchBar: Emits "search" on submit -->
<template>
  <form class="panel p-1" @submit.prevent="onSubmit">
    <div class="row g-4">
      <input
        class="input"
        :value="modelValue"
        type="text"
        inputmode="search"
        placeholder="Search shows by name..."
        aria-label="Search shows"
        @input="onInput"
      />
      <button v-if="modelValue" class="btn" type="button" @click="onClear">Clear</button>
    </div>
  </form>
</template>

<script setup lang="ts">
/**
 * SearchBar props & events:
 * - modelValue: current text.
 * - update:modelValue: two-way binding.
 * - search: explicit user action for search.
 */
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{ modelValue: string }>();

/** Debounce config for auto-search. */
const DEBOUNCE_MS = 350;
const MIN_CHARS = 2;

let timer: number | undefined;

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
  (e: "clear"): void;
}>();

function goToDashboard() {
  router.push({ name: "dashboard" }).catch(() => {
    // Ignore navigation duplication errors (already on the dashboard).
  });
}

/** Clears any pending debounced search. */
function cancelPendingSearch() {
  if (timer) {
    window.clearTimeout(timer);
  }
}

/** Schedules a debounced search for the latest typed value. */
function scheduleSearch(value: string) {
  cancelPendingSearch();

  const typed = value.trim();
  if (typed.length < MIN_CHARS) {
    return;
  }

  timer = window.setTimeout(() => {
    emit("search", typed);
  }, DEBOUNCE_MS);
}

/** Emits updated input value. */
function onInput(ev: Event) {
  const value = (ev.target as HTMLInputElement).value;
  emit("update:modelValue", value);

  // Auto-search while typing, debounced.
  scheduleSearch(value);

  if (!value && props.modelValue) {
    emit("clear");
    goToDashboard();
  }
}

/** Emits the search action. */
function onSubmit() {
  emit("search", props.modelValue);
}

/** Clears the input and notifies parent. */
async function onClear() {
  cancelPendingSearch();
  emit("update:modelValue", "");
  emit("clear");
  await router.push({ name: "dashboard" });
}

onBeforeUnmount(() => {
  cancelPendingSearch();
});
</script>
