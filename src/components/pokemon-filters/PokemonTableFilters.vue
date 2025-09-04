<script setup lang="ts">
import {
  SORTING_COLUMNS,
  type SortingColumns,
  type SortingDirections,
  getPokemonTypeColor,
  POKEMON_TYPES,
  type PokemonFilters,
  type PokemonType,
} from '@/lib/models';
import { usePokedexStore } from '@/stores/pokedex';
import { ref, computed } from 'vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import PokemonTypeBadge from '@/components/pokemon-type-badge/PokemonTypeBadge.vue';

const props = defineProps<PokemonFilters>();

const emit = defineEmits<{
  (e: 'update:searchName', value: string): void;
  (e: 'update:selectedType', value: PokemonType | undefined): void;
  (e: 'update:sortBy', value: SortingColumns): void;
  (e: 'update:sortDir', value: SortingDirections): void;
}>();

const showFilters = ref(false);

const sortKey = ref<SortingColumns>(props.sortBy);
const sortDir = ref<SortingDirections>(props.sortDir);
const filterName = ref(props.searchName);
const filterType = ref(props.selectedType);

const store = usePokedexStore();
const capitalizedTypes = computed(() =>
  POKEMON_TYPES.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: getPokemonTypeColor(type),
  })),
);

function applyFilters() {
  emit('update:sortBy', sortKey.value);
  emit('update:sortDir', sortDir.value);
  emit('update:searchName', filterName.value);
  emit('update:selectedType', filterType.value);
}

function resetFilters() {
  sortKey.value = 'id';
  sortDir.value = 'asc';
  filterName.value = '';
  filterType.value = undefined;
  emit('update:sortBy', 'id');
  emit('update:sortDir', 'asc');
  emit('update:searchName', '');
  emit('update:selectedType', undefined);
}

function selectType(type: PokemonType) {
  if (filterType.value === type) {
    filterType.value = undefined;
    return;
  }
  filterType.value = type;
}
</script>

<template>
  <Popover v-model:open="showFilters" tooltip="Filters & Sorting">
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        class="hover:bg-gray-200 relative transition"
        :class="[
          store.activeFilterCount > 0 ? 'bg-blue-500 text-white' : '',
          showFilters ? 'ring-2 ring-blue-400 bg-blue-100 shadow-lg' : '',
        ]"
        title="Filters & Sorting"
        tooltip="Filters & Sorting"
        data-testid="filter-popover-trigger"
      >
        <SlidersHorizontal class="size-5" />
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="w-full max-w-xs sm:w-64 p-4 mr-2 sm:mr-6 sm:mb-6 rounded-lg shadow-lg flex flex-col gap-4 h-80 overflow-y-auto md:h-auto"
    >
      <div class="flex flex-col gap-2">
        <span class="font-semibold text-gray-700">Sort by</span>

        <div class="flex gap-2 flex-wrap">
          <Button
            v-for="sortColumn in SORTING_COLUMNS"
            :key="sortColumn.key"
            :data-testid="`sort-column-${sortColumn.label}`"
            size="sm"
            variant="outline"
            :class="sortKey === sortColumn.key ? 'bg-blue-500 text-white' : ''"
            @click="sortKey = sortColumn.key"
            >{{ sortColumn.label }}</Button
          >
        </div>
        <div class="flex gap-2 flex-col">
          <span class="font-semibold text-gray-700">Sort Direction</span>
          <Button
            data-testid="sort-direction"
            size="sm"
            variant="outline"
            @click="sortDir = sortDir === 'asc' ? 'desc' : 'asc'"
          >
            {{ sortDir === 'asc' ? '↑ Asc' : '↓ Desc' }}
          </Button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span class="font-semibold text-gray-700">Filter by</span>
        <Input
          v-model="filterName"
          data-testid="filter-name"
          placeholder="Search name..."
          class="w-full mb-2"
        />
        <div class="flex flex-wrap gap-2 mt-1">
          <PokemonTypeBadge
            v-for="type in capitalizedTypes"
            :key="type.value"
            :type="type.value"
            :data-testid="`filter-type-${type.value}`"
            class="cursor-pointer"
            :class="[
              filterType === type.value ? 'ring-2 ring-offset-1 ring-black' : '',
              type.color,
            ]"
            @click="selectType(type.value)"
          />
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-2 mt-2 w-full">
        <Button variant="secondary" size="sm" @click="applyFilters()">Apply</Button>
        <Button variant="outline" size="sm" class="clear" @click="resetFilters()">Reset</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
