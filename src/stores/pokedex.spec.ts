import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokedexStore } from './pokedex';
import type { Pokemon, PokemonCaughtEntry } from '@/lib/models/pokemon';

vi.mock('@tanstack/vue-query', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    useQueryClient: () => ({
      setQueryData: vi.fn(),
    }),
  };
});

const mockPokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    imgUrl: '',
    shinyImgUrl: '',
    cries: { latest: '', legacy: '' },
    types: ['grass', 'poison'],
    height: 7,
    weight: 69,
    stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
    base_experience: 64,
    notes: [],
    timestamp: Date.now(),
  },
  {
    id: 2,
    name: 'Ivysaur',
    imgUrl: '',
    shinyImgUrl: '',
    cries: { latest: '', legacy: '' },
    types: ['grass', 'poison'],
    height: 10,
    weight: 130,
    stats: { hp: 60, attack: 62, defense: 63, specialAttack: 80, specialDefense: 80, speed: 60 },
    base_experience: 142,
    notes: [],
    timestamp: Date.now(),
  },
  {
    id: 3,
    name: 'Charmander',
    imgUrl: '',
    shinyImgUrl: '',
    cries: { latest: '', legacy: '' },
    types: ['fire'],
    height: 6,
    weight: 85,
    stats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
    base_experience: 62,
    notes: [],
    timestamp: Date.now(),
  },
] as PokemonCaughtEntry[];

describe('usePokedexStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('counts active filters correctly', () => {
    const store = usePokedexStore();
    expect(store.activeFilterCount).toBe(0);
    store.searchName = 'bulba';
    expect(store.activeFilterCount).toBe(1);
    store.selectedType = 'grass';
    expect(store.activeFilterCount).toBe(2);
    store.sortBy = 'height';
    expect(store.activeFilterCount).toBe(3);
    store.sortDir = 'desc';
    expect(store.activeFilterCount).toBe(4);
  });

  it('resets filters to show all pokemons', () => {
    const store = usePokedexStore();
    store.caughtPokemons = Object.fromEntries(mockPokemons.map((p) => [p.id, { ...p }]));

    store.searchName = 'bulba';
    expect(store.filteredPokemons.length).toBe(1);
    store.searchName = '';
    store.selectedType = undefined;
    expect(store.filteredPokemons.length).toBe(3);
  });

  it('calculates totalPages correctly', () => {
    const store = usePokedexStore();
    store.itemsPerPage = 1;
    store.caughtPokemons = Object.fromEntries(mockPokemons.map((p) => [p.id, { ...p }]));

    expect(store.totalPages).toBe(3);
    store.itemsPerPage = 2;
    expect(store.totalPages).toBe(2);
  });

  it('handles notes for non-existent pokemon gracefully', () => {
    const store = usePokedexStore();
    expect(() => store.addNote(999, 'Ghost note')).not.toThrow();
    expect(() => store.removeNote(999, 0)).not.toThrow();
    expect(store.getNotes(999)).toEqual([]);
  });

  it('adds and removes notes', () => {
    const store = usePokedexStore();
    store.caughtPokemons = mockPokemons;
    store.addNote(1, 'Test note');
    expect(store.caughtPokemons[1].notes).toContain('Test note');
    expect(store.getNotes(1)).toEqual(['Test note']);
    store.removeNote(1, 0);
    expect(store.caughtPokemons[1].notes).not.toContain('Test note');
  });

  it('it should delete a list of pokemons', () => {
    const store = usePokedexStore();
    store.caughtPokemons = Object.fromEntries(mockPokemons.map((p) => [p.id, { ...p }]));

    store.deletePokemons([1, 2]);
    expect(store.caughtPokemons[1]).toBeUndefined();
    expect(store.caughtPokemons[2]).toBeUndefined();
  });

  it('catch and release a Pokemon', () => {
    const store = usePokedexStore();
    const mockPokemon = {
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
    } as Pokemon;
    store.toggleCaught(mockPokemon);
    expect(store.caughtPokemons[1]).toBeDefined();
    expect(store.caughtPokemons[1].name).toBe('bulbasaur');
    store.toggleCaught(mockPokemon);
    expect(store.caughtPokemons[1]).toBeUndefined();
  });

  it('sets and gets page', () => {
    const store = usePokedexStore();
    store.setPage(2);
    expect(store.currentPage).toBe(2);
  });

  it('filters pokemons by name and type', () => {
    const store = usePokedexStore();
    store.caughtPokemons = Object.fromEntries(mockPokemons.map((p) => [p.id, { ...p }]));
    store.searchName = 'ivy';
    expect(store.filteredPokemons.length).toBe(1);
    expect(store.filteredPokemons[0].name).toBe('Ivysaur');

    store.searchName = '';
    store.selectedType = 'fire';
    expect(store.filteredPokemons.length).toBe(1);
    expect(store.filteredPokemons[0].name).toBe('Charmander');
  });

  it('sorts pokemons by height desc', () => {
    const store = usePokedexStore();
    store.caughtPokemons = Object.fromEntries(mockPokemons.map((p) => [p.id, { ...p }]));

    store.sortBy = 'height';
    store.sortDir = 'desc';
    expect(store.filteredPokemons[0].name).toBe('Ivysaur');
    expect(store.filteredPokemons[2].name).toBe('Charmander');
  });

  it('paginates pokemons', () => {
    const store = usePokedexStore();
    store.itemsPerPage = 2;
    store.caughtPokemons = Object.fromEntries(mockPokemons.map((p) => [p.id, { ...p }]));

    store.currentPage = 1;
    expect(store.paginatedPokemons.length).toBe(2);
    expect(store.paginatedPokemons[0].name).toBe('Bulbasaur');
    expect(store.paginatedPokemons[1].name).toBe('Ivysaur');

    store.currentPage = 2;
    expect(store.paginatedPokemons.length).toBe(1);
    expect(store.paginatedPokemons[0].name).toBe('Charmander');
  });
});
