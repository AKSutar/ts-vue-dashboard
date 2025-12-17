<!--LoadingSkeleton: Simple skeleton blocks for perceived speed -->

<template>
  <div class="panel" style="padding: 12px;">
    <div class="muted" style="margin-bottom: 10px;">Loading shows…</div>
    <div class="skeleton-strip">
      <div v-for="n in 6" :key="n" class="skeleton-card"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.skeleton-strip {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 210px;
  gap: 12px;
  overflow-x: hidden;
}
.skeleton-card {
  height: 360px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: linear-gradient(
    90deg,
    color-mix(in oklab, var(--panel), transparent 0%),
    color-mix(in oklab, var(--accent), transparent 90%),
    color-mix(in oklab, var(--panel), transparent 0%)
  );
  background-size: 200% 100%;
  animation: shimmer 1.15s infinite;
}
@keyframes shimmer {
  0% { background-position: 180% 0; }
  100% { background-position: -20% 0; }
}
</style>
