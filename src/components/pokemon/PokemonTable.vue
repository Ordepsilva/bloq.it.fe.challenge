<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Pokemon } from '@/models/pokemon';
import { useRouter } from 'vue-router';
import { getPokemonCardHoverColor } from '@/models/colors';
import PokemonTypeBadge from './PokemonTypeBadge.vue';
const props = defineProps<{
  pokemons: Pokemon[];
}>();
const router = useRouter();
</script>

<template>
  <div class="rounded-lg border border-[#e6e4db] overflow-hidden">
    <Table class="min-w-full bg-transparent">
      <TableHeader class="hover:bg-none">
        <TableRow class="border-b-[#e6e4db] bg-muted-foreground/10">
          <TableHead class="w-[80px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Height</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>HP</TableHead>
          <TableHead>Attack</TableHead>
          <TableHead>Defense</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Sp. Atk</TableHead>
          <TableHead>Sp. Def</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="pokemon in props.pokemons"
          :key="pokemon.id"
          :class="`transition cursor-pointer  ${getPokemonCardHoverColor(pokemon.types[0])} bg-none border-b-[#e6e4db]`"
          @click="router.push(`/pokemon/${pokemon.name}`)"
        >
          <TableCell>
            <img :src="pokemon.imgUrl" :alt="pokemon.name" class="h-12 w-12 object-contain" />
          </TableCell>

          <TableCell class="capitalize font-semibold">
            {{ pokemon.name }}
          </TableCell>

          <TableCell class="font-mono text-muted-foreground"> #{{ pokemon.id }} </TableCell>

          <TableCell>
            <div class="flex gap-2">
              <PokemonTypeBadge v-for="type in pokemon.types" :key="type" :type="type" />
            </div>
          </TableCell>
          <TableCell> {{ pokemon.height }} </TableCell>
          <TableCell> {{ pokemon.weight }} </TableCell>
          <TableCell> {{ pokemon.stats.hp }} </TableCell>
          <TableCell> {{ pokemon.stats.attack }} </TableCell>
          <TableCell> {{ pokemon.stats.defense }} </TableCell>
          <TableCell> {{ pokemon.stats.speed }} </TableCell>
          <TableCell> {{ pokemon.stats.specialAttack }} </TableCell>
          <TableCell> {{ pokemon.stats.specialDefense }} </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
