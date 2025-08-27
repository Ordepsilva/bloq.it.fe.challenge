<script setup lang="ts">
import DesktopNav from './DesktopNav.vue';
import MobileNav from './MobileNav.vue';
</script>

<template>
  <nav class="bg-card text-foreground">
    <div class="mx-auto w-full px-4 py-4 flex justify-between items-center border-b-1">
      <div class="flex items-center gap-2">
        <div class="text-2xl font-semibold">
          <!-- Pokeball Logo -->
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
        <h2 class="font-bold">PokeDex</h2>
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
