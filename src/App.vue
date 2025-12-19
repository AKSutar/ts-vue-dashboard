<template>
  <div class="container">
    <header class="panel p-3.5">
      <div class="row justify-between">
        <RouterLink to="/" class="link">
          <div>
            <h1 class="text-xl mb-3">TV Dashboard</h1>
            <div class="muted text-sm">Genres · Ratings · Search</div>
          </div>
        </RouterLink>
      </div>
    </header>

    <main class="mt-2">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}
</style>
