<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePokedexStore } from '@/stores/pokedex';
import { getPokemonCardColor } from '@/lib/models/colors';
import { useGetPokemon, useGetPokemonEvolutions } from '@/lib/queries/pokemons';
import { useRoute } from 'vue-router';
import PokemonTypeBadge from '@/components/pokemon-type-badge/PokemonTypeBadge.vue';
import { usePokemonCaught } from '@/composables/usePokemonCaught';
import PokeballButton from '@/components/pokeball-button/PokeballButton.vue';
import { formatDate } from '@/lib/utils';

import { Share2 } from 'lucide-vue-next';
import PokemonStatsRadar from '@/components/pokemon-stats-radar/PokemonStatsRadar.vue';
import PokemonEvolutions from '@/components/pokemon-evolutions/PokemonEvolutions.vue';
import PokemonNotes from '@/components/pokemon-notes/PokemonNotes.vue';
import { share } from '@/lib/share';

const route = useRoute();

const id = route.params.id as string;
const store = usePokedexStore();
const { isCaught, toggleCaught } = usePokemonCaught();

const { data: pokemon, error, isLoading, isError } = useGetPokemon(id);
const { data: evolutions } = useGetPokemonEvolutions(Number(id));

const caughtPokemon = computed(() => store.caughtPokemons.get(Number(id)));
const typeColor = computed(() => getPokemonCardColor(pokemon.value?.types[0] ?? ''));
watchEffect(() => {
  if (isError.value) {
    //TODO:throw toast error
    //return in every if
    console.error('Error fetching pokemons:', error.value);
  }
});

function addNote(note: string) {
  store.addNote(Number(id), note);
}

function removeNote(index: number) {
  store.removeNote(Number(id), index);
}

function sharePokemon() {
  if (!pokemon.value) return;
  share({
    title: `Check out ${pokemon.value.name} on Pokédex!`,
    text: `#${pokemon.value.id} ${pokemon.value.name}`,
    url: window.location.href,
  });
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div v-if="isLoading">Loading…</div>
    <div v-else-if="isError">Error loading Pokémon.</div>
    <div v-else-if="pokemon">
      <Card
        class="mb-6 relative overflow-hidden rounded-2xl p-4 shadow-lg border-none"
        :class="typeColor"
      >
        <div class="absolute right-4 top-4 flex gap-6">
          <div
            role="button"
            class="flex items-center p-4 hover:scale-110 transition-transform duration-300"
            title="Share Pokémon"
          >
            <Share2 class="w-6 h-6 cursor-pointer text-white" @click="sharePokemon" />
          </div>
          <PokeballButton
            :caught="isCaught(pokemon)"
            size="w-16 h-16"
            @click="toggleCaught(pokemon)"
          />
        </div>

        <CardHeader class="flex flex-col md:flex-row items-center gap-6 py-6">
          <img
            :src="pokemon.imgUrl"
            :alt="pokemon.name"
            class="w-40 h-40 object-contain drop-shadow-lg transition-transform duration-300"
          />
          <div class="flex flex-col gap-3 text-center md:text-left">
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <CardTitle class="text-4xl font-pokemon font-bold tracking-wide drop-shadow">
                #{{ pokemon.id }} {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
              </CardTitle>
            </div>
            <span v-if="caughtPokemon?.timestamp" class="text-xs text-gray-500">
              Caught on: {{ formatDate(caughtPokemon?.timestamp) }}
            </span>
            <div class="flex gap-2 justify-center md:justify-start">
              <PokemonTypeBadge v-for="t in pokemon.types" :key="t" :type="t">
                {{ t }}
              </PokemonTypeBadge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div v-if="isCaught(pokemon)" class="mb-6">
        <PokemonNotes
          :notes="caughtPokemon?.notes ?? []"
          @addNote="addNote"
          @removeNote="removeNote"
        />
      </div>

      <div class="flex flex-col md:flex-row gap-4 w-full">
        <Card class="mb-6 rounded-2xl shadow-lg border-none bg-transparent">
          <CardHeader class="flex items-center gap-3 pb-0">
            <CardTitle class="text-lg font-pokemon text-yellow-700 drop-shadow"
              >About This Pokémon</CardTitle
            >
          </CardHeader>
          <CardContent class="p-4">
            <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div class="flex flex-col items-center bg-white/70 rounded-xl p-2 shadow">
                <span class="font-bold text-blue-700">Height</span>
                <span>{{ pokemon.height }} m</span>
              </div>
              <div class="flex flex-col items-center bg-white/70 rounded-xl p-2 shadow">
                <span class="font-bold text-red-700">Weight</span>
                <span>{{ pokemon.weight }} kg</span>
              </div>
              <div class="flex flex-col items-center bg-white/70 rounded-xl p-2 shadow col-span-2">
                <span class="font-bold text-yellow-700">Base Experience</span>
                <span>{{ pokemon.base_experience }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <PokemonStatsRadar :stats="pokemon.stats" class="flex-1" />
      </div>

      <PokemonEvolutions :evolutions="evolutions ?? []" />
    </div>
  </div>
</template>
