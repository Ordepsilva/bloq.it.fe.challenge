<script setup lang="ts">
import type { Pokemon } from '@/lib/models/pokemon';
import PokemonCard from '@/components/pokemon-card/PokemonCard.vue';

const props = defineProps<{ pokemons: Pokemon[] }>();
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <PokemonCard
      v-for="pokemon in props.pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    ></PokemonCard>
  </div>
</template>
