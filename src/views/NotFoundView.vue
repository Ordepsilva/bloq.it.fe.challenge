<script setup lang="ts">
const pokeballImg = '/normal_pokeball.svg';
const funnyText = [
  "Looks like you've used Splash!",
  'This page is as lost as a Magikarp in a sandstorm.',
  '404: No Pokémon found here!',
  'Try using your Pokédex again!',
];
const randomText = funnyText[Math.floor(Math.random() * funnyText.length)];
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
    <img :src="pokeballImg" alt="Pokeball" class="w-24 h-24 animate-bounce" />
    <h1 class="text-4xl font-bold text-primary">404 - Pokémon Not Found!</h1>
    <p class="text-lg text-muted-foreground">{{ randomText }}</p>
    <router-link
      to="/"
      class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-500 transition"
    >
      <span>Go back to Pokédex</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </router-link>
  </div>
</template>
