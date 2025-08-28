import { useQuery } from '@tanstack/vue-query';
import { PER_PAGE } from '@/lib/constants';
import { getPokemons, getPokemonsCount } from '@/lib/api/pokemon';
import type { Ref } from 'vue';

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
