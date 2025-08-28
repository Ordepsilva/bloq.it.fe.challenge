import { type Pokemon as APIPokemon, type PokemonType as APIPokemonType } from 'pokeapi-js-wrapper';

export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStats;
  captured?: boolean;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export const POKEMON_TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'unknown',
  'shadow',
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export function isPokemonType(value: string): value is PokemonType {
  return POKEMON_TYPES.includes(value as PokemonType);
}

export function mapPokemon(apiPokemon: APIPokemon): Pokemon {
  const statMap: Record<string, number> = {};
  for (const statElement of apiPokemon.stats) {
    statMap[statElement.stat.name] = statElement.base_stat;
  }
  //use pokemonStats to be type safer

  //destructure
  return {
    id: apiPokemon.id,
    name: apiPokemon.name,
    height: apiPokemon.height,
    weight: apiPokemon.weight,
    imgUrl: apiPokemon.sprites.other['official-artwork'].front_default ?? '',
    types: apiPokemon.types.map((t: APIPokemonType) =>
      isPokemonType(t.type.name) ? t.type.name : 'unknown',
    ),
    stats: {
      hp: statMap['hp'] ?? 0,
      attack: statMap['attack'] ?? 0,
      defense: statMap['defense'] ?? 0,
      specialAttack: statMap['special-attack'] ?? 0,
      specialDefense: statMap['special-defense'] ?? 0,
      speed: statMap['speed'] ?? 0,
    },
  };
}
