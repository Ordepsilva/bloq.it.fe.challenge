<script setup lang="ts">
import type { Pokemon } from '@/lib/models/pokemon';
import PokemonCard from '@/components/pokemon-card/PokemonCard.vue';
import { useOnlineStatus } from '@/composables';

const props = defineProps<{
  pokemons: Pokemon[];
  hasFiltersActive?: boolean;
  enableMultiSelect?: boolean;
  selectedIds?: Set<number>;
}>();
const isOnline = useOnlineStatus();

const emit = defineEmits<{
  (e: 'update:selectionChange', value: number): void;
  (e: 'update:selectAll', ids: number[]): void;
  (e: 'update:multiSelectActive', value: boolean): void;
}>();
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <template v-if="props.pokemons.length > 0">
      <PokemonCard
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        :multiSelectActive="props.enableMultiSelect"
        :selected="props.selectedIds?.has(pokemon.id)"
        @update:selectionChange="emit('update:selectionChange', $event)"
        @update:selectAll="emit('update:selectAll', $event)"
        @update:multiSelectActive="emit('update:multiSelectActive', $event)"
      />
    </template>
    <template v-else-if="props.hasFiltersActive">
      <div class="text-center w-full py-8 text-gray-500 text-lg">
        No Pokémons match your filters.
      </div>
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
