import { useRouteQuery } from '@vueuse/router';

export function usePaginationQuery(defaultPage = 1) {
  const currentPage = useRouteQuery('page', defaultPage, { transform: Number });
  return { currentPage };
}
