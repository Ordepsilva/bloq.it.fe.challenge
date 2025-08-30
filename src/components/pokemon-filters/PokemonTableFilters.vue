<script setup lang="ts">
import { getPokemonTypeColor } from '@/lib/models/colors';
import type { SortingColumns, SortingDirections } from '@/lib/models/common';
import { POKEMON_TYPES, type PokemonType } from '@/lib/models/pokemon';
import { usePokedexStore } from '@/stores/pokedex';
import { defineProps, defineEmits, ref, computed } from 'vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';

const props = defineProps<{
  searchName: string;
  selectedType: PokemonType | null;
  sortBy: SortingColumns;
  sortDir: SortingDirections;
}>();

const emit = defineEmits<{
  (e: 'update:searchName', value: string): void;
  (e: 'update:selectedType', value: PokemonType | null): void;
  (e: 'update:sortBy', value: SortingColumns): void;
  (e: 'update:sortDir', value: SortingDirections): void;
}>();

const showFilters = ref(false);
const sortKey = ref<SortingColumns>(props.sortBy);
const sortDir = ref<SortingDirections>(props.sortDir);
const filterKey = ref<'name' | 'type'>('name');
const filterValue = ref(props.searchName);

const store = usePokedexStore();
const capitalizedTypes = computed(() =>
  POKEMON_TYPES.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: getPokemonTypeColor(type),
  })),
);

const sortingColumns: { key: SortingColumns; label: string }[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'timestamp',
    label: 'Date Caught',
  },
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
];

const filterColumns: { key: 'name' | 'type'; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
];

function applyFilters() {
  emit('update:sortBy', sortKey.value);
  emit('update:sortDir', sortDir.value);
  if (filterKey.value === 'name') {
    emit('update:searchName', filterValue.value);
    emit('update:selectedType', null);
  } else {
    emit('update:selectedType', filterValue.value as PokemonType);
    emit('update:searchName', '');
  }
}

function selectType(type: PokemonType) {
  if (filterValue.value === type) {
    filterValue.value = '';
    return;
  }
  filterValue.value = type;
}
</script>

<template>
  <Popover v-model:open="showFilters" tooltip="Filters & Sorting">
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        class="hover:bg-gray-200 relative"
        :class="store.activeFilterCount > 0 ? 'bg-blue-500' : ''"
        title="Filters & Sorting"
        tooltip="Filters & Sorting"
      >
        <SlidersHorizontal class="w-5 h-5" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-64 p-4 mr-6 bg-white rounded-xl shadow-lg flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <span class="font-semibold text-gray-700">Sort by</span>
        <div class="flex gap-2 flex-wrap">
          <Button
            v-for="sortColumn in sortingColumns"
            :key="sortColumn.key"
            size="sm"
            variant="outline"
            :class="sortKey === sortColumn.key ? 'bg-blue-500 text-white' : ''"
            @click="sortKey = sortColumn.key"
            >{{ sortColumn.label }}</Button
          >

          <Button size="sm" variant="ghost" @click="sortDir = sortDir === 'asc' ? 'desc' : 'asc'">
            {{ sortDir === 'asc' ? '↑ Asc' : '↓ Desc' }}
          </Button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span class="font-semibold text-gray-700">Filter by</span>
        <div class="flex gap-2 flex-wrap">
          <Button
            v-for="filterColumn in filterColumns"
            :key="filterColumn.key"
            size="sm"
            variant="outline"
            :class="filterKey === filterColumn.key ? 'bg-gray-200' : ''"
            @click="filterKey = filterColumn.key"
            >{{ filterColumn.label }}</Button
          >
        </div>

        <div>
          <template v-if="filterKey === 'name'">
            <Input v-model="filterValue" placeholder="Search name..." class="w-full" />
          </template>

          <template v-else>
            <div class="flex flex-wrap gap-1 mt-1">
              <Button
                v-for="type in capitalizedTypes"
                :key="type.value"
                size="sm"
                variant="outline"
                :class="[
                  filterValue === type.value ? 'ring-2 ring-offset-1 ring-black' : '',
                  type.color,
                ]"
                @click="selectType(type.value)"
              >
                {{ type.label }}
              </Button>
            </div>
          </template>
        </div>
      </div>

      <Button variant="secondary" @click="applyFilters()" class="mt-2">Apply</Button>
    </PopoverContent>
  </Popover>
</template>
