<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Pokemon } from '@/lib/models/pokemon';
import { getPokemonCardColor } from '@/lib/models/colors';
import PokemonTypeBadge from '@/components/pokemon-type-badge/PokemonTypeBadge.vue';
import { computed } from 'vue';
import PokeballButton from '../pokeball-button/PokeballButton.vue';
import { usePokemonCaught } from '@/composables/usePokemonCaught';

const props = defineProps<{
  pokemon: Pokemon;
}>();

const router = useRouter();

const mainType = computed(() => {
  return props.pokemon.types[0] ?? 'normal';
});

const { isCaught, toggleCaught } = usePokemonCaught();
</script>

<template>
  <Card
    class="group relative m-1 h-[14rem] w-[18rem] cursor-pointer select-none overflow-hidden border-none rounded-2xl hover:scale-110 transition-transform duration-200"
    :class="getPokemonCardColor(mainType)"
    @click="router.push(`/pokemon/${pokemon.id}`)"
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
        </CardTitle>
      </div>
      <div class="">
        <PokeballButton
          :caught="isCaught(pokemon)"
          size="w-12 h-12"
          @click="toggleCaught(pokemon)"
        />
      </div>
    </CardHeader>

    <CardContent class="flex justify-between items-center relative z-10">
      <img
        :src="pokemon.imgUrl"
        alt="pokemon"
        data-testid="pokemon-image"
        class="h-30 w-30 transition-transform duration-200 group-hover:scale-110"
      />
      <div class="flex flex-col gap-2">
        <PokemonTypeBadge v-for="type in pokemon.types" :key="type" :type="type" />
      </div>
    </CardContent>
  </Card>
</template>
