<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';
const props = defineProps<{
  notes: string[];
}>();
const emit = defineEmits<{
  (e: 'addNote', note: string): void;
  (e: 'removeNote', index: number): void;
}>();

function addNote() {
  if (newNote.value.trim()) {
    emit('addNote', newNote.value.trim());
    newNote.value = '';
  }
}
function removeNote(index: number) {
  emit('removeNote', index);
}
const newNote = ref<string>('');
</script>
<template>
  <Card class="rounded-2xl border-none bg-transparent shadow-lg relative mb-6">
    <CardHeader class="flex items-center gap-2">
      <CardTitle class="text-lg font-pokemon text-yellow-700 drop-shadow"
        >Your Pokémon Notes</CardTitle
      >
    </CardHeader>
    <CardContent class="space-y-2">
      <ul class="space-y-2">
        <li
          v-for="(note, i) in props.notes"
          :key="i"
          class="flex justify-between items-center bg-white/80 p-2 rounded-xl shadow"
        >
          <span class="font-semibold text-gray-700">{{ note }}</span>
          <Button
            size="sm"
            variant="ghost"
            class="cursor-pointer hover:bg-red-100"
            @click="removeNote(i)"
          >
            <X class="w-4 h-4 text-red-500" />
          </Button>
        </li>
      </ul>
      <Textarea
        v-model="newNote"
        placeholder="Write your notes..."
        class="rounded-xl border-2 border-blue-200 bg-white/80"
      />
      <Button
        class="mt-2 font-bold bg-yellow-300 hover:bg-yellow-400 text-yellow-900 rounded-full shadow"
        @click="addNote"
        >Add Note</Button
      >
    </CardContent>
  </Card>
</template>
