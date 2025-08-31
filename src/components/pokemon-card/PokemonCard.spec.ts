import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonCard from './PokemonCard.vue';
import { getPokemonCardColor } from '@/lib/models/colors';
import { createPinia } from 'pinia';

describe('PokemonCard', () => {
  it('renders all key info, PokeballButton, and type-based background', () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: {
          id: 1,
          name: 'Bulbasaur',
          imgUrl: 'img-url',
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
        },
      },
      global: {
        plugins: [createPinia()],
      },
    });
    // Name and image
    expect(wrapper.text()).toContain('Bulbasaur');
    expect(wrapper.find('[data-testid="pokemon-image"]').attributes('src')).toBe('img-url');
    // Types
    expect(wrapper.text()).toContain('grass');
    // PokeballButton
    expect(wrapper.findComponent({ name: 'PokeballButton' }).exists()).toBe(true);
    // Type-based background
    const cardClasses = wrapper.classes().join(' ');
    expect(cardClasses).toMatch(getPokemonCardColor('grass'));
  });
});
