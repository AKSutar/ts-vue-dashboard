<!--GenreRow: Horizontal scrolling list of ShowCards.-->
<template>
  <section style="margin-top: 14px;">
    <div class="row">
      <h2 style="font-size: 16px;">{{ title }}</h2>
      <div class="muted" style="font-size: 12px;">{{ shows.length }} shows</div>
    </div>

    <div class="strip">
      <ShowCard v-for="s in shows" :key="s.id" :show="s" @open="$emit('open', $event)" />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * GenreRow:
 * - title: genre label.
 * - shows: list for that genre, already sorted.
 */
import type { TvMazeShow } from "@/types/tvmaze";
import ShowCard from "@/components/ShowCard.vue";

defineProps<{ title: string; shows: TvMazeShow[] }>();

defineEmits<{ (e: "open", id: number): void }>();
</script>

<style scoped>
.strip {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
}
.strip::-webkit-scrollbar {
  height: 10px;
}
.strip::-webkit-scrollbar-thumb {
  background: color-mix(in oklab, var(--accent), transparent 70%);
  border-radius: 999px;
}
</style>
