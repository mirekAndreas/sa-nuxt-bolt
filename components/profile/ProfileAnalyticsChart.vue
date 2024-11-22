<template>
  <div class="h-[300px]">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { MonthlyStats } from '~/types/profile'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  stats: MonthlyStats[]
}>()

const chartData = computed(() => ({
  labels: props.stats.map(stat => stat.month),
  datasets: [
    {
      label: 'Views',
      data: props.stats.map(stat => stat.views),
      borderColor: '#FF4E50',
      tension: 0.4
    },
    {
      label: 'Inquiries',
      data: props.stats.map(stat => stat.inquiries),
      borderColor: '#2C3E50',
      tension: 0.4
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}</script>