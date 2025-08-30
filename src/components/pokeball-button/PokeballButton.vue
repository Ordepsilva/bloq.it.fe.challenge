<script setup lang="ts">
const props = defineProps<{
  caught: boolean;
  size?: string;
  class?: string;
}>();

const emit = defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <div
    class="cursor-pointer"
    role="button"
    :aria-pressed="props.caught"
    :title="props.caught ? 'Release Pokémon' : 'Catch Pokémon'"
    :class="props.class"
    @click.stop="emit('click')"
  >
    <img
      src="/normal_pokeball.svg"
      :alt="props.caught ? 'Pokémon caught' : 'Pokémon not caught'"
      :class="[
        props.size || 'w-12 h-12',
        'transition-all duration-300 max-w-none',
        props.caught ? 'opacity-100 grayscale-0 scale-110 drop-shadow-lg' : 'opacity-40 grayscale',
      ]"
    />
  </div>
</template>
