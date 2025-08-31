import { describe, it, expect, vi } from 'vitest';
import { usePokemonCaught } from './usePokemonCaught';
import type { Pokemon } from '@/lib/models/pokemon';

vi.mock('@/stores/pokedex', () => ({
  usePokedexStore: () => ({
    caughtPokemons: { 1: true },
    toggleCaught: vi.fn(),
  }),
}));

describe('usePokemonCaught', () => {
  const mockPokemon = { id: 1 } as Pokemon;
  it('isCaught returns true for caught pokemon', () => {
    const { isCaught } = usePokemonCaught();
    expect(isCaught(mockPokemon)).toBe(true);
  });

  it('toggleCaught calls store.toggleCaught', () => {
    const { toggleCaught } = usePokemonCaught();
    const pokemon = { id: 2 } as Pokemon;
    toggleCaught(pokemon);
  });
});
