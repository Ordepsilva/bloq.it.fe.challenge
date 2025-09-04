import type { PokemonCaughtEntry } from '@/lib/models/pokemon';

export type SortingDirections = 'asc' | 'desc';
export type SortingColumns = keyof Pick<
  PokemonCaughtEntry,
  'id' | 'name' | 'height' | 'weight' | 'timestamp'
>;
export type ViewModes = 'cards' | 'table';

export const SORTING_COLUMNS: { key: SortingColumns; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
  { key: 'timestamp', label: 'Date Caught' },
];
