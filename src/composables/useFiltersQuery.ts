import type { SortingColumns, SortingDirections } from '@/lib/models/common';
import { POKEMON_TYPES, type PokemonType } from '@/lib/models/pokemon';
import { useRouteQuery } from '@vueuse/router';

type FilterDefaults = {
  searchName?: string;
  selectedType?: PokemonType;
  sortBy?: SortingColumns;
  sortDir?: SortingDirections;
};

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
  const searchName = useRouteQuery('name', defaults.searchName ?? '', { transform: String });
  const selectedType = useRouteQuery('type', defaults.selectedType ?? '', {
    transform: (v) => (isPokemonType(v) ? v : undefined),
  });
  const sortBy = useRouteQuery('sortBy', defaults.sortBy ?? 'id', {
    transform: (v) => (isSortingColumn(v) ? v : 'id'),
  });
  const sortDir = useRouteQuery('sortDir', defaults.sortDir ?? 'asc', {
    transform: (v) => (isSortingDirection(v) ? v : 'asc'),
  });

  return { searchName, selectedType, sortBy, sortDir };
}
