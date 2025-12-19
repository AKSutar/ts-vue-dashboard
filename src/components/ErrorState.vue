<!-- ErrorState: Consistent error message + retry -->
<template>
  <div class="panel p-4">
    <div class="mb-2 font-normal">Something went wrong</div>
    <div class="muted mb-2">{{ message }}</div>
    <button class="btn" type="button" @click="$emit('retry')">Retry</button>
  </div>
</template>

<script setup lang="ts">
/**
 * ErrorState:
 * - message: error text
 * - retry: action callback
 */
defineProps<{ message: string }>();
defineEmits<{ (e: "retry"): void }>();
</script>
