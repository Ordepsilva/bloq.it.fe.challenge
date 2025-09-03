import { exportPokemonsToCsv } from '@/lib/models/pokemon';
import { downloadCsv } from '@/lib/utils';
import { usePokedexStore } from '@/stores/pokedex';
import { ref } from 'vue';

export function useTableActions() {
  const selectedIds = ref(new Set<number>());
  const selectionMode = ref(false);
  const store = usePokedexStore();
  const currentPage = ref(1);

  function toggleSelect(id: number) {
    const set = new Set(selectedIds.value);
    console.log(id);
    if (!set.has(id)) {
      set.add(id);
    } else {
      set.delete(id);
    }
    selectedIds.value = set;
  }

  function handleMultiSelectToggle(value: boolean) {
    selectionMode.value = value;
    if (!value) {
      selectedIds.value = new Set();
    }
  }

  function handleSelectAll(ids: number[]) {
    const set = new Set(selectedIds.value);
    const allSelected = ids.every((id) => set.has(id));
    if (allSelected) {
      ids.forEach((id) => set.delete(id));
    } else {
      ids.forEach((id) => set.add(id));
    }
    selectedIds.value = set;
  }

  function handleDeleteSelected() {
    const idsToDelete = Array.from(selectedIds.value);
    store.deletePokemons(idsToDelete);
    const updatedSet = new Set(selectedIds.value);
    idsToDelete.forEach((id) => updatedSet.delete(id));
    selectedIds.value = updatedSet;

    if (store.currentPage > store.totalPages) {
      currentPage.value = 1;
    }
  }

  function exportSelectedToCSV() {
    const caughtPokemons = Object.values(store.caughtPokemons);
    const ids = Array.from(selectedIds.value);

    const selectedPokemons = ids
      .map((id) => caughtPokemons.find((pokemon) => pokemon.id === id))
      .filter((p) => p !== undefined);

    const csv = exportPokemonsToCsv(selectedPokemons);
    downloadCsv(csv, 'my_selected_pokedex.csv');
  }

  function exportAllPokedexToCSV() {
    const caughtPokemons = Object.values(store.caughtPokemons);
    const csv = exportPokemonsToCsv(caughtPokemons);
    downloadCsv(csv, 'my_pokedex.csv');
  }

  function clearSelection() {
    selectedIds.value = new Set();
  }

  return {
    currentPage,
    selectedIds,
    selectionMode,
    toggleSelect,
    handleMultiSelectToggle,
    handleSelectAll,
    handleDeleteSelected,
    exportSelectedToCSV,
    exportAllPokedexToCSV,
    clearSelection,
  };
}
