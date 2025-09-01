<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/composables/useIsMobile';
import type { PokemonEvolution } from '@/lib/models/pokemon';
import { MoveRight, MoveDown } from 'lucide-vue-next';

const isMobile = useIsMobile();
const props = defineProps<{
  evolutions: PokemonEvolution[];
}>();
</script>
<template>
  <Card class="mb-6 rounded-2xl shadow-lg border-none bg-transparent">
    <CardHeader class="flex items-center gap-3 pb-0 pt-4">
      <img src="/ultra_ball.svg" alt="Ultra Ball" class="size-8 drop-shadow" />
      <CardTitle class="text-lg font-pokemon text-yellow-700">Evolutions</CardTitle>
    </CardHeader>
    <CardContent class="p-4">
      <div
        v-if="props.evolutions && props.evolutions.length"
        class="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-center"
          v-for="(evo, i) in props.evolutions"
          :key="evo.name"
        >
          <div class="flex flex-col items-center justify-center p-3 min-w-[120px]">
            <img
              :src="evo.imgUrl ?? '/placeholder.png'"
              :alt="evo.name"
              class="size-16 object-contain mb-2"
            />
            <span class="font-bold">#{{ evo.id }} {{ evo.name }}</span>
          </div>
          <template v-if="i < props.evolutions.length - 1">
            <MoveRight v-if="!isMobile" class="mx-2 size-8 text-yellow-700" />
            <MoveDown v-else class="mx-2 size-8 text-yellow-700" />
          </template>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center py-4">
        No evolutions available for this Pokémon.
      </div>
    </CardContent>
  </Card>
</template>
