<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import { useGetPokemons, useGetPokemonsCount } from '@/lib/queries/pokemons';
import { PER_PAGE } from '@/lib/constants';
import ViewModeToggle from '@/components/view-mode-toggle/ViewModeToggle.vue';
import type { ViewModes } from '@/lib/models/common';
import { usePaginationQuery } from '@/composables/usePaginationQuery';

const { currentPage } = usePaginationQuery(1);
const viewMode = ref<ViewModes>('table');
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));

const isMobile = useIsMobile();

const { data: pokemons, error, isLoading, isError: isErrorPokemons } = useGetPokemons(currentPage);
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
}
</script>

<template>
  <div class="px-4 space-y-4">
    <div class="flex justify-end items-center">
      <ViewModeToggle
        v-if="!isMobile"
        v-model="viewMode"
        :disabled="isLoading || isErrorPokemons"
      />
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
          :per-page="PER_PAGE"
          :total="count ?? 0"
          @update:page="handlePageUpdate"
        />
      </div>
    </div>
  </div>
</template>
