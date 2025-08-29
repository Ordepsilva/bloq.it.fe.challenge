<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';

defineProps<{ to: string }>();
const route = useRoute();
</script>

<template>
  <RouterLink
    :to="to"
    class="transition-colors duration-200 px-3 py-2 rounded"
    :class="[route.path === to ? 'text-primary  underline' : 'text-gray-700 hover:text-primary']"
  >
    <slot />
  </RouterLink>
</template>
