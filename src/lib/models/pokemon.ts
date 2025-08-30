import { type Pokemon as APIPokemon, type PokemonType as APIPokemonType } from 'pokeapi-js-wrapper';

export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStats;
  base_experience: number;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonAbilities = {
  name: string;
  effect: string;
}[];

export type PokemonEvolution = {
  id: number;
  name: string;
  imgUrl: string;
};

export type PokemonCaughtEntry = Pokemon & { notes: string[]; timestamp: number };

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

const STAT_NAME_MAP: Record<string, keyof PokemonStats> = {
  hp: 'hp',
  attack: 'attack',
  defense: 'defense',
  'special-attack': 'specialAttack',
  'special-defense': 'specialDefense',
  speed: 'speed',
};

export function mapPokemon(apiPokemon: APIPokemon): Pokemon {
  const { id, name, height, weight, sprites, types, stats, base_experience } = apiPokemon;

  const mappedStats: PokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

  for (const statElement of stats) {
    const mappedKey = STAT_NAME_MAP[statElement.stat.name];
    if (mappedKey) {
      mappedStats[mappedKey] = statElement.base_stat;
    }
  }

  return {
    id,
    name,
    height,
    weight,
    base_experience: base_experience ?? 0,
    imgUrl: sprites.other['official-artwork'].front_default ?? '',
    types: types.map((t: APIPokemonType) => (isPokemonType(t.type.name) ? t.type.name : 'unknown')),
    stats: mappedStats,
  };
}
