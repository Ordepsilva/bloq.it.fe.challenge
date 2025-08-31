import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokeballButton from './PokeballButton.vue';

describe('PokeballButton', () => {
  it('renders as not caught by default', () => {
    const wrapper = mount(PokeballButton, { props: { caught: false } });
    expect(wrapper.find('img').classes()).toContain('grayscale');
  });

  it('renders as caught when prop is true', () => {
    const wrapper = mount(PokeballButton, { props: { caught: true } });
    expect(wrapper.find('img').classes()).toContain('scale-110');
  });

  it('emits click event', async () => {
    const wrapper = mount(PokeballButton, { props: { caught: false } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
