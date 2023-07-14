<script setup>
import { RouterView } from 'vue-router'


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" height="100" />

  </header>
  <Suspense>
    <RouterView />
  </Suspense>

  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  flex-grow: 2;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
