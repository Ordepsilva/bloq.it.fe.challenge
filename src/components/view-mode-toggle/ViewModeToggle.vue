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
  get: () => props.modelValue,
  set: (value: ViewModes) => emit('update:modelValue', value),
});
</script>

<template>
  <ToggleGroup v-model="localValue" type="single" class="flex" :disabled="props.disabled">
    <ToggleGroupItem value="table" class="p-2 rounded-md cursor-pointer hover:bg-gray-200">
      <Table class="h-5 w-5" />
    </ToggleGroupItem>
    <ToggleGroupItem value="cards" class="p-2 rounded-md cursor-pointer hover:bg-gray-200">
      <LayoutGrid class="h-5 w-5" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
