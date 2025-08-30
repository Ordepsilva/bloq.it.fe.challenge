import { useQuery } from '@tanstack/vue-query';
import { PER_PAGE } from '@/lib/constants';
import { getPokemonByNameOrId, getPokemons, getPokemonsCount } from '@/lib/api/pokemon';
import type { Ref } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
import type { Pokemon, PokemonCaughtEntry } from '../models/pokemon';

export function useGetPokemons(currentPage: Ref<number>) {
  return useQuery({
    queryKey: ['pokemons', currentPage],
    queryFn: () => getPokemons(PER_PAGE, (currentPage.value - 1) * PER_PAGE),
  });
}

export function useGetPokemonsCount() {
  return useQuery({
    queryKey: ['pokemonsCount'],
    queryFn: () => getPokemonsCount(),
  });
}

export function useGetPokemon(idOrName: number | string) {
  const store = usePokedexStore();

  return useQuery<Pokemon | PokemonCaughtEntry>({
    queryKey: ['pokemon', idOrName],
    queryFn: async () => {
      const numericId = Number(idOrName);
      if (!isNaN(numericId) && store.caughtPokemons.has(numericId)) {
        return store.caughtPokemons.get(numericId)!;
      }

      return await getPokemonByNameOrId(idOrName);
    },
  });
}
