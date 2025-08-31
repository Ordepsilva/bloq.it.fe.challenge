import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonPagination from './PokemonPagination.vue';

describe('PokemonPagination', () => {
  it('renders pagination controls', () => {
    const wrapper = mount(PokemonPagination, { props: { page: 1, perPage: 10, total: 30 } });
    expect(wrapper.text()).toMatch(/next|prev|›|‹/i);
  });

  it('emits update:page when next is clicked', async () => {
    const wrapper = mount(PokemonPagination, { props: { page: 1, perPage: 10, total: 30 } });
    await wrapper.find('[data-test="pagination-next"]').trigger('click');
    expect(wrapper.emitted('update:page')).toBeTruthy();
  });
});
