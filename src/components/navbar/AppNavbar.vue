<script setup lang="ts">
import DesktopNav from './DesktopNav.vue';
import MobileNav from './MobileNav.vue';
</script>

<template>
  <nav class="bg-gradient-to-r from-yellow-200 via-red-100 to-blue-200 text-foreground shadow-lg">
    <div class="mx-auto w-full px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <div class="text-3xl font-semibold flex items-center">
          <img
            src="/ultra_ball.svg"
            alt="Pokeball Logo"
            class="h-10 w-10 object-contain animate-bounce drop-shadow-lg"
          />
        </div>
        <h2 class="font-bold text-2xl font-pokemon tracking-wide drop-shadow">PokéCenter</h2>
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
