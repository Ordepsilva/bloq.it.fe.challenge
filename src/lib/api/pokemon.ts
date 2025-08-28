import { PER_PAGE } from '@/lib/models/common';
import { mapPokemon, type Pokemon } from '@/lib/models/pokemon';
import { Pokedex } from 'pokeapi-js-wrapper';

const p = new Pokedex({ cache: true, cacheImages: true });

export async function getPokemons(limit = PER_PAGE, offset = 0): Promise<Pokemon[]> {
  const response = await p.getPokemonsList({ limit, offset });

  const detailedPokemons: Pokemon[] = await Promise.all(
    response.results.map(async (pokemon): Promise<Pokemon> => {
      const data = await p.getPokemonByName(pokemon.name);
      return mapPokemon(data);
    }),
  );
  return detailedPokemons;
}

export async function getPokemonsCount(): Promise<number> {
  const response = await p.getPokemonsList({ limit: 1, offset: 0 });
  return response.count;
}
