<!--RatingPill: Displays rating consistently -->
<template>
  <span class="panel rating"> ★ {{ text }} </span>
</template>

<script setup lang="ts">
/**
 * RatingPill:
 * - rating: numeric rating or null.
 */
import { computed } from "vue";
const props = defineProps<{ rating: number | null | undefined }>();
const text = computed(() => (props.rating ? props.rating.toFixed(1) : "N/A"));

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
