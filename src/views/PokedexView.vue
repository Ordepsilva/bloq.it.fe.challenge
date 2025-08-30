<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { usePaginationQuery } from '@/composables/usePaginationQuery';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import PokemonTableFilters from '@/components/pokemon-filters/PokemonTableFilters.vue';
import ViewModeToggle from '@/components/view-mode-toggle/ViewModeToggle.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import { usePokedexStore } from '@/stores/pokedex';
import { PER_PAGE } from '@/lib/constants';
import type { ViewModes } from '@/lib/models/common';
import { exportPokemonsToCsv } from '@/lib/models/pokemon';
import { Progress } from '@/components/ui/progress';
import { useGetPokemonsCount } from '@/lib/queries/pokemons';
import { downloadCsv } from '@/lib/csv';
import { DownloadIcon } from 'lucide-vue-next';
import { useFiltersQuery } from '@/composables/useFiltersQuery';
import { toast } from 'vue-sonner';

const store = usePokedexStore();
const { currentPage } = usePaginationQuery(1);

store.setPage(currentPage.value);

watch(currentPage, (page) => {
  store.setPage(page);
});

const isMobile = useIsMobile();
const { searchName, selectedType, sortBy, sortDir } = useFiltersQuery({
  searchName: '',
  selectedType: undefined,
  sortBy: 'id',
  sortDir: 'asc',
});
const viewMode = ref<ViewModes>('table');
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));
const { data: count, error, isError } = useGetPokemonsCount();
const caughtCount = computed(() => Object.keys(store.caughtPokemons).length);
const progressValue = computed(() => (count.value ? (caughtCount.value / count.value) * 100 : 0));
const caughtPokemons = computed(() => Object.values(store.caughtPokemons));

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
  store.setPage(page);
}

function downloadPokedexCsv() {
  const csv = exportPokemonsToCsv(caughtPokemons.value);
  downloadCsv(csv, 'my_pokedex.csv');
}
</script>

<template>
  <div class="px-4 space-y-4">
    <div class="flex items-center flex-col md:flex-row">
      <div class="flex items-center gap-8 w-full flex-col md:flex-row">
        <div class="flex items-center">
          <img src="/normal_pokeball.svg" alt="Pokeball" class="w-10 h-10" />
          <h2 class="text-red-600 drop-shadow whitespace-nowrap">My Pokédex</h2>
        </div>

        <div class="flex w-full items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-green-200 text-green-800 font-semibold">
            {{ caughtCount }} / {{ count }} caught
          </span>
          <Progress class="w-8/12 h-3 bg-gray-200" :model-value="progressValue" />
        </div>
      </div>
      <div class="flex md:items-center gap-2 items-end">
        <div role="button" class="flex items-center gap-1 p-2" title="Download Pokédex CSV">
          <DownloadIcon
            class="w-5 h-5 text-gray-500 cursor-pointer hover:scale-110"
            @click="downloadPokedexCsv"
          />
        </div>
        <ViewModeToggle v-if="!isMobile" v-model="viewMode" />
        <PokemonTableFilters
          v-if="store.filteredPokemons.length > 0 || store.activeFilterCount > 0"
          v-model:searchName="searchName"
          v-model:selectedType="selectedType"
          v-model:sortBy="sortBy"
          v-model:sortDir="sortDir"
        />
      </div>
    </div>

    <PokemonTable v-if="effectiveView === 'table'" :pokemons="store.paginatedPokemons" />
    <PokemonCardGrid v-else :pokemons="store.paginatedPokemons" />

    <PokemonPagination
      v-if="store.filteredPokemons.length > PER_PAGE"
      class="mt-2"
      :page="store.currentPage"
      :per-page="store.itemsPerPage"
      :total="store.filteredPokemons.length"
      @update:page="handlePageUpdate"
    />
  </div>
</template>
