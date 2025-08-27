export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-600',
  fighting: 'bg-red-700',
  flying: 'bg-blue-700',
  poison: 'bg-fuchsia-700',
  ground: 'bg-yellow-700',
  rock: 'bg-stone-600',
  bug: 'bg-lime-700',
  ghost: 'bg-violet-700',
  steel: 'bg-slate-600',
  fire: 'bg-orange-700',
  water: 'bg-sky-700',
  grass: 'bg-green-700',
  electric: 'bg-amber-700',
  psychic: 'bg-purple-700',
  ice: 'bg-cyan-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-700',
  unknown: 'bg-zinc-600',
  shadow: 'bg-gray-600',
};

export const POKEMON_CARD_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-500',
  fighting: 'bg-red-600',
  flying: 'bg-blue-600',
  poison: 'bg-fuchsia-600',
  ground: 'bg-yellow-600',
  rock: 'bg-stone-500',
  bug: 'bg-lime-600',
  ghost: 'bg-violet-600',
  steel: 'bg-slate-600',
  fire: 'bg-orange-600',
  water: 'bg-sky-600',
  grass: 'bg-green-600',
  electric: 'bg-amber-600',
  psychic: 'bg-purple-600',
  ice: 'bg-cyan-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-600',
  fairy: 'bg-pink-600',
  unknown: 'bg-zinc-500',
  shadow: 'bg-gray-500',
};

export const POKEMON_CARD_HOVER_COLORS: Record<PokemonType, string> = {
  normal: 'hover:bg-neutral-500/80',
  fighting: 'hover:bg-red-600/80',
  flying: 'hover:bg-blue-600/80',
  poison: 'hover:bg-fuchsia-600/80',
  ground: 'hover:bg-yellow-600/80',
  rock: 'hover:bg-stone-500/80',
  bug: 'hover:bg-lime-600/80',
  ghost: 'hover:bg-violet-600/80',
  steel: 'hover:bg-slate-600/80',
  fire: 'hover:bg-orange-600/80',
  water: 'hover:bg-sky-600/80',
  grass: 'hover:bg-green-600/80',
  electric: 'hover:bg-amber-600/80',
  psychic: 'hover:bg-purple-600/80',
  ice: 'hover:bg-cyan-600/80',
  dragon: 'hover:bg-indigo-600/80',
  dark: 'hover:bg-gray-600/80',
  fairy: 'hover:bg-pink-600/80',
  unknown: 'hover:bg-zinc-500/80',
  shadow: 'hover:bg-gray-500/80',
};

export const POKEMON_TYPE_GRADIENTS: Record<PokemonType, string> = {
  normal: 'from-neutral-600 to-neutral-700',
  fighting: 'from-red-700 to-red-600',
  flying: 'from-blue-700 to-blue-600',
  poison: 'from-fuchsia-700 to-fuchsia-600',
  ground: 'from-yellow-700 to-yellow-600',
  rock: 'from-stone-600 to-stone-700',
  bug: 'from-lime-700 to-lime-600',
  ghost: 'from-violet-700 to-violet-600',
  steel: 'from-slate-600 to-slate-700',
  fire: 'from-orange-700 to-orange-600',
  water: 'from-sky-700 to-sky-600',
  grass: 'from-green-700 to-green-600',
  electric: 'from-amber-700 to-amber-600',
  psychic: 'from-purple-700 to-purple-600',
  ice: 'from-cyan-700 to-cyan-600',
  dragon: 'from-indigo-700 to-indigo-600',
  dark: 'from-gray-700 to-gray-600',
  fairy: 'from-pink-700 to-pink-600',
  unknown: 'from-zinc-600 to-zinc-700',
  shadow: 'from-gray-600 to-gray-700',
};

export const getPokemonTypeColor = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType;
  return POKEMON_TYPE_COLORS[normalizedType] || POKEMON_TYPE_COLORS.normal;
};

export const getPokemonTypeGradient = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType;
  return POKEMON_TYPE_GRADIENTS[normalizedType] || POKEMON_TYPE_GRADIENTS.normal;
};

export const getPokemonCardColor = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType;
  return POKEMON_CARD_COLORS[normalizedType] || POKEMON_CARD_COLORS.normal;
};

export const getPokemonCardHoverColor = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType;
  return POKEMON_CARD_HOVER_COLORS[normalizedType] || POKEMON_CARD_HOVER_COLORS.normal;
};
