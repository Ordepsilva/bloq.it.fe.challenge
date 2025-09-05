import { type Pokemon as APIPokemon, type PokemonType as APIPokemonType } from 'pokeapi-js-wrapper';
import { formatDate } from '../utils';
import type { SortingColumns, SortingDirections } from './common';

export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string | null;
  shinyImgUrl: string | null;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStats;
  base_experience: number;
  cries: PokemonCries;
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
  imgUrl: string | null;
};

export type PokemonFilters = {
  searchName: string;
  selectedType?: PokemonType;
  sortBy: SortingColumns;
  sortDir: SortingDirections;
};

export type PokemonCries = {
  latest: string;
  legacy: string;
};

export type PokemonCaughtEntry = Pokemon & { notes: string[]; timestamp: number };

export function isPokemonCaughtEntry(
  pokemon: Pokemon | PokemonCaughtEntry,
): pokemon is PokemonCaughtEntry {
  return (
    (pokemon as PokemonCaughtEntry).timestamp !== undefined &&
    (pokemon as PokemonCaughtEntry).notes !== undefined
  );
}

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

export function isCries(value: unknown): value is PokemonCries {
  const cries = value as PokemonCries;
  return typeof cries.latest === 'string' && typeof cries.legacy === 'string';
}

export function mapPokemon(apiPokemon: APIPokemon): Pokemon {
  const {
    id,
    name,
    height,
    weight,
    sprites,
    types,
    stats,
    base_experience,
    cries: apiCries,
  } = apiPokemon;

  const cries = isCries(apiCries) ? apiCries : { latest: '', legacy: '' };

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

  const heightInMeters = height * 0.1;
  const weightInKilograms = weight * 0.1;

  return {
    id,
    name,
    height: parseFloat(heightInMeters.toFixed(2)),
    weight: parseFloat(weightInKilograms.toFixed(2)),
    base_experience: base_experience ?? 0,
    cries,
    imgUrl: sprites.other['official-artwork'].front_default ?? null,
    shinyImgUrl: sprites.other['official-artwork'].front_shiny ?? null,
    types: types.map((t: APIPokemonType) => (isPokemonType(t.type.name) ? t.type.name : 'unknown')),
    stats: mappedStats,
  };
}

export function exportPokemonsToCsv(data: PokemonCaughtEntry[]): string {
  const headers = ['ID', 'Name', 'Types', 'Height', 'Weight', 'Date caught', 'Notes'];

  const rows = data.map((p) => [
    p.id,
    p.name,
    p.types.join(', '),
    p.height,
    p.weight,
    formatDate(p.timestamp),
    p.notes.join(' | '),
  ]);

  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}
