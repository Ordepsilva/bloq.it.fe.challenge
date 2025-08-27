<script setup lang="ts">
import { computed, ref } from 'vue';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import PokemonTable from '@/components/pokemon/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon/PokemonCardGrid.vue';
import { useMediaQuery } from '@vueuse/core';
import { LayoutGrid, Table } from 'lucide-vue-next';
import { useQuery } from '@tanstack/vue-query';
import { fetchPokemons } from '@/services/pokemon';

const { data, error, isLoading } = useQuery({
  queryKey: ['pokemons', { limit: 20, offset: 0 }],
  queryFn: () => fetchPokemons(20, 0),
});

const pokemons = computed(() => data?.value || []);

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
      <!-- Replace with Loading Component -->
      <div v-if="isLoading">Loading....</div>
      <div v-else-if="error">Error:{{ error.message }}</div>
      <div v-else>
        <PokemonTable v-if="effectiveView === 'table'" :pokemons="pokemons" />
        <PokemonCardGrid v-else :pokemons="pokemons" />
      </div>
    </div>
  </div>
</template>
