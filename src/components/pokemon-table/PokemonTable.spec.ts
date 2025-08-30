import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Pokemon } from '@/lib/models/pokemon';
import PokemonTable from '@/components/pokemon-table/PokemonTable.vue';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));
const samplePokemons: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imgUrl: 'https://img.pokemons/1.png',
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
    mockPush.mockClear();
  });
  it('renders "No Pokemons Found" if list is empty', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: [] },
    });

    expect(wrapper.text()).toContain('No Pokemons Found.');
  });

  it('renders rows for each pokemon', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: samplePokemons },
    });

    // two pokemon rows
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    // check names appear
    expect(wrapper.text()).toContain('bulbasaur');
    expect(wrapper.text()).toContain('charmander');
  });

  it('navigates when row is clicked', async () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: samplePokemons },
    });

    const firstRow = wrapper.find('tbody tr');
    await firstRow.trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/pokemon/bulbasaur');
  });

  it('renders type badges', () => {
    const wrapper = mount(PokemonTable, {
      props: { pokemons: [samplePokemons[0]] },
    });

    // check that type badges appear
    expect(wrapper.text()).toContain('grass');
    expect(wrapper.text()).toContain('poison');
  });
});
