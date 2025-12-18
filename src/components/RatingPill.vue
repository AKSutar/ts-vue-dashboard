<!--RatingPill: Displays rating consistently -->
<template>
  <span class="panel rating" :title="title"> ★ {{ text }} </span>
</template>

<script setup lang="ts">
/**
 * RatingPill:
 * - rating: numeric rating or null.
 */
const props = defineProps<{ rating: number | null | undefined }>();

const text = computed(() => (props.rating ? props.rating.toFixed(1) : "N/A"));
const title = computed(() => (props.rating ? `Rating: ${props.rating}` : "No rating available"));

import { computed } from "vue";
</script>

<style scoped>
.rating {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
}
</style>
