import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function usePaginationQuery(defaultPage = 1) {
  const route = useRoute();
  const router = useRouter();

  const pageFromQuery = parseInt(route.query.page as string);
  const currentPage = ref(!isNaN(pageFromQuery) && pageFromQuery > 0 ? pageFromQuery : defaultPage);

  watch(currentPage, (newPage) => {
    router.replace({
      query: { ...route.query, page: newPage !== 1 ? newPage : undefined },
    });
  });

  watch(
    () => route.query.page,
    (page) => {
      const pageNum = parseInt(page as string);
      if (!isNaN(pageNum) && pageNum > 0 && pageNum !== currentPage.value) {
        currentPage.value = pageNum;
      }
    },
  );

  return { currentPage };
}
