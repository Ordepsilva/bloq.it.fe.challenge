import { usePokedexStore } from '@/stores/pokedex';
import type { Pokemon } from '@/lib/models/pokemon';

export function usePokemonCaught() {
  const pokedexStore = usePokedexStore();

  function isCaught(pokemon: Pokemon) {
    return pokedexStore.caughtPokemons[Number(pokemon.id)] !== undefined;
  }

  function toggleCaught(pokemon: Pokemon) {
    if (pokemon) pokedexStore.toggleCaught(pokemon);
  }

  return {
    isCaught,
    toggleCaught,
  };
}
