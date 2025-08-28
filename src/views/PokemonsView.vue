<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import { LayoutGrid, Table } from 'lucide-vue-next';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import { useGetPokemons, useGetPokemonsCount } from '@/lib/queries/pokemons';
import { useInvalidateQuery } from '@/lib/queries/useInvalidateQuery';

const currentPage = ref(1);
const viewMode = ref<'table' | 'cards'>('table');

const perPage = 10;

const isMobile = useIsMobile();
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));

const { invalidate: invalidatePokemons } = useInvalidateQuery('pokemons');
const {
  data: pokemons,
  error,
  isLoading,
  isError: isErrorPokemons,
} = useGetPokemons(currentPage.value);

const { data: count, isError: isErrorCount } = useGetPokemonsCount();

watchEffect(() => {
  if (isErrorPokemons.value) {
    //throw toast error
    //return in every if
    console.error('Error fetching pokemons:', error.value);
  }
  if (isErrorCount.value) {
    console.error('Error fetching pokemons count');
  }
});

function handlePageUpdate(page: number) {
  currentPage.value = page;
  invalidatePokemons();
}
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
      <div v-else-if="isErrorPokemons">Error:{{ 'Failed to get Pokemons' }}</div>
      <div v-else>
        <PokemonTable v-if="effectiveView === 'table'" :pokemons="pokemons ?? []" />
        <PokemonCardGrid v-else :pokemons="pokemons ?? []" />
        <PokemonPagination
          class="mt-2"
          :loading="isLoading"
          :page="currentPage"
          :per-page="perPage"
          :total="count ?? 0"
          @update:page="handlePageUpdate"
        />
      </div>
    </div>
  </div>
</template>
