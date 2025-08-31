<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { computed } from 'vue';

interface PaginationProps {
  total: number;
  perPage: number;
  page: number;
  loading?: boolean;
}

const props = defineProps<PaginationProps>();

const emit = defineEmits<{
  (e: 'update:page', value: number): void;
}>();

const pagesToShow = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, props.page - 1);
  const end = Math.min(totalPages.value, props.page + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

function goToPage(page: number) {
  if (!props.loading && page >= 1 && page <= totalPages.value) {
    emit('update:page', page);
  }
}
</script>

<template>
  <Pagination :total="props.total" :items-per-page="props.perPage" :page="props.page">
    <PaginationContent>
      <PaginationPrevious
        :disabled="props.page === 1 || props.loading"
        href="#"
        @click.prevent="goToPage(props.page - 1)"
      />

      <PaginationItem v-if="props.page > 2" :value="1" @click.prevent="goToPage(1)">
        1
      </PaginationItem>
      <PaginationEllipsis v-if="props.page > 3" />

      <PaginationItem
        v-for="pageNumber in pagesToShow"
        :key="pageNumber"
        :value="pageNumber"
        :is-active="pageNumber === props.page"
        @click.prevent="goToPage(pageNumber)"
      >
        {{ pageNumber }}
      </PaginationItem>

      <PaginationEllipsis v-if="props.page < totalPages - 2" />
      <PaginationItem
        v-if="props.page < totalPages - 1"
        :value="totalPages"
        @click.prevent="goToPage(totalPages)"
      >
        {{ totalPages }}
      </PaginationItem>

      <PaginationNext
        data-test="pagination-next"
        :disabled="props.page === totalPages || props.loading"
        href="#"
        @click.prevent="goToPage(props.page + 1)"
      />
    </PaginationContent>
  </Pagination>
</template>
