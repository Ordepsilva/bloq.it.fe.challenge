<script lang="ts" setup>
import { NotebookPen } from 'lucide-vue-next';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue';
const props = defineProps<{
  notes: string[];
}>();
</script>

<template>
  <div v-if="props.notes.length" class="relative inline-block">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild
          ><NotebookPen
            data-testid="pokemon-notes-icon"
            class="size-4 cursor-pointer hover:text-red-500"
        /></TooltipTrigger>
        <TooltipContent data-testid="pokemon-notes-tooltip">
          <div class="flex flex-col">
            "{{ props.notes[0] }}"
            <span v-if="props.notes.length > 1">(+{{ props.notes.length - 1 }} more)</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
