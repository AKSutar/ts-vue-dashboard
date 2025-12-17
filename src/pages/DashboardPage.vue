<!--
  DashboardPage: Loads index pages from TVmaze.
  - Groups by genre and sorts by rating.
-->
<template>
  <div>
    <SearchBar v-model="query" @search="onSearch" @clear="onClear" />

    <div style="margin-top: 14px;">
      <LoadingSkeleton v-if="isLoading && !hasAnyShows" />
      <ErrorState v-else-if="errorMessage" :message="errorMessage" @retry="reload" />

      <div v-else>
        <div v-if="searchMode" class="panel" style="padding: 12px; margin-bottom: 12px;">
          <div class="row" style="justify-content: space-between;">
            <div>
              <div style="font-weight: 600;">Search results</div>
              <div class="muted" style="font-size: 12px;">Query: “{{ lastSearch }}”</div>
            </div>
            <button class="btn" type="button" @click="exitSearch">Back to dashboard</button>
          </div>
        </div>

        <div v-if="genreEntries.length === 0" class="panel" style="padding: 12px;">
          <div style="font-weight: 600;">No results</div>
          <div class="muted">Try a different search term.</div>
        </div>

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
 * - Uses computed grouping (no watchers).
 */
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { groupShowsByGenre, sortShowsByRatingDesc } from "@/utils/shows";
import { loadIndexPages, searchRemote, useShowsState } from "@/composables/useShowsStore";
import type { TvMazeShow } from "@/types/tvmaze";

import SearchBar from "@/components/SearchBar.vue";
import GenreRow from "@/components/GenreRow.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
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
  const q = query.value.trim().toLowerCase();
  if (!q) return activeList.value;

  return activeList.value.filter((s) => s.name.toLowerCase().includes(q));
});

/** Genre buckets + sorting. */
const genreBuckets = computed(() => groupShowsByGenre(locallyFiltered.value));

/** Order genres by the rating of their top show (so "best" genres appear first). */
const genreEntries = computed(() => {
  const entries = Object.entries(genreBuckets.value);

  entries.sort(([, a], [, b]) => {
    const topA = a[0]?.rating?.average ?? 0;
    const topB = b[0]?.rating?.average ?? 0;
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
  const q = value.trim();
  if (!q) return;

  lastSearch.value = q;
  searchMode.value = true;

  // Remote search results are sorted by rating too.
  const found = await searchRemote(q);
  searchResults.value = sortShowsByRatingDesc(found);
}

/** Clears local input; does not change mode. */
function onClear() {
  query.value = "";
}

/** Leaves search mode and returns to index buckets. */
function exitSearch() {
  searchMode.value = false;
  searchResults.value = [];
  lastSearch.value = "";
}

onMounted(reload);
</script>
