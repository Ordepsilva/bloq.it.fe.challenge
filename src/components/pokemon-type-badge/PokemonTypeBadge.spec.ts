import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PokemonTypeBadge from '@/components/pokemon-type-badge/PokemonTypeBadge.vue';
import { getPokemonTypeColor } from '@/lib/models/colors';

describe('PokemonTypeBadge', () => {
  it('renders the type text', () => {
    const wrapper = mount(PokemonTypeBadge, {
      props: { type: 'fire' },
    });

    expect(wrapper.text()).toContain('fire');
  });

  it('applies the correct color class', () => {
    const type = 'water';
    const wrapper = mount(PokemonTypeBadge, {
      props: { type },
    });

    const expectedClass = getPokemonTypeColor(type);
    expect(wrapper.classes()).toContain(expectedClass);
  });

  it('capitalizes the type text', () => {
    const wrapper = mount(PokemonTypeBadge, {
      props: { type: 'grass' },
    });

    expect(wrapper.text()).toBe('grass');
    expect(wrapper.classes()).toContain('capitalize');
  });
});
