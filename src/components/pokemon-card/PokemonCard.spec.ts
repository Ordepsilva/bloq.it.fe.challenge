import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonCard from './PokemonCard.vue';
import { getPokemonCardColor, type Pokemon, type PokemonCaughtEntry } from '@/lib/models';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@tanstack/vue-query', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    useQueryClient: () => ({
      setQueryData: vi.fn(),
    }),
  };
});

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const basePokemon = {
  id: 1,
  name: 'Bulbasaur',
  imgUrl: 'img-url',
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
  stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
  base_experience: 64,
} as Pokemon;

const caughtEntry = {
  ...basePokemon,
  notes: ['note1', 'note2'],
  timestamp: Date.now(),
} as PokemonCaughtEntry;

describe('PokemonCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('renders with plain Pokemon', () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: basePokemon,
      },
    });
    expect(wrapper.text()).toContain('Bulbasaur');
    expect(wrapper.findComponent({ name: 'PokemonNotesPreview' }).exists()).toBe(false);
    expect(wrapper.find('[data-testid="pokemon-image"]').attributes('src')).toBe('img-url');
    expect(wrapper.text()).toContain('grass');
    expect(wrapper.findComponent({ name: 'PokeballButton' }).exists()).toBe(true);

    const cardClasses = wrapper.classes().join(' ');
    expect(cardClasses).toMatch(getPokemonCardColor('grass'));
  });

  it('renders notes preview for caught entry', () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: caughtEntry,
      },
    });
    expect(wrapper.findComponent({ name: 'PokemonNotesPreview' }).exists()).toBe(true);
  });

  it('emits update:multiSelectActive and update:selectionChange on long press', async () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: basePokemon },
    });
    await wrapper.trigger('touchstart');
    await new Promise((r) => setTimeout(r, 600));
    expect(wrapper.emitted('update:multiSelectActive')).toBeTruthy();
    expect(wrapper.emitted('update:selectionChange')).toBeTruthy();
  });

  it('cancel long press', async () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: basePokemon },
    });
    await wrapper.trigger('touchstart');
    await new Promise((r) => setTimeout(r, 300));
    await wrapper.trigger('touchend');
    expect(wrapper.emitted('update:multiSelectActive')).toBeFalsy();
    expect(wrapper.emitted('update:selectionChange')).toBeFalsy();
  });

  it('emits update:selectionChange on click when multiSelectActive', async () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: basePokemon,
        multiSelectActive: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:selectionChange')).toBeTruthy();
  });

  it('navigates to details on click when not multiSelectActive', async () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: basePokemon,
        multiSelectActive: false,
      },
    });
    await wrapper.trigger('click');
    expect(mockPush).toHaveBeenCalledWith('/pokemon/1');
  });
});
