import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type {
  SortingColumns,
  SortingDirections,
  Pokemon,
  PokemonCaughtEntry,
  PokemonType,
} from '@/lib/models';
import { PER_PAGE } from '@/lib/constants';
import 'pinia-plugin-persistedstate';
import { useQueryClient } from '@tanstack/vue-query';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';

export const usePokedexStore = defineStore(
  'pokedex',
  () => {
    const caughtPokemons = ref<Record<number, PokemonCaughtEntry>>({});
    const currentPage = ref(1);
    const itemsPerPage = ref(PER_PAGE);
    const searchName = ref<string>('');
    const selectedType = ref<PokemonType | undefined>(undefined);
    const sortBy = ref<SortingColumns>('id');
    const sortDir = ref<SortingDirections>('asc');

    watch([searchName, selectedType], () => {
      currentPage.value = 1;
    });

    const activeFilterCount = computed(() => {
      let count = 0;
      if (searchName.value !== '') count++;
      if (selectedType.value !== undefined) count++;
      if (sortBy.value !== 'id') count++;
      if (sortDir.value !== 'asc') count++;
      return count;
    });

    const queryClient = useQueryClient();
    function toggleCaught(pokemon: Pokemon) {
      if (caughtPokemons.value[pokemon.id]) {
        delete caughtPokemons.value[pokemon.id];
        return;
      }
      caughtPokemons.value[pokemon.id] = {
        ...pokemon,
        notes: [],
        timestamp: Date.now(),
      };
      queryClient.setQueryData([QUERY_KEYS.pokemon, pokemon.id], { ...pokemon });
    }

    function deletePokemons(ids: number[]) {
      ids.forEach((id) => {
        delete caughtPokemons.value[id];
      });
    }

    function addNote(id: number, note: string) {
      const entry = caughtPokemons.value[id];
      if (entry) entry.notes.push(note);
    }

    function removeNote(id: number, index: number) {
      const entry = caughtPokemons.value[id];
      if (entry) {
        entry.notes.splice(index, 1);
        caughtPokemons.value[id] = { ...entry };
      }
    }

    function setPage(page: number) {
      currentPage.value = page;
    }

    function getNotes(pokemonId: number): string[] {
      return caughtPokemons.value[pokemonId]?.notes ?? [];
    }

    const filteredPokemons = computed(() => {
      let result = Object.values(caughtPokemons.value);

      if (searchName.value) {
        result = result.filter((e) =>
          e.name.toLowerCase().includes(searchName.value.toLowerCase()),
        );
      }

      if (selectedType.value) {
        result = result.filter((e) => e.types.includes(selectedType.value as PokemonType));
      }

      result.sort((a, b) => {
        const key = sortBy.value;
        const dir = sortDir.value === 'asc' ? 1 : -1;
        const aValue = a[key];
        const bValue = b[key];

        if (aValue === bValue) return 0;
        return aValue < bValue ? -dir : dir;
      });

      return result;
    });

    const paginatedPokemons = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return filteredPokemons.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredPokemons.value.length / itemsPerPage.value);
    });

    return {
      caughtPokemons,
      searchName,
      selectedType,
      sortBy,
      sortDir,
      toggleCaught,
      addNote,
      removeNote,
      filteredPokemons,
      paginatedPokemons,
      activeFilterCount,
      currentPage,
      itemsPerPage,
      totalPages,
      setPage,
      getNotes,
      deletePokemons,
    };
  },
  {
    persist: true,
  },
);
