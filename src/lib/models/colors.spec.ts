// pokemon-colors.test.ts
import {
  POKEMON_TYPE_COLORS,
  POKEMON_TYPE_GRADIENTS,
  POKEMON_CARD_COLORS,
  POKEMON_CARD_HOVER_COLORS,
  getPokemonTypeColor,
  getPokemonTypeGradient,
  getPokemonCardColor,
  getPokemonCardHoverColor,
} from '@/lib/models/colors';
import type { PokemonType } from '@/lib/models/pokemon';
import { describe, expect, it } from 'vitest';

describe('Pokemon colors mapping', () => {
  const allTypes: PokemonType[] = [
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
  ];

  it('should have a mapping for every type', () => {
    allTypes.forEach((t) => {
      expect(POKEMON_TYPE_COLORS).toHaveProperty(t);
      expect(POKEMON_TYPE_GRADIENTS).toHaveProperty(t);
      expect(POKEMON_CARD_COLORS).toHaveProperty(t);
      expect(POKEMON_CARD_HOVER_COLORS).toHaveProperty(t);
    });
  });
});

describe('Pokemon color utilities', () => {
  it('should return correct color class for known type', () => {
    expect(getPokemonTypeColor('fire')).toBe(POKEMON_TYPE_COLORS.fire);
    expect(getPokemonCardColor('water')).toBe(POKEMON_CARD_COLORS.water);
  });

  it('should be case-insensitive', () => {
    expect(getPokemonTypeColor('Fire')).toBe(POKEMON_TYPE_COLORS.fire);
    expect(getPokemonCardHoverColor('WATER')).toBe(POKEMON_CARD_HOVER_COLORS.water);
  });

  it('should fallback to normal for unknown type', () => {
    expect(getPokemonTypeColor('???')).toBe(POKEMON_TYPE_COLORS.normal);
    expect(getPokemonTypeGradient('invalid')).toBe(POKEMON_TYPE_GRADIENTS.normal);
  });
});
