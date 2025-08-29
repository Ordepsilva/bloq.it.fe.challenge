<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import PokemonTableFilters from '@/components/pokemon-filters/PokemonTableFilters.vue';
import ViewModeToggle from '@/components/view-mode-toggle/ViewModeToggle.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import { usePokedexStore } from '@/stores/pokedex';
import { PER_PAGE } from '@/lib/constants';
import type { SortingColumns, SortingDirections } from '@/lib/models/common';
import type { PokemonType } from '@/lib/models/pokemon';

const store = usePokedexStore();
const route = useRoute();
const router = useRouter();
const isMobile = useIsMobile();

const currentPage = ref(1);
const viewMode = ref<'table' | 'cards'>('table');
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));

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

function handlePageUpdate(page: number) {
  store.setPage(page);
}
</script>

<template>
  <div class="px-4 py-3 space-y-4">
    <div class="flex justify-between items-center">
      <h2>My Pokédex</h2>
      <div class="flex items-center gap-2">
        <ViewModeToggle v-if="!isMobile" v-model="viewMode" />
        <PokemonTableFilters
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
