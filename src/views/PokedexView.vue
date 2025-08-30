<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import PokemonTableFilters from '@/components/pokemon-filters/PokemonTableFilters.vue';
import ViewModeToggle from '@/components/view-mode-toggle/ViewModeToggle.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import { usePokedexStore } from '@/stores/pokedex';
import { PER_PAGE } from '@/lib/constants';
import type { SortingColumns, SortingDirections, ViewModes } from '@/lib/models/common';
import { exportPokemonsToCsv, type PokemonType } from '@/lib/models/pokemon';
import { Progress } from '@/components/ui/progress';
import { useGetPokemonsCount } from '@/lib/queries/pokemons';
import { downloadCsv } from '@/lib/csv';
import { DownloadIcon } from 'lucide-vue-next';

const store = usePokedexStore();
const route = useRoute();
const router = useRouter();
const isMobile = useIsMobile();

const currentPage = ref(1);
const viewMode = ref<ViewModes>('table');
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));
const { data: count, isError } = useGetPokemonsCount();
const progressValue = computed(() =>
  count.value ? (store.caughtPokemons.size / count.value) * 100 : 0,
);
watch(
  () => route.query,
  (query) => {
    store.searchName = (query.name as string) ?? '';
    store.selectedType = (query.type as PokemonType) ?? null;
    store.sortBy = (query.sortBy as SortingColumns) ?? 'id';
    store.sortDir = (query.sortDir as SortingDirections) ?? 'asc';
    currentPage.value = parseInt(query.page as string) || 1;
  },
  { immediate: true },
);

watch(
  [
    () => store.searchName,
    () => store.selectedType,
    () => store.sortBy,
    () => store.sortDir,
    currentPage,
  ],
  () => {
    router.replace({
      query: {
        name: store.searchName || undefined,
        type: store.selectedType || undefined,
        sortBy: store.sortBy,
        sortDir: store.sortDir,
        page: currentPage.value,
      },
    });
  },
  { deep: true },
);

watchEffect(() => {
  if (isError.value) {
    //TODO:TOAST
    console.error('Error fetching pokemons count');
  }
});

function handlePageUpdate(page: number) {
  store.setPage(page);
}

function downloadPokedexCsv() {
  const csv = exportPokemonsToCsv(Array.from(store.caughtPokemons.values()));
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
            {{ store.caughtPokemons.size }} / {{ count }} caught
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
          v-model:search-name="store.searchName"
          v-model:type="store.selectedType"
          v-model:sort-by="store.sortBy"
          v-model:sort-dir="store.sortDir"
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
