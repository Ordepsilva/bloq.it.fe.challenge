<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Pokemon } from '@/models/pokemon';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import PokemonTable from '@/components/pokemon/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon/PokemonCardGrid.vue';
import { useMediaQuery } from '@vueuse/core';
import { LayoutGrid, Table } from 'lucide-vue-next';

const props = defineProps<{
  pokemons: Pokemon[];
}>();

//TODO replace with real data fetching
const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 1,
    name: 'bulbasaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 1,
    name: 'bulbasaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 1,
    name: 'bulbasaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 4,
    name: 'charmander',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['fire'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 7,
    name: 'squirtle',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    types: ['water'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
];
const viewMode = ref<'table' | 'cards'>('table');
const isMobile = useMediaQuery('(max-width: 640px)');
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));
</script>

<template>
  <div class="px-4 py-3 space-y-4">
    <div class="flex justify-end">
      <ToggleGroup v-if="!isMobile" v-model="viewMode" type="single" class="flex">
        <ToggleGroupItem value="table" class="p-2 rounded-md hover:bg-gray-200">
          <Table class="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="cards" class="p-2 rounded-md hover:bg-gray-200">
          <LayoutGrid class="h-5 w-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
    <div>
      <PokemonTable v-if="effectiveView === 'table'" :pokemons="mockPokemons" />
      <PokemonCardGrid v-else :pokemons="mockPokemons" />
    </div>
  </div>
</template>
