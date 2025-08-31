import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { usePaginationQuery } from './usePaginationQuery';
import { nextTick } from 'vue';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));

import { useRoute, useRouter } from 'vue-router';

describe('usePaginationQuery', () => {
  let route: { query: Record<string, unknown> };
  let router: { replace: ReturnType<typeof vi.fn> };

  const setupMocks = (query = {}) => {
    route = { query };
    router = { replace: vi.fn() };
    (useRoute as Mock).mockReturnValue(route);
    (useRouter as Mock).mockReturnValue(router);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('defaults to page 1 when no query', () => {
    setupMocks();
    const { currentPage } = usePaginationQuery();
    expect(currentPage.value).toBe(1);
  });

  it('reads page from query if valid', () => {
    setupMocks({ page: '3' });
    const { currentPage } = usePaginationQuery();
    expect(currentPage.value).toBe(3);
  });

  it('updates query when currentPage changes', async () => {
    setupMocks();
    const { currentPage } = usePaginationQuery();
    currentPage.value = 2;
    await nextTick();
    expect(router.replace).toHaveBeenCalledWith({
      query: { page: 2 },
    });
  });

  it('ignores invalid page query', () => {
    setupMocks({ page: 'asd' });
    const { currentPage } = usePaginationQuery();
    expect(currentPage.value).toBe(1);
  });
});
