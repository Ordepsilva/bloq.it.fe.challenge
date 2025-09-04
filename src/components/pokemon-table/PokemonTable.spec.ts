import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Pokemon } from '@/lib/models/pokemon';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';
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
const samplePokemons: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imgUrl: 'https://img.pokemons/1.png',
    shinyImgUrl: 'https://img.pokemons/1-shiny.png',
    types: ['grass', 'poison'],
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
  },
  {
    id: 4,
    name: 'charmander',
    imgUrl: 'https://img.pokemons/4.png',
    shinyImgUrl: 'https://img.pokemons/4-shiny.png',
    types: ['fire'],
    height: 6,
    weight: 85,
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65,
    },
    base_experience: 64,
  },
];

describe('PokemonTable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    mockPush.mockClear();
  });
  it('renders "No Pokemons Found" if list is empty', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: [], hasFiltersActive: false },
    });

    expect(wrapper.text()).toContain('No Pokemons Found.');
  });

  it('renders "No Pokemons match your filters." if list is empty', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: [], hasFiltersActive: true },
    });

    expect(wrapper.text()).toContain('No Pokemons match your filters.');
  });

  it('renders rows for each pokemon', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: samplePokemons, hasFiltersActive: false },
    });

    // two pokemon rows
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    // check names appear
    expect(wrapper.text()).toContain('bulbasaur');
    expect(wrapper.text()).toContain('charmander');
  });

  it('shows offline message when no pokemons and offline', async () => {
    // Mock useOnlineStatus composable to return false
    vi.resetModules();
    vi.doMock('@/composables/useOnlineStatus', () => ({
      useOnlineStatus: () => false,
    }));
    const { default: PokemonTable } = await import('./PokemonTable.vue');

    const wrapper = mount(PokemonTable, {
      props: { pokemons: [], hasFiltersActive: false },
    });
    expect(wrapper.find('[data-testid="offline-row"]').text()).toContain(
      'You are offline. Please go back online to get the latest Pokemons.',
    );
  });

  it('shows placeholder image when imgUrl is missing', () => {
    const pokemon = {
      id: 4,
      name: 'charmander',
      imgUrl: null,
      types: ['fire'],
      height: 6,
      weight: 85,
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        specialAttack: 60,
        specialDefense: 50,
        speed: 65,
      },
      base_experience: 64,
      // ...other required fields
    } as Pokemon;
    const wrapper = mount(PokemonTable, {
      props: { pokemons: [pokemon], hasFiltersActive: false },
    });
    const img = wrapper.find('[data-testid=\"pokemon-image\"]');
    expect(img.attributes('src')).toBe('/placeholder.png');
  });

  it('navigates when row is clicked', async () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: samplePokemons, hasFiltersActive: false },
    });

    const firstRow = wrapper.find('tbody tr');
    await firstRow.trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/pokemon/1');
  });

  it('renders type badges', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: [samplePokemons[0]], hasFiltersActive: false },
    });

    // check that type badges appear
    expect(wrapper.text()).toContain('grass');
    expect(wrapper.text()).toContain('poison');
  });
});
