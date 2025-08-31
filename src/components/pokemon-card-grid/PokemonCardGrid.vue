<script setup lang="ts">
import type { Pokemon } from '@/lib/models/pokemon';
import PokemonCard from '@/components/pokemon-card/PokemonCard.vue';
import { useOnlineStatus } from '@/composables/useOnlineStatus';

const props = defineProps<{ pokemons: Pokemon[] }>();
const isOnline = useOnlineStatus();
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <template v-if="props.pokemons.length > 0">
      <PokemonCard
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      ></PokemonCard>
    </template>
    <template v-else-if="!isOnline">
      <div class="text-center w-full py-8 text-gray-500 text-lg">
        You are offline. Please go back online to get the latest Pokémons.
      </div>
    </template>
    <template v-else>
      <div class="text-center w-full py-8 text-gray-500 text-lg">No Pokémons Found.</div>
    </template>
  </div>
</template>
