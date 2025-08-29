<script setup lang="ts">
import AppNavbar from '@/components/navbar/AppNavbar.vue';
</script>

<template>
  <div class="min-h-screen flex-col bg-gradient-to-br from-yellow-100 via-blue-50 to-red-100">
    <AppNavbar />
    <main class="flex-1 p-4 px-2">
      <RouterView />
    </main>
  </div>
</template>
