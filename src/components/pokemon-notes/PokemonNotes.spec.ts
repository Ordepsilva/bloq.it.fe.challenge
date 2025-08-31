import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonNotes from './PokemonNotes.vue';

describe('PokemonNotes', () => {
  it('renders notes', () => {
    const notes = ['First catch', 'Rare'];
    const wrapper = mount(PokemonNotes, { props: { notes } });
    notes.forEach((note) => {
      expect(wrapper.text()).toContain(note);
    });
  });

  it('emits addNote and removeNote', async () => {
    const wrapper = mount(PokemonNotes, { props: { notes: [] } });
    await wrapper.vm.$emit('addNote', 'New note');
    await wrapper.vm.$emit('removeNote', 0);
    expect(wrapper.emitted('addNote')).toBeTruthy();
    expect(wrapper.emitted('removeNote')).toBeTruthy();
  });
});
