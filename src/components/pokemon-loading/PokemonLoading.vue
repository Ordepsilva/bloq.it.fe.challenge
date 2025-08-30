<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const messages = [
  'Loading Pokémon Data…',
  'Did you know? Magikarp is still loading Splash!',
  'Hang tight! Pikachu is charging up.',
  'Snorlax is blocking the way…',
  'Searching for rare candies…',
  'Team Rocket is up to something!',
];
const currentMessage = ref(messages[0]);
let intervalId: number | undefined;

onMounted(() => {
  let i = 0;
  intervalId = window.setInterval(() => {
    i = (i + 1) % messages.length;
    currentMessage.value = messages[i];
  }, 1800);
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 gap-4">
    <img src="/normal_pokeball.svg" alt="Loading Pokéball" class="w-16 h-16 pokeball-bounce" />
    <div class="text-2xl font-pokemon font-bold text-primary drop-shadow">
      {{ currentMessage }}
    </div>
  </div>
</template>
