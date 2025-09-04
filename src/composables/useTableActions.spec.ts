import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTableActions } from './useTableActions';
import { downloadCsv } from '@/lib/utils';
const mockPokedexStore = {
  caughtPokemons: { 1: { id: 1 }, 2: { id: 2 } },
  deletePokemons: vi.fn(),
  currentPage: 1,
  totalPages: 1,
};

vi.mock('@/stores/pokedex', () => ({
  usePokedexStore: () => mockPokedexStore,
}));

vi.mock('@/lib/models/pokemon', () => ({
  exportPokemonsToCsv: vi.fn(() => 'csv-content'),
}));
vi.mock('@/lib/utils', () => ({
  downloadCsv: vi.fn(),
}));

describe('useTableActions', () => {
  let actions: ReturnType<typeof useTableActions>;
  beforeEach(() => {
    actions = useTableActions();
  });

  it('toggles selection', () => {
    actions.toggleSelect(1);
    expect(Array.from(actions.selectedIds.value)).toContain(1);
    actions.toggleSelect(1);
    expect(Array.from(actions.selectedIds.value)).not.toContain(1);
  });

  it('handles multi-select toggle', () => {
    actions.toggleSelect(1);
    actions.handleMultiSelectToggle(false);
    expect(actions.selectedIds.value.size).toBe(0);
    actions.handleMultiSelectToggle(true);
    expect(actions.selectionMode.value).toBe(true);
  });

  it('handles select all and deselect all', () => {
    actions.handleSelectAll([1, 2]);
    expect(Array.from(actions.selectedIds.value)).toEqual([1, 2]);
    actions.handleSelectAll([1, 2]);
    expect(Array.from(actions.selectedIds.value)).toEqual([]);
  });

  it('clears selection', () => {
    actions.toggleSelect(1);
    actions.clearSelection();
    expect(actions.selectedIds.value.size).toBe(0);
  });

  it('exports selected to CSV', () => {
    actions.toggleSelect(1);
    actions.exportSelectedToCSV();

    expect(downloadCsv).toHaveBeenCalledWith('csv-content', 'my_selected_pokedex.csv');
  });

  it('exports all pokedex to CSV', () => {
    actions.exportAllPokedexToCSV();
    expect(downloadCsv).toHaveBeenCalledWith('csv-content', 'my_pokedex.csv');
  });

  it('deletes selected pokemons', () => {
    actions.toggleSelect(1);
    actions.handleDeleteSelected();
    expect(mockPokedexStore.deletePokemons).toHaveBeenCalledWith([1]);
    expect(actions.selectedIds.value.size).toBe(0);
  });

  it('resets currentPage to 1 if currentPage > totalPages after delete', () => {
    mockPokedexStore.currentPage = 3;
    mockPokedexStore.totalPages = 1;
    actions.toggleSelect(1);
    actions.handleDeleteSelected();
    expect(actions.currentPage.value).toBe(1);
  });
});
