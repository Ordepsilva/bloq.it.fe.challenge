<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';

defineProps<{ to: string }>();
const route = useRoute();
</script>

<template>
  <RouterLink
    :to="to"
    class="transition duration-300 hover:text-primary"
    :class="{ 'text-primary': route.path === to }"
  >
    <slot />
  </RouterLink>
</template>
