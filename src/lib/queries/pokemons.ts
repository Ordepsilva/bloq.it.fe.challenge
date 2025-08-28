import { useQuery } from '@tanstack/vue-query';
import { PER_PAGE } from '@/lib/constants';
import { getPokemons, getPokemonsCount } from '@/services/pokemon';

export function useGetPokemons(currentPage: number) {
  return useQuery({
    queryKey: ['pokemons', currentPage],
    queryFn: () => getPokemons(PER_PAGE, (currentPage - 1) * PER_PAGE),
  });
}

export function useGetPokemonsCount() {
  return useQuery({
    queryKey: ['pokemonsCount'],
    queryFn: () => getPokemonsCount(),
  });
}
