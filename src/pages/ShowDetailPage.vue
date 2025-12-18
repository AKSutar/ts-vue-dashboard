<!-- ShowDetailPage: Fetches show detail by id -->
<template>
  <div class="panel" style="padding: 14px">
    <div class="row back">
      <button class="btn" type="button" @click="goBack">← Back</button>
    </div>

    <LoadingSkeleton v-if="isLoading && !show" />
    <ErrorState v-else-if="errorMessage" :message="errorMessage" @retry="load" />

    <div v-else-if="show" class="detail">
      <img class="hero" :src="heroImg" :alt="show.name" loading="lazy" decoding="async" />

      <div>
        <div class="row details">
          <div>
            <h2 class="showname">{{ show.name }}</h2>
            <div class="muted" style="font-size: 13px">
              {{ show.type || "Show" }}
              <span v-if="show.language"> • {{ show.language }}</span>
              <span v-if="show.premiered"> • {{ show.premiered }}</span>
            </div>
          </div>

          <RatingPill :rating="show.rating?.average ?? null" />
        </div>

        <div class="chips" style="margin-top: 10px">
          <span v-for="g in show.genres" :key="g" class="chip">{{ g }}</span>
          <span v-if="!show.genres?.length" class="chip">Other</span>
        </div>

        <div style="margin-top: 12px">
          <h3 class="summary">Summary</h3>
          <p class="muted summarytext">
            {{ summaryText || "No summary available." }}
          </p>
        </div>

        <div style="margin-top: 12px">
          <h3 class="links">Links</h3>
          <div class="row" style="flex-wrap: wrap">
            <a
              v-if="show.officialSite"
              class="btn"
              :href="show.officialSite"
              target="_blank"
              rel="noreferrer"
            >
              Official site
            </a>
            <a v-if="show.url" class="btn" :href="show.url" target="_blank" rel="noreferrer">
              TVmaze
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="muted">Show not found.</div>
  </div>
</template>

<script setup lang="ts">
/**
 * ShowDetailPage:
 * - Fetches details via store helper.
 * - Uses explicit load() called from onMounted.
 */
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import RatingPill from "@/components/RatingPill.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import ErrorState from "@/components/ErrorState.vue";
import { getShowDetails } from "@/composables/useShowsStore";
import { summaryToText } from "@/utils/shows";
import type { TvMazeShow } from "@/types/tvmaze";

const route = useRoute();
const router = useRouter();

const show = ref<TvMazeShow | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const id = computed(() => Number(route.params.id));

const summaryText = computed(() => summaryToText(show.value?.summary));
const heroImg = computed(() => {
  return (
    show.value?.image?.original ||
    show.value?.image?.medium ||
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800">
        <rect width="100%" height="100%" fill="#101a2e"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#e9eefc" font-size="18">
          No image
        </text>
      </svg>`
    )}`
  );
});

/** Loads show detail using the ID from the route. */
async function load() {
  errorMessage.value = null;
  isLoading.value = true;
  try {
    show.value = await getShowDetails(id.value);
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : "Unknown error";
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.push({ name: "dashboard" });
}

onMounted(load);
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 14px;
}
@media (max-width: 760px) {
  .detail {
    grid-template-columns: 1fr;
  }
}
.hero {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--border);
  object-fit: cover;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  background: color-mix(in oklab, var(--panel), transparent 0%);
}

.back {
  justify-content: space-between;
  margin-bottom: 12px;
}

.details {
  justify-content: space-between;
  align-items: flex-start;
}

.showname {
  font-size: 20px;
  margin-bottom: 6px;
}

.summary {
  font-size: 14px;
  margin-bottom: 6px;
}

.summarytext {
  margin: 0;
  line-height: 1.55;
}

.links {
  font-size: 14px;
  margin-bottom: 6px;
}
</style>
