import { type Pokemon as APIPokemon, type PokemonType } from 'pokeapi-js-wrapper';

export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string;
  types: string[];
  height: number;
  weight: number;
  stats: PokemonStats;
  captured?: boolean;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonTypes =
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

export function mapPokemon(apiPokemon: APIPokemon): Pokemon {
  const statMap: Record<string, number> = {};
  for (const statElement of apiPokemon.stats) {
    statMap[statElement.stat.name] = statElement.base_stat;
  }

  return {
    id: apiPokemon.id,
    name: apiPokemon.name,
    height: apiPokemon.height,
    weight: apiPokemon.weight,
    imgUrl: apiPokemon.sprites.other['official-artwork'].front_default ?? '',
    types: apiPokemon.types.map(
      (t: PokemonType) => t.type.name[0].toUpperCase() + t.type.name.slice(1),
    ),
    stats: {
      hp: statMap['hp'] ?? 0,
      attack: statMap['attack'] ?? 0,
      defense: statMap['defense'] ?? 0,
      specialAttack: statMap['special-attack'] ?? 0,
      specialDefense: statMap['special-defense'] ?? 0,
      speed: statMap['speed'] ?? 0,
    },
  };
}
