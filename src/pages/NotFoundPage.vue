<!-- NotFoundPage: Simple 404 page. -->
<template>
  <div class="panel" style="padding: 14px">
    <h2 class="not-found">Page not found</h2>
    <div class="muted" style="margin-bottom: 12px">The requested route does not exist.</div>
    <RouterLink class="btn" to="/">Go to dashboard</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  font-size: 18px;
  margin-bottom: 6px;
}
</style>
