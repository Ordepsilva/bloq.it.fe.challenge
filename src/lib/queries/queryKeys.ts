export const QUERY_KEYS = {
  pokemons: 'pokemons',
  pokemonsCount: 'pokemonsCount',
  pokemon: 'pokemon',
  pokemonEvolutions: 'pokemonEvolutions',
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
