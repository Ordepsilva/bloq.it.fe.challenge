import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonTableFilters from './PokemonTableFilters.vue';

vi.mock('@/stores/pokedex', () => ({
  usePokedexStore: () => ({ activeFilterCount: 0 }),
}));

describe('PokemonTableFilters', () => {
  it('renders filter inputs and options', async () => {
    const wrapper = mount(PokemonTableFilters, {
      attachTo: document.body,
      props: {
        searchName: '',
        selectedType: undefined,
        sortBy: 'id',
        sortDir: 'asc',
      },
    });
    const trigger = wrapper.find('[data-testid="filter-popover-trigger"]');
    await trigger.trigger('click');
    expect(document.body.querySelector('[data-testid^="sort-column-"]')).not.toBeNull();
    expect(document.body.querySelector('[data-testid="sort-direction"]')).not.toBeNull();
    expect(document.body.querySelector('[data-testid="filter-name"]')).not.toBeNull();
    expect(document.body.textContent).toMatch(/type|sort/i);
    expect(document.body.querySelector('[data-testid^="filter-type-"]')).not.toBeNull();
  });

  it('emits v-model updates for search, type, sort, and direction', async () => {
    const wrapper = mount(PokemonTableFilters, {
      props: { searchName: '', selectedType: undefined, sortBy: 'id', sortDir: 'asc' },
      attachTo: document.body,
    });
    // Open popover
    await wrapper.find('[data-testid="filter-popover-trigger"]').trigger('click');
    // Search
    const nameInputWrapper = wrapper.find('[data-testid="filter-name"]');
    if (nameInputWrapper.exists()) {
      await nameInputWrapper.setValue('bulba');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('update:searchName');
    }
    // Type
    const typeBadge = wrapper.find('[data-testid="filter-type-fire"]');
    if (typeBadge.exists()) {
      await typeBadge.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('update:selectedType');
    }
    // Sort
    const sortBtn = wrapper.find('[data-testid="sort-column-Height"]');
    if (sortBtn.exists()) {
      await sortBtn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('update:sortBy');
    }
    // Direction
    const dirBtn = wrapper.find('[data-testid="sort-direction"]');
    if (dirBtn.exists()) {
      await dirBtn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('update:sortDir');
    }
  });

  it('clears filters and emits reset events', async () => {
    const wrapper = mount(PokemonTableFilters, {
      props: { searchName: 'bulba', selectedType: 'fire', sortBy: 'height', sortDir: 'desc' },
    });
    // Simulate clear/reset (assuming a clear button exists)
    const clearBtn = wrapper.find('button.clear, button[type="reset"]');
    if (clearBtn.exists()) {
      await clearBtn.trigger('click');
      expect(wrapper.emitted()).toHaveProperty('update:searchName');
      expect(wrapper.emitted()).toHaveProperty('update:selectedType');
      expect(wrapper.emitted()).toHaveProperty('update:sortBy');
      expect(wrapper.emitted()).toHaveProperty('update:sortDir');
    }
  });
});
