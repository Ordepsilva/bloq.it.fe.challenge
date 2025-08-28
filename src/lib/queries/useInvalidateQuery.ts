import { useQueryClient } from '@tanstack/vue-query';

export function useInvalidateQuery(queryKey: string | unknown[]) {
  const queryClient = useQueryClient();

  function invalidate() {
    queryClient.invalidateQueries({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    });
  }

  return { invalidate };
}
