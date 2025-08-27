<script setup lang="ts">
import AppNavbar from '@/components/ui/navbar/AppNavbar.vue';
</script>

<template>
  <div class="min-h-screen flex-col">
    <AppNavbar></AppNavbar>
    <main class="flex-1 p-4 px-2">
      <RouterView />
    </main>
  </div>
</template>
