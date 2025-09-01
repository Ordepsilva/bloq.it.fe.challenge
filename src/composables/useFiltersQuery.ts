import type { SortingColumns, SortingDirections } from '@/lib/models/common';
import { POKEMON_TYPES, type PokemonType } from '@/lib/models/pokemon';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type FilterDefaults = {
  searchName?: string;
  selectedType?: PokemonType;
  sortBy?: SortingColumns;
  sortDir?: SortingDirections;
};

function getQueryValue(value: unknown): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  if (typeof value === 'string') return value;
  return null;
}

function isPokemonType(value: unknown): value is PokemonType {
  return typeof value === 'string' && POKEMON_TYPES.includes(value as PokemonType);
}

function isSortingColumn(value: unknown): value is SortingColumns {
  return ['id', 'name', 'height', 'weight', 'timestamp'].includes(value as SortingColumns);
}

function isSortingDirection(value: unknown): value is SortingDirections {
  return value === 'asc' || value === 'desc';
}

export function useFiltersQuery(defaults: FilterDefaults = {}) {
  const route = useRoute();
  const router = useRouter();

  const nameRaw = getQueryValue(route.query.name);
  const searchName = ref(nameRaw ?? defaults.searchName ?? '');

  const typeRaw = getQueryValue(route.query.type);
  const selectedType = ref(isPokemonType(typeRaw) ? typeRaw : (defaults.selectedType ?? null));

  const sortByRaw = getQueryValue(route.query.sortBy);
  const sortBy = ref(isSortingColumn(sortByRaw) ? sortByRaw : (defaults.sortBy ?? 'id'));

  const sortDirRaw = getQueryValue(route.query.sortDir);
  const sortDir = ref(isSortingDirection(sortDirRaw) ? sortDirRaw : (defaults.sortDir ?? 'asc'));
  watch([searchName, selectedType, sortBy, sortDir], ([name, type, by, dir]) => {
    const newQuery = {
      ...route.query,
      name: name || undefined,
      type: type || undefined,
      sortBy: by,
      sortDir: dir,
    };

    if (JSON.stringify(newQuery) !== JSON.stringify(route.query)) {
      router.replace({ query: newQuery });
    }
  });

  watch(
    () => route.query,
    (query) => {
      const nameRaw = getQueryValue(query.name);
      searchName.value = nameRaw ?? defaults.searchName ?? '';

      const typeRaw = getQueryValue(query.type);
      selectedType.value = isPokemonType(typeRaw) ? typeRaw : (defaults.selectedType ?? null);

      const sortByRaw = getQueryValue(query.sortBy);
      sortBy.value = isSortingColumn(sortByRaw) ? sortByRaw : (defaults.sortBy ?? 'id');

      const sortDirRaw = getQueryValue(query.sortDir);
      sortDir.value = isSortingDirection(sortDirRaw) ? sortDirRaw : (defaults.sortDir ?? 'asc');
    },
  );

  return { searchName, selectedType, sortBy, sortDir };
}
