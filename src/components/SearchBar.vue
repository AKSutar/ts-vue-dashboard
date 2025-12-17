<!-- SearchBar: Emits "search" on submit -->
<template>
  <form class="panel" style="padding: 12px;" @submit.prevent="onSubmit">
    <div class="row" style="gap: 10px;">
      <input
        class="input"
        :value="modelValue"
        type="search"
        inputmode="search"
        placeholder="Search shows by name (e.g. 'Office')"
        aria-label="Search shows"
        @input="onInput"
      />
      <button class="btn" type="submit">Search</button>
      <button v-if="modelValue" class="btn" type="button" @click="onClear">Clear</button>
    </div>
  </form>
</template>

<script setup lang="ts">
/**
 * SearchBar props & events:
 * - modelValue: current text.
 * - update:modelValue: two-way binding.
 * - search: explicit user action for remote search.
 */
const props = defineProps<{ modelValue: string }>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
  (e: "clear"): void;
}>();

/** Emits updated input value. */
function onInput(ev: Event) {
  const value = (ev.target as HTMLInputElement).value;
  emit("update:modelValue", value);
}

/** Emits the search action. */
function onSubmit() {
  emit("search", props.modelValue);
}

/** Clears the input and notifies parent. */
function onClear() {
  emit("update:modelValue", "");
  emit("clear");
}
</script>
