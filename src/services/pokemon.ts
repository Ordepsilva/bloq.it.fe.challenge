import { mapPokemon } from '@/models/pokemon';
import { Pokedex } from 'pokeapi-js-wrapper';

const p = new Pokedex({ cache: true, cacheImages: true });

export async function fetchPokemons(limit = 20, offset = 0) {
  const response = await p.getPokemonsList({ limit, offset });

  const detailedPokemons = await Promise.all(
    response.results.map(async (pokemon) => {
      mapPokemon(await p.getPokemonByName(pokemon.name));
    }),
  );
  return detailedPokemons;
}

export async function getPokemonsCount() {
  const response = await p.getPokemonsList({ limit: 1, offset: 0 });
  return response.count;
}
