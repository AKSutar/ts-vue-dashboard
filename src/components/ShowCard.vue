<!--ShowCard: Clickable card for a show. Uses lazy-loaded images for perceived performance -->
<template>
  <article class="panel card" @click="onOpen" role="button" tabindex="0" @keydown.enter="onOpen">
    <img
      class="poster"
      :src="imgSrc"
      :alt="show.name"
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
    />
    <div class="p-2.5">
      <div class="row justify-between gap-1">
        <h3 class="text-md leading-3">{{ show.name }}</h3>
        <RatingPill :rating="show.rating?.average ?? null" />
      </div>
      <div class="muted mt-1 text-md">{{ metaText }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
/**
 * ShowCard:
 * - show: the TV show.
 * - open: emitted on user selection.
 */
import { computed } from "vue";
import { TvMazeShow } from "@/types/tvmaze";
import RatingPill from "@/components/RatingPill.vue";

const props = defineProps<{ show: TvMazeShow }>();
const emit = defineEmits<{ (e: "open", id: number): void }>();

/** Uses a safe placeholder if no image exists. */
const imgSrc = computed(() => {
  return (
    props.show.image?.medium ||
    props.show.image?.original ||
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="210" height="295">
        <rect width="100%" height="100%" fill="#101a2e"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#e9eefc" font-size="14">
          No image
        </text>
      </svg>`
    )}`
  );
});

/** Builds small metadata line. */
const metaText = computed(() => {
  const parts: string[] = [];
  if (props.show.language) parts.push(props.show.language);
  if (props.show.premiered) parts.push(props.show.premiered.slice(0, 4));
  if (props.show.status) parts.push(props.show.status);
  return parts.join(" • ");
});

/** Emits open event for navigation. */
function onOpen() {
  emit("open", props.show.id);
}
</script>

<style scoped>
.card {
  width: 210px;
  min-width: 210px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;
}
.poster {
  width: 100%;
  height: 295px;
  object-fit: cover;
  display: block;
  border-bottom: 1px solid var(--border);
}
</style>
