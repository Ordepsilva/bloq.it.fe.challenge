<script setup lang="ts">
import DesktopNav from './DesktopNav.vue'
import MobileNav from './MobileNav.vue'
</script>

<template>
  <nav class="bg-card text-foreground">
    <div class="container mx-auto px-2 py-4 flex justify-between items-center">
      <!-- Pokeball Logo -->
      <div class="text-2xl font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-pokeball"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="9" cy="9" r="9" transform="translate(3 3)" />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h6m6 0h6" />
        </svg>
      </div>

      <div class="hidden md:flex">
        <DesktopNav />
      </div>

      <div class="md:hidden">
        <MobileNav />
      </div>
    </div>
  </nav>
</template>
