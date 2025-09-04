<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import PokemonTableFilters from '@/components/pokemon-filters/PokemonTableFilters.vue';
import ViewModeToggle from '@/components/view-mode-toggle/ViewModeToggle.vue';
import { usePokedexStore } from '@/stores/pokedex';
import type { ViewModes } from '@/lib/models/common';
import { Progress } from '@/components/ui/progress';
import { useGetPokemonsCount } from '@/lib/queries/pokemons';
import { toast } from 'vue-sonner';
import PokemonTableActions from '@/components/pokemon-table-actions/PokemonTableActions.vue';
import { useTableActions, useFiltersQuery, usePaginationQuery, useIsMobile } from '@/composables';

const viewMode = ref<ViewModes>('table');
const store = usePokedexStore();
const isMobile = useIsMobile();
const { currentPage } = usePaginationQuery(1);
const { searchName, selectedType, sortBy, sortDir } = useFiltersQuery({
  searchName: '',
  selectedType: undefined,
  sortBy: 'id',
  sortDir: 'asc',
});

const {
  selectedIds,
  selectionMode,
  toggleSelect,
  handleMultiSelectToggle,
  handleSelectAll,
  handleDeleteSelected,
  exportSelectedToCSV,
  exportAllPokedexToCSV,
  clearSelection,
} = useTableActions();

const { data: count, error, isError } = useGetPokemonsCount();

const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));
const caughtCount = computed(() => Object.keys(store.caughtPokemons).length);
const progressValue = computed(() => (count.value ? (caughtCount.value / count.value) * 100 : 0));
const currentPagePokemonIds = computed(() => {
  return store.paginatedPokemons.map((pokemon) => pokemon.id);
});

watch(
  currentPage,
  (page) => {
    store.setPage(page);
  },
  { immediate: true },
);

watch(
  [searchName, selectedType, sortBy, sortDir],
  ([name, type, by, dir]) => {
    store.searchName = name;
    store.selectedType = type;
    store.sortBy = by;
    store.sortDir = dir;
  },
  { immediate: true },
);

watchEffect(() => {
  if (isError.value) {
    toast.error('Error fetching pokémons count.');
    console.error('Error fetching pokémons count', error.value);
  }
});

function handlePageUpdate(page: number) {
  currentPage.value = page;
}
</script>

<template>
  <div class="px-4 space-y-4">
    <div class="flex items-center gap-2 md:gap-0 flex-col md:flex-row">
      <div class="flex items-center gap-2 md:gap-8 w-full flex-col md:flex-row">
        <div class="flex items-center">
          <img src="/normal_pokeball.png" alt="Pokeball" class="size-10" />
          <h2 class="text-red-600 drop-shadow whitespace-nowrap">My Pokédex</h2>
        </div>

        <div class="flex w-full items-center gap-2 flex-col md:flex-row">
          <span class="px-3 py-1 rounded-full bg-green-200 text-green-800 font-semibold">
            {{ caughtCount }} / {{ count }} caught
          </span>
          <Progress class="w-8/12 h-3 bg-gray-200" :model-value="progressValue" />
        </div>
      </div>
      <div class="flex md:items-center gap-2 items-end">
        <ViewModeToggle v-if="!isMobile" v-model="viewMode" />
        <PokemonTableFilters
          v-if="store.filteredPokemons.length > 0 || store.activeFilterCount > 0"
          v-model:searchName="searchName"
          v-model:selectedType="selectedType"
          v-model:sortBy="sortBy"
          v-model:sortDir="sortDir"
        />
        <PokemonTableActions
          v-if="store.filteredPokemons.length > 0"
          :selectedIds="selectedIds"
          :selectionMode="selectionMode"
          :totalCount="store.paginatedPokemons.length"
          :pageIds="currentPagePokemonIds"
          @toggleMultiSelect="handleMultiSelectToggle"
          @exportSelected="exportSelectedToCSV"
          @exportAll="exportAllPokedexToCSV"
          @selectAll="handleSelectAll(currentPagePokemonIds)"
          @clearSelection="clearSelection"
          @deleteSelected="
            () => {
              handleDeleteSelected();
              currentPage = 1;
            }
          "
        />
      </div>
    </div>

    <PokemonTable
      v-if="effectiveView === 'table'"
      :pokemons="store.paginatedPokemons"
      :hasFiltersActive="store.activeFilterCount > 0"
      :enableMultiSelect="selectionMode"
      :selectedIds="selectedIds"
      @update:selectionChange="toggleSelect"
      @update:selectAll="handleSelectAll"
    />
    <PokemonCardGrid
      v-else
      :pokemons="store.paginatedPokemons"
      :hasFiltersActive="store.activeFilterCount > 0"
      :enableMultiSelect="selectionMode"
      :selectedIds="selectedIds"
      @update:selectionChange="toggleSelect"
      @update:selectAll="handleSelectAll"
      @update:multiSelectActive="handleMultiSelectToggle"
    />

    <PokemonPagination
      v-if="store.filteredPokemons.length > store.itemsPerPage"
      class="mt-2"
      :page="currentPage"
      :perPage="store.itemsPerPage"
      :total="store.filteredPokemons.length"
      @update:page="handlePageUpdate"
    />
  </div>
</template>
