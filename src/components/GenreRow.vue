<!--GenreRow: Horizontal scrolling list of ShowCards.-->
<template>
  <section class="mt-2">
    <div class="row justify-between mb-2">
      <h2 class="text-lg">{{ title }}</h2>
      <div class="muted text-sm">{{ shows.length }} shows</div>
    </div>

    <div class="strip">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" @open="$emit('open', $event)" />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * GenreRow:
 * - title: genre label.
 * - shows: list for that genre, already sorted.
 */
import { TvMazeShow } from "@/types/tvmaze";
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
