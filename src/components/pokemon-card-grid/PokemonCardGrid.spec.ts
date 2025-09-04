import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonCardGrid from './PokemonCardGrid.vue';
import type { PokemonCaughtEntry } from '@/lib/models/pokemon';
import { createPinia, setActivePinia } from 'pinia';
const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@tanstack/vue-query', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    useQueryClient: () => ({
      setQueryData: vi.fn(),
    }),
  };
});
const samplePokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    imgUrl: '',
    shinyImgUrl: '',
    types: ['grass'],
    height: 7,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
    base_experience: 64,
    notes: [],
    timestamp: Date.now(),
  },
] as PokemonCaughtEntry[];

describe('PokemonCardGrid', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('renders PokemonCard for each pokemon', () => {
    const wrapper = mount(PokemonCardGrid, {
      props: { pokemons: samplePokemons, hasFiltersActive: false },
    });
    expect(wrapper.findAllComponents({ name: 'PokemonCard' }).length).toBe(1);
    expect(wrapper.text()).toContain('Bulbasaur');
  });

  it('shows filter message when no pokemons and filters active', () => {
    const wrapper = mount(PokemonCardGrid, {
      props: { pokemons: [], hasFiltersActive: true },
    });
    expect(wrapper.text()).toContain('No Pokémons match your filters.');
  });

  it('shows offline message when no pokemons and offline', async () => {
    // Mock useOnlineStatus composable to return false
    vi.resetModules();
    vi.doMock('@/composables/useOnlineStatus', () => ({
      useOnlineStatus: () => false,
    }));
    const { default: PokemonCardGrid } = await import('./PokemonCardGrid.vue');

    const wrapper = mount(PokemonCardGrid, {
      props: { pokemons: [], hasFiltersActive: false },
    });
    expect(wrapper.text()).toContain(
      'You are offline. Please go back online to get the latest Pokémons.',
    );
  });

  it('shows no pokemons found when no pokemons and no filters and online', () => {
    // Mock useOnlineStatus composable to return true
    vi.mock('@/composables/useOnlineStatus', () => ({
      useOnlineStatus: () => true,
    }));
    const wrapper = mount(PokemonCardGrid, {
      props: { pokemons: [], hasFiltersActive: false },
    });
    expect(wrapper.text()).toContain('No Pokémons Found.');
  });
});
