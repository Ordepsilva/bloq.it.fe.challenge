import { describe, it, expect } from 'vitest';
import {
  isPokemonType,
  mapPokemon,
  exportPokemonsToCsv,
  POKEMON_TYPES,
  type PokemonCaughtEntry,
} from './pokemon';
import type { Pokemon } from 'pokeapi-js-wrapper';

const mockApiPokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: 'img-url',
    other: { 'official-artwork': { front_default: 'img-url' } },
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  stats: [
    { stat: { name: 'hp' }, base_stat: 45 },
    { stat: { name: 'attack' }, base_stat: 49 },
    { stat: { name: 'defense' }, base_stat: 49 },
    { stat: { name: 'special-attack' }, base_stat: 65 },
    { stat: { name: 'special-defense' }, base_stat: 65 },
    { stat: { name: 'speed' }, base_stat: 45 },
  ],
} as Pokemon;

describe('isPokemonType', () => {
  it('returns true for valid types', () => {
    for (const type of POKEMON_TYPES) {
      expect(isPokemonType(type)).toBe(true);
    }
  });
  it('returns false for invalid types', () => {
    expect(isPokemonType('notatype')).toBe(false);
  });
});

describe('mapPokemon', () => {
  it('maps API pokemon to internal Pokemon type', () => {
    const result = mapPokemon(mockApiPokemon as Pokemon);
    expect(result).toMatchObject({
      id: 1,
      name: 'bulbasaur',
      imgUrl: 'img-url',
      types: ['grass', 'poison'],
      height: 0.7,
      weight: 6.9,
      base_experience: 64,
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45,
      },
    });
  });
});

describe('exportPokemonsToCsv', () => {
  it('exports caught pokemons to CSV', () => {
    const entry: PokemonCaughtEntry = {
      id: 1,
      name: 'bulbasaur',
      imgUrl: 'img-url',
      types: ['grass', 'poison'],
      height: 7,
      weight: 69,
      base_experience: 64,
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45,
      },
      notes: ['First catch', 'Starter'],
      timestamp: 1693382400000, // Example timestamp
    };
    const csv = exportPokemonsToCsv([entry]);
    expect(csv).toContain('bulbasaur');
    expect(csv).toContain('First catch | Starter');
    expect(csv.split('\n').length).toBe(2); // header + 1 row
  });
});
