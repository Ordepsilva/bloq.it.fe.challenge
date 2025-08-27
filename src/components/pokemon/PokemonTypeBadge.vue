<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { getPokemonTypeColor } from '@/models/colors';

const props = defineProps<{
  type: string;
}>();

const typeColor = getPokemonTypeColor(props.type);
</script>

<template>
  <Badge
    class="bg-white/20 text-white/70 capitalize group-hover:bg-white/40 group-hover:text-white"
    :class="typeColor"
  >
    {{ props.type }}
  </Badge>
</template>
