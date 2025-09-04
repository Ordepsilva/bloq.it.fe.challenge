<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { isPokemonCaughtEntry, type Pokemon, type PokemonCaughtEntry } from '@/lib/models/pokemon';
import { useRouter } from 'vue-router';
import { getPokemonCardHoverColor } from '@/lib/models/colors';
import PokemonTypeBadge from '@/components/pokemon-type-badge/PokemonTypeBadge.vue';
import { usePokemonCaught, useOnlineStatus } from '@/composables';
import PokeballButton from '@/components/pokeball-button/PokeballButton.vue';
import PokemonNotesPreview from '@/components/pokemon-notes-preview/PokemonNotesPreview.vue';
import { Checkbox } from '@/components/ui/checkbox';

const props = defineProps<{
  pokemons: Pokemon[] | PokemonCaughtEntry[];
  hasFiltersActive?: boolean;
  enableMultiSelect?: boolean;
  selectedIds?: Set<number>;
}>();

const isOnline = useOnlineStatus();
const router = useRouter();
const { isCaught, toggleCaught } = usePokemonCaught();

const emit = defineEmits<{
  (e: 'update:selectionChange', value: number): void;
  (e: 'update:selectAll', ids: number[]): void;
}>();
</script>

<template>
  <div class="rounded-lg border border-[#e6e4db] overflow-hidden">
    <Table class="min-w-full bg-transparent">
      <TableHeader class="hover:bg-none">
        <TableRow class="border-b-[#e6e4db] bg-muted-foreground/10">
          <TableHead v-if="enableMultiSelect">
            <Checkbox
              :model-value="pokemons.every((p) => props.selectedIds?.has(p.id))"
              class="cursor-pointer"
              @click.stop="
                emit(
                  'update:selectAll',
                  pokemons.map((p) => p.id),
                )
              "
            />
          </TableHead>
          <TableHead class="w-[80px]">Image</TableHead>
          <TableHead class="w-12"></TableHead>
          <TableHead class="min-w-auto">Name</TableHead>
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
        <template v-if="props.pokemons.length > 0">
          <TableRow
            v-for="pokemon in props.pokemons"
            :key="pokemon.id"
            :class="`transition cursor-pointer  ${getPokemonCardHoverColor(pokemon.types[0])} bg-none border-b-[#e6e4db]`"
            @click="router.push(`/pokemon/${pokemon.id}`)"
          >
            <TableCell v-if="enableMultiSelect">
              <Checkbox
                :key="pokemon.id"
                :model-value="props.selectedIds?.has(pokemon.id)"
                class="cursor-pointer"
                @click.stop="emit('update:selectionChange', pokemon.id)"
              />
            </TableCell>
            <TableCell>
              <img
                data-testid="pokemon-image"
                :src="pokemon.imgUrl ?? '/placeholder.png'"
                :alt="pokemon.name"
                class="size-12 object-contain"
              />
            </TableCell>

            <TableCell class="w-12">
              <PokeballButton
                :caught="isCaught(pokemon)"
                size="size-12"
                @click="toggleCaught(pokemon)"
              />
            </TableCell>
            <TableCell class="capitalize font-semibold min-w-auto">
              <div class="flex items-center gap-2">
                {{ pokemon.name }}

                <PokemonNotesPreview
                  v-if="isPokemonCaughtEntry(pokemon) && pokemon.notes.length > 0"
                  :notes="pokemon.notes"
                  class="inline-block ml-2"
                />
              </div>
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
        </template>
        <template v-else-if="props.hasFiltersActive">
          <TableRow>
            <TableCell colspan="14" class="text-center p-4">
              No Pokemons match your filters.
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="!isOnline">
          <TableRow class="bg-yellow-100" data-testid="offline-row">
            <TableCell colspan="14" class="text-center p-4 text-yellow-800">
              You are offline. Please go back online to get the latest Pokemons.
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell colspan="14" class="text-center p-4"> No Pokemons Found. </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
