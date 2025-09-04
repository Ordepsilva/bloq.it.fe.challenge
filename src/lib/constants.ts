import type { PokemonStats } from './models/pokemon';

export const PER_PAGE = 10;

type StatBadgeConfig = {
  key: keyof PokemonStats;
  label: string;
  icon: string;
  bg: string;
  text: string;
};

export const STAT_BADGES_CONFIG: StatBadgeConfig[] = [
  { key: 'hp', label: 'HP', icon: '❤️', bg: 'bg-green-200', text: 'text-green-800' },
  { key: 'attack', label: 'Attack', icon: '⚔️', bg: 'bg-red-200', text: 'text-red-800' },
  { key: 'defense', label: 'Defense', icon: '🛡️', bg: 'bg-blue-200', text: 'text-blue-800' },
  {
    key: 'specialAttack',
    label: 'Sp. Atk',
    icon: '✨',
    bg: 'bg-yellow-200',
    text: 'text-yellow-800',
  },
  {
    key: 'specialDefense',
    label: 'Sp. Def',
    icon: '🌀',
    bg: 'bg-purple-200',
    text: 'text-purple-800',
  },
  { key: 'speed', label: 'Speed', icon: '⚡', bg: 'bg-pink-200', text: 'text-pink-800' },
];
