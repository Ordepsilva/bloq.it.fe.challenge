import type { PokemonType } from '@/lib/models/pokemon';

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
  normal: 'bg-neutral-400',
  fighting: 'bg-red-400',
  flying: 'bg-blue-400',
  poison: 'bg-fuchsia-400',
  ground: 'bg-yellow-400',
  rock: 'bg-stone-400',
  bug: 'bg-lime-400',
  ghost: 'bg-violet-400',
  steel: 'bg-slate-400',
  fire: 'bg-orange-400',
  water: 'bg-sky-400',
  grass: 'bg-green-400',
  electric: 'bg-amber-400',
  psychic: 'bg-purple-400',
  ice: 'bg-cyan-400',
  dragon: 'bg-indigo-400',
  dark: 'bg-gray-400',
  fairy: 'bg-pink-400',
  unknown: 'bg-zinc-400',
  shadow: 'bg-gray-400',
};

export const POKEMON_CARD_HOVER_COLORS: Record<PokemonType, string> = {
  normal: 'hover:bg-neutral-400',
  fighting: 'hover:bg-red-400',
  flying: 'hover:bg-blue-400',
  poison: 'hover:bg-fuchsia-400',
  ground: 'hover:bg-yellow-400',
  rock: 'hover:bg-stone-400',
  bug: 'hover:bg-lime-400',
  ghost: 'hover:bg-violet-400',
  steel: 'hover:bg-slate-400',
  fire: 'hover:bg-orange-400',
  water: 'hover:bg-sky-400',
  grass: 'hover:bg-green-400',
  electric: 'hover:bg-amber-400',
  psychic: 'hover:bg-purple-400',
  ice: 'hover:bg-cyan-400',
  dragon: 'hover:bg-indigo-400',
  dark: 'hover:bg-gray-500',
  fairy: 'hover:bg-pink-400',
  unknown: 'hover:bg-zinc-400',
  shadow: 'hover:bg-gray-500',
};

export const POKEMON_TYPE_GRADIENTS: Record<PokemonType, string> = {
  normal: 'from-neutral-400 to-neutral-600',
  fighting: 'from-red-400 to-red-700',
  flying: 'from-blue-400 to-blue-700',
  poison: 'from-fuchsia-400 to-fuchsia-700',
  ground: 'from-yellow-400 to-yellow-700',
  rock: 'from-stone-400 to-stone-700',
  bug: 'from-lime-400 to-lime-700',
  ghost: 'from-violet-400 to-violet-700',
  steel: 'from-slate-400 to-slate-700',
  fire: 'from-orange-400 to-orange-700',
  water: 'from-sky-400 to-sky-700',
  grass: 'from-green-400 to-green-700',
  electric: 'from-amber-400 to-amber-700',
  psychic: 'from-purple-400 to-purple-700',
  ice: 'from-cyan-400 to-cyan-700',
  dragon: 'from-indigo-400 to-indigo-700',
  dark: 'from-gray-500 to-gray-700',
  fairy: 'from-pink-400 to-pink-700',
  unknown: 'from-zinc-400 to-zinc-600',
  shadow: 'from-gray-400 to-gray-600',
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
