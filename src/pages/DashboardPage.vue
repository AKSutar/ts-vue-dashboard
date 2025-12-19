<!--
  DashboardPage: Loads index pages from TVmaze.
  - Groups by genre and sorts by rating.
-->
<template>
  <div>
    <SearchBar v-model="query" @search="onSearch" @clear="onClearAndExitSearch" />

    <div class="mt-2">
      <ErrorState v-if="errorMessage" :message="errorMessage" @retry="reload" />

      <div v-else>
        <GenreRow
          v-for="[genre, list] in genreEntries"
          :key="genre"
          :title="genre"
          :shows="list"
          @open="openShow"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DashboardPage:
 * - Prefetches a small number of show-index pages for speed.
 * - Uses computed grouping.
 */
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { groupShowsByGenre, sortShowsByRatingDesc } from "@/utils/shows";
import { loadIndexPages, searchRemote, useShowsState } from "@/composables/useShowsStore";
import { TvMazeShow } from "@/types/tvmaze";

import SearchBar from "@/components/SearchBar.vue";
import GenreRow from "@/components/GenreRow.vue";
import ErrorState from "@/components/ErrorState.vue";

const router = useRouter();
const { shows, isLoading, errorMessage } = useShowsState();

const PAGES_TO_PREFETCH = [0, 1]; // keep small for fast rendering
const query = ref("");

const searchMode = ref(false);
const lastSearch = ref("");
const searchResults = ref<TvMazeShow[]>([]);

const hasAnyShows = computed(() => shows.value.length > 0);

/** The source list changes depending on dashboard/search mode. */
const activeList = computed(() => (searchMode.value ? searchResults.value : shows.value));

/**
 * Optional local filter by current input (fast UX).
 * Remote search is triggered only on submit.
 */
const locallyFiltered = computed(() => {
  const queryData = query.value.trim().toLowerCase();
  if (!queryData) return activeList.value;

  return activeList.value.filter((list) => list.name.toLowerCase().includes(queryData));
});

/** Genre buckets + sorting. */
const genreBuckets = computed(() => groupShowsByGenre(locallyFiltered.value));

/** Order genres by the rating of their top show (so "best" genres appear first). */
const genreEntries = computed(() => {
  const entries = Object.entries(genreBuckets.value);

  entries.sort(([, list], [, movie]) => {
    const topA = list[0]?.rating?.average ?? 0;
    const topB = movie[0]?.rating?.average ?? 0;
    return topB - topA;
  });

  return entries;
});

/** Loads initial dashboard data. */
async function reload() {
  await loadIndexPages(PAGES_TO_PREFETCH);
}

/** Navigates to the detail screen. */
function openShow(id: number) {
  router.push({ name: "show-detail", params: { id } });
}

/** Remote search (explicit user action). */
async function onSearch(value: string) {
  const remoteSearch = value.trim();
  if (!remoteSearch){
    return;
  };

  lastSearch.value = remoteSearch;
  searchMode.value = true;

  // Remote search results are sorted by rating too.
  const found = await searchRemote(remoteSearch);
  searchResults.value = sortShowsByRatingDesc(found);
}

/** Leaves search mode and returns to index buckets. */
function exitSearch() {
  searchMode.value = false;
  searchResults.value = [];
  lastSearch.value = "";
}

/** Clears input and returns from search mode to the dashboard buckets. */
function onClearAndExitSearch() {
  query.value = "";
  exitSearch();
}

onMounted(reload);
</script>
