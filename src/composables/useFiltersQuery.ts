import type { SortingColumns, SortingDirections } from '@/lib/models/common';
import type { PokemonType } from '@/lib/models/pokemon';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type FilterDefaults = {
  searchName?: string;
  selectedType?: PokemonType;
  sortBy?: SortingColumns;
  sortDir?: SortingDirections;
};

export function useFiltersQuery(defaults: FilterDefaults = {}) {
  const route = useRoute();
  const router = useRouter();

  const searchName = ref((route.query.name as string) ?? defaults.searchName ?? '');
  const selectedType = ref((route.query.type as PokemonType) ?? defaults.selectedType ?? null);
  const sortBy = ref((route.query.sortBy as SortingColumns) ?? defaults.sortBy ?? 'id');
  const sortDir = ref((route.query.sortDir as SortingDirections) ?? defaults.sortDir ?? 'asc');

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
      searchName.value = (query.name as string) ?? defaults.searchName ?? '';
      selectedType.value = (query.type as PokemonType) ?? defaults.selectedType ?? null;
      sortBy.value = (query.sortBy as SortingColumns) ?? defaults.sortBy ?? 'id';
      sortDir.value = (query.sortDir as SortingDirections) ?? defaults.sortDir ?? 'asc';
    },
  );

  return { searchName, selectedType, sortBy, sortDir };
}
