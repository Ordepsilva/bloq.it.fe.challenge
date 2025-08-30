import { useQuery } from '@tanstack/vue-query';
import { PER_PAGE } from '@/lib/constants';
import {
  getPokemonByNameOrId,
  getPokemonEvolutions,
  getPokemons,
  getPokemonsCount,
} from '@/lib/api/pokemon';
import type { Ref } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
import type { Pokemon, PokemonCaughtEntry, PokemonEvolution } from '../models/pokemon';
import { QUERY_KEYS } from './queryKeys';

export function useGetPokemons(currentPage: Ref<number>) {
  return useQuery({
    queryKey: [QUERY_KEYS.pokemons, currentPage],
    queryFn: () => getPokemons(PER_PAGE, (currentPage.value - 1) * PER_PAGE),
  });
}

export function useGetPokemonsCount() {
  return useQuery({
    queryKey: [QUERY_KEYS.pokemonsCount],
    queryFn: () => getPokemonsCount(),
  });
}

export function useGetPokemon(idOrName: number | string) {
  const store = usePokedexStore();

  return useQuery<Pokemon | PokemonCaughtEntry>({
    queryKey: [QUERY_KEYS.pokemon, idOrName],
    queryFn: () => getPokemonByNameOrId(idOrName),
    initialData: () => {
      const numericId = Number(idOrName);
      const entry = store.caughtPokemons[numericId];
      return entry ? { ...entry } : undefined;
    },
  });
}

export function useGetPokemonEvolutions(pokemonId: number) {
  return useQuery<PokemonEvolution[]>({
    queryKey: [QUERY_KEYS.pokemonEvolutions, pokemonId],
    queryFn: () => getPokemonEvolutions(pokemonId),
  });
}
