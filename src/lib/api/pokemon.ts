import { mapPokemon, type Pokemon, type PokemonEvolution } from '@/lib/models/pokemon';
import { Pokedex, type Chain } from 'pokeapi-js-wrapper';
import { PER_PAGE } from '../constants';

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

export async function getPokemonByNameOrId(pokemonIDOrName: number | string): Promise<Pokemon> {
  const response = await p.getPokemonByName(pokemonIDOrName);
  return mapPokemon(response);
}

function extractEvolutionNames(chain: Chain): string[] {
  const evolutionNames = [chain.species.name];
  for (const evo of chain.evolves_to) {
    evolutionNames.push(...extractEvolutionNames(evo));
  }
  return evolutionNames;
}

export async function getPokemonEvolutions(pokemonId: number): Promise<PokemonEvolution[]> {
  const response = await p.getEvolutionChainById(pokemonId);

  const evolutionNames = extractEvolutionNames(response.chain);

  const evolutions: PokemonEvolution[] = await Promise.all(
    evolutionNames.map(async (name) => {
      const currentEvoPoke = await getPokemonByNameOrId(name);
      return {
        id: currentEvoPoke.id,
        name: currentEvoPoke.name,
        imgUrl: currentEvoPoke.imgUrl,
      };
    }),
  );

  return evolutions;
}
