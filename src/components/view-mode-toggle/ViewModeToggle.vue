<script setup lang="ts">
import { computed } from 'vue';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, Table } from 'lucide-vue-next';
import type { ViewModes } from '@/lib/models/common';

const props = defineProps<{
  modelValue: ViewModes;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: ViewModes): void;
}>();

const localValue = computed({
  get: () => props.modelValue ?? 'cards',
  set: (value: ViewModes) => {
    if (value !== props.modelValue) {
      emit('update:modelValue', value);
    }
  },
});
</script>

<template>
  <ToggleGroup v-model="localValue" type="single" class="flex" :disabled="props.disabled">
    <ToggleGroupItem
      :disabled="modelValue == 'table'"
      value="table"
      class="p-2 text-gray-500 rounded-md cursor-pointer hover:bg-gray-200"
    >
      <Table class="size-5" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="cards"
      :disabled="modelValue == 'cards'"
      class="p-2 text-gray-500 rounded-md cursor-pointer hover:bg-gray-200"
    >
      <LayoutGrid class="size-5" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
