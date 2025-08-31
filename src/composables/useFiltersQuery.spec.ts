import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { useFiltersQuery } from './useFiltersQuery';
import { useRoute, useRouter } from 'vue-router';
import type { Mock } from 'vitest';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));

describe('useFiltersQuery', () => {
  let route: { query: Record<string, unknown> };
  let router: { replace: ReturnType<typeof vi.fn> };

  const setupMocks = (initialQuery = {}) => {
    const routeQuery = ref(initialQuery);
    route = { query: routeQuery.value };
    router = { replace: vi.fn() };
    (useRoute as Mock).mockReturnValue(route);
    (useRouter as Mock).mockReturnValue(router);
  };

  it('initializes from route.query', () => {
    setupMocks({ name: 'squirtle', type: 'water', sortBy: 'weight', sortDir: 'desc' });
    const { searchName, selectedType, sortBy, sortDir } = useFiltersQuery();

    expect(searchName.value).toBe('squirtle');
    expect(selectedType.value).toBe('water');
    expect(sortBy.value).toBe('weight');
    expect(sortDir.value).toBe('desc');
  });

  it('updates route.query when composable values change', async () => {
    setupMocks({ name: 'squirtle', type: 'water', sortBy: 'weight', sortDir: 'desc' });
    const { searchName, selectedType, sortBy, sortDir } = useFiltersQuery();

    searchName.value = 'bulbasaur';
    selectedType.value = 'grass';
    sortBy.value = 'name';
    sortDir.value = 'asc';

    await nextTick();

    expect(router.replace).toHaveBeenCalledWith({
      query: {
        name: 'bulbasaur',
        type: 'grass',
        sortBy: 'name',
        sortDir: 'asc',
      },
    });
  });

  it('syncs values when route.query changes', async () => {
    setupMocks({ name: 'wartortle', type: 'water', sortBy: 'height', sortDir: 'asc' });
    const { searchName, selectedType, sortBy, sortDir } = useFiltersQuery();

    setupMocks({ name: 'wartortle', type: 'water', sortBy: 'height', sortDir: 'asc' });
    await nextTick();

    expect(searchName.value).toBe('wartortle');
    expect(selectedType.value).toBe('water');
    expect(sortBy.value).toBe('height');
    expect(sortDir.value).toBe('asc');
  });
});
