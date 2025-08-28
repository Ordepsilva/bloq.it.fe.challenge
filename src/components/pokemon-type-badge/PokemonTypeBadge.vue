<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { getPokemonTypeColor } from '@/lib/models/colors';

const props = defineProps<{
  type: string;
}>();

const typeColor = getPokemonTypeColor(props.type);
</script>

<template>
  <Badge
    class="bg-white/20 text-white/70 capitalize group-hover:brightness-125 group-hover:text-white"
    :class="typeColor"
  >
    {{ props.type }}
  </Badge>
</template>
