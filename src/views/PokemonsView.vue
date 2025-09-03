<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
import PokemonCardGrid from '@/components/pokemon-card-grid/PokemonCardGrid.vue';
import PokemonPagination from '@/components/pokemon-pagination/PokemonPagination.vue';
import { useIsMobile, usePaginationQuery } from '@/composables';
import { useGetPokemons, useGetPokemonsCount } from '@/lib/queries/pokemons';
import { PER_PAGE } from '@/lib/constants';
import ViewModeToggle from '@/components/view-mode-toggle/ViewModeToggle.vue';
import type { ViewModes } from '@/lib/models/common';
import { toast } from 'vue-sonner';
import PokemonLoading from '@/components/pokemon-loading/PokemonLoading.vue';

const { currentPage } = usePaginationQuery(1);
const viewMode = ref<ViewModes>('table');
const effectiveView = computed(() => (isMobile.value ? 'cards' : viewMode.value));

const isMobile = useIsMobile();

const { data: pokemons, error, isLoading, isError: isErrorPokemons } = useGetPokemons(currentPage);
const { data: count, error: countError, isError: isErrorCount } = useGetPokemonsCount();

watchEffect(() => {
  if (isErrorPokemons.value) {
    toast.error('Error fetching pokemons');
    console.error('Error fetching pokemons:', error.value);
    return;
  }
  if (isErrorCount.value) {
    toast.error('Error fetching pokemons count');
    console.error('Error fetching pokemons count:', countError.value);
    return;
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
      <PokemonLoading v-if="isLoading" />
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
