<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  isPokemonCaughtEntry,
  type Pokemon,
  type PokemonCaughtEntry,
  getPokemonCardColor,
} from '@/lib/models';
import PokemonTypeBadge from '@/components/pokemon-type-badge/PokemonTypeBadge.vue';
import { computed, ref } from 'vue';
import PokeballButton from '@/components/pokeball-button/PokeballButton.vue';
import { usePokemonCaught } from '@/composables';
import PokemonNotesPreview from '@/components/pokemon-notes-preview/PokemonNotesPreview.vue';
import { Badge } from '@/components/ui/badge';
import { STAT_BADGES_CONFIG } from '@/lib/constants';

const props = defineProps<{
  pokemon: Pokemon | PokemonCaughtEntry;
  multiSelectActive?: boolean;
  selected?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:multiSelectActive', value: boolean): void;
  (e: 'update:selectAll', ids: number[]): void;
  (e: 'update:selectionChange', value: number): void;
}>();

const flipped = ref(false);

let longPressTimer: ReturnType<typeof setTimeout>;

const router = useRouter();

const mainType = computed(() => {
  return props.pokemon.types[0] ?? 'normal';
});

function startLongPress(id: number) {
  longPressTimer = setTimeout(() => {
    emit('update:multiSelectActive', true);
    toggleSelect(id);
  }, 500);
}
function cancelLongPress() {
  clearTimeout(longPressTimer);
}

function toggleSelect(id: number) {
  emit('update:selectionChange', id);
}

const { isCaught, toggleCaught } = usePokemonCaught();
</script>

<template>
  <Card
    class="group relative m-1 h-[14rem] w-[18rem] cursor-pointer select-none overflow-hidden border-none rounded-2xl hover:scale-110 transition-transform duration-200"
    :class="[
      getPokemonCardColor(mainType),
      multiSelectActive ? 'ring-2 ring-gray-400' : '',
      selected ? 'ring-4 ring-red-500' : '',
    ]"
    @click.stop="
      multiSelectActive ? toggleSelect(pokemon.id) : router.push(`/pokemon/${pokemon.id}`)
    "
    @mouseenter="flipped = true"
    @mouseleave="flipped = false"
    @touchstart="startLongPress(pokemon.id)"
    @touchend="cancelLongPress"
  >
    <div
      class="absolute left-0 top-0 h-full w-full"
      :style="{
        backgroundImage: `url(${pokemon.imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        filter: 'brightness(0) invert(0)',
      }"
    />

    <CardHeader class="flex justify-between relative items-center z-10">
      <div class="flex items-center gap-1">
        <span class="font-mono text-4xl text-white/50"> #{{ pokemon.id }} </span>
        <CardTitle class="capitalize text-white/80 group-hover:text-white flex">
          {{ pokemon.name }}

          <PokemonNotesPreview
            v-if="isPokemonCaughtEntry(pokemon) && pokemon.notes.length > 0"
            :notes="pokemon.notes"
            class="inline-block ml-2"
          />
        </CardTitle>
      </div>

      <PokeballButton
        :caught="isCaught(pokemon)"
        size="md:size-12 size-14"
        @click="toggleCaught(pokemon)"
      />
    </CardHeader>

    <CardContent class="flex justify-between items-center relative z-10">
      <img
        :src="
          flipped
            ? (pokemon.shinyImgUrl ?? '/placeholder.png')
            : (pokemon.imgUrl ?? '/placeholder.png')
        "
        alt="pokemon"
        data-testid="pokemon-image"
        class="size-30 transition-transform duration-200 group-hover:scale-110"
      />

      <template v-if="!flipped">
        <div class="flex flex-col gap-2">
          <PokemonTypeBadge v-for="type in pokemon.types" :key="type" :type="type" />
        </div>
      </template>

      <template v-else>
        <div class="flex flex-wrap gap-1 justify-end flex-1">
          <Badge
            v-for="badge in STAT_BADGES_CONFIG"
            :key="badge.key"
            :title="`${badge.label}: ${pokemon.stats[badge.key]}`"
            class="text-xs flex items-center font-mono w-14"
            :class="[badge.bg, badge.text]"
          >
            {{ badge.icon }} {{ pokemon.stats[badge.key] }}
          </Badge>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
