<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
const pokeballImg = '/normal_pokeball.png';
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
    <img :src="pokeballImg" alt="Pokeball" class="size-24 animate-bounce" />
    <h1 class="text-4xl font-bold text-primary">404 - Pokémon Not Found!</h1>
    <p class="text-lg text-muted-foreground">{{ randomText }}</p>
    <router-link
      to="/"
      class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-500 transition"
    >
      <ArrowLeft class="size-5" />
      <span>Go back to Pokédex</span>
    </router-link>
  </div>
</template>
