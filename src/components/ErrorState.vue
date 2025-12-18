<!-- ErrorState: Consistent error message + retry -->
<template>
  <div class="panel" style="padding: 12px">
    <div class="msg">Something went wrong</div>
    <div class="muted" style="margin-bottom: 10px">{{ message }}</div>
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

<style scoped>
.msg {
  margin-bottom: 6px;
  font-weight: 600;
}
</style>
