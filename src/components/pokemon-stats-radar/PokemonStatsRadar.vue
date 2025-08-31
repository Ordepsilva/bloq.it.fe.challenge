<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import type { PokemonStats } from '@/lib/models/pokemon';
Chart.register(...registerables);

const chartRef = ref<HTMLCanvasElement | null>(null);
const props = defineProps<{
  stats: PokemonStats;
}>();

const chartData = {
  labels: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'],
  datasets: [
    {
      label: 'Stats',
      data: [
        props.stats.hp,
        props.stats.attack,
        props.stats.defense,
        props.stats.specialAttack,
        props.stats.specialDefense,
        props.stats.speed,
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.4)', // blue-500
      borderColor: '#2563eb', // blue-600
      pointBackgroundColor: '#fbbf24', // yellow-400
      pointBorderColor: '#e11d48', // red-600
      pointRadius: 5,
    },
  ],
};

onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: 'radar',
      data: chartData,
      options: {
        scales: {
          r: {
            angleLines: { color: '#a21caf' }, // fuchsia-700
            grid: { color: '#fbbf24' }, // yellow-400
            pointLabels: { color: '#2563eb', font: { size: 14, weight: 'bold' } },
            min: 0,
            max: 100,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
      },
    });
  }
});
</script>

<template>
  <Card class="mb-6 rounded-2xl shadow-lg border-none bg-transparent">
    <CardHeader class="items-center">
      <CardTitle class="text-lg font-pokemon text-yellow-700 drop-shadow">Pokémon Stats</CardTitle>
      <CardDescription> Showing base stats for this Pokémon </CardDescription>
    </CardHeader>
    <CardContent class="pb-0 flex justify-center">
      <canvas ref="chartRef" class="size-50 md:!size-100"></canvas>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 leading-none font-medium">Pokémon stat breakdown</div>
      <div class="text-muted-foreground flex items-center gap-2 leading-none">
        HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
      </div>
    </CardFooter>
  </Card>
</template>
