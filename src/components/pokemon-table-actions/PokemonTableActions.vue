<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { EllipsisVertical } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type ActionOption = {
  label: string;
  onClick: () => void;
  show: boolean;
};

const props = defineProps<{
  selectedIds: Set<number>;
  selectionMode: boolean;
  totalCount: number;
  pageIds: number[];
}>();

const emit = defineEmits<{
  (e: 'toggleMultiSelect', value: boolean): void;
  (e: 'deleteSelected'): void;
  (e: 'exportSelected'): void;
  (e: 'selectAll'): void;
  (e: 'exportAll'): void;
  (e: 'clearSelection'): void;
}>();

const hasSelected = computed(() => props.selectedIds.size > 0);

const isAllSelectedOnPage = computed(() => {
  const selectedOnPage = props.pageIds.filter((id) => props.selectedIds.has(id));

  return selectedOnPage.length === props.pageIds.length;
});

const multiSelectOptions: ComputedRef<ActionOption[]> = computed(() => {
  return [
    {
      label: props.selectionMode ? 'Cancel' : 'Select Multiple',
      onClick: () => emit('toggleMultiSelect', !props.selectionMode),
      show: true,
    },
    {
      label: 'Select All',
      onClick: () => emit('selectAll'),
      show: props.selectionMode && !isAllSelectedOnPage.value,
    },
    {
      label: 'Delete All',
      onClick: () => emit('deleteSelected'),
      show: hasSelected.value,
    },
    {
      label: 'Clear Selection',
      onClick: () => emit('clearSelection'),
      show: hasSelected.value,
    },
  ].filter((option) => option.show);
});

const exportOptions: ComputedRef<ActionOption[]> = computed(() => {
  return [
    {
      label: 'Export all to CSV',
      onClick: () => emit('exportAll'),
      show: true,
    },
    {
      label: 'Export selected to CSV',
      onClick: () => emit('exportSelected'),
      show: hasSelected.value,
    },
  ].filter((option) => option.show);
});
</script>

<template>
  <DropdownMenu class="ml-auto">
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        class="hover:bg-gray-200 relative transition cursor-pointer"
        title="Actions"
        aria-label="Actions"
      >
        <EllipsisVertical class="size-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="gap-2">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="option in exportOptions"
        :key="option.label"
        @click="option.onClick"
        class="cursor-pointer"
        >{{ option.label }}</DropdownMenuItem
      >
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="option in multiSelectOptions"
        :key="option.label"
        @click="option.onClick"
        class="cursor-pointer"
      >
        {{ option.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
