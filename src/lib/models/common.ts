import type { PokemonCaughtEntry } from '@/lib/models/pokemon';

export type SortingDirections = 'asc' | 'desc';
export type SortingColumns = keyof Pick<
  PokemonCaughtEntry,
  'id' | 'name' | 'height' | 'weight' | 'timestamp'
>;
export type ViewModes = 'cards' | 'table';
