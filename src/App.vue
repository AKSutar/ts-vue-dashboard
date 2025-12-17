
<template>
  <div class="container">
    <header class="panel" style="padding: 14px 14px">
      <div class="row" style="justify-content: space-between">
        <RouterLink to="/" style="text-decoration: none">
          <div>
            <h1 style="font-size: 18px; margin-bottom: 2px">TV Dashboard</h1>
            <div class="muted" style="font-size: 13px">Genres · Ratings · Search</div>
          </div>
        </RouterLink>
      </div>
    </header>

    <main style="margin-top: 14px">
      <!-- Key by fullPath so ShowDetailPage remounts on param change. -->
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup lang="ts">

</script>
