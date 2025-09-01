import { getQueryValue } from '@/lib/utils';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function usePaginationQuery(defaultPage = 1) {
  const route = useRoute();
  const router = useRouter();

  const pageRaw = getQueryValue(route.query.page);
  const pageNum = Number(pageRaw);
  const currentPage = ref(pageNum > 0 ? pageNum : defaultPage);

  watch(currentPage, (newPage) => {
    router.replace({
      query: { ...route.query, page: newPage !== 1 ? newPage : undefined },
    });
  });

  watch(
    () => route.query.page,
    (page) => {
      const pageRaw = getQueryValue(page);
      const pageNum = Number(pageRaw);
      if (pageNum > 0 && pageNum !== currentPage.value) {
        currentPage.value = pageNum;
      }
    },
  );

  return { currentPage };
}
