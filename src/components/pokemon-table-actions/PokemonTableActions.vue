<script setup lang="ts">
import { computed, defineProps } from 'vue';
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
const props = defineProps<{
  selectedIds: Set<number>;
  selectionMode: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleMultiSelect', value: boolean): void;
  (e: 'deleteSelected'): void;
  (e: 'exportSelected'): void;
  (e: 'selectAll'): void;
  (e: 'clearSelection'): void;
}>();

const hasSelected = computed(() => props.selectedIds.size > 0);
const dropdownOptions = computed(() => {
  return [
    {
      label: props.selectionMode ? 'Cancel' : 'Select Multiple',
      onClick: () => emit('toggleMultiSelect', !props.selectionMode),
      show: true,
    },
    {
      label: 'Delete All',
      onClick: () => emit('deleteSelected'),
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
      >
        <EllipsisVertical class="size-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="gap-2">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="option in dropdownOptions"
        :key="option.label"
        @click="option.onClick"
        class="cursor-pointer"
      >
        {{ option.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
