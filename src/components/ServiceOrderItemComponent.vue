<script setup lang="ts">
import type { ShortServiceOrder } from '@/interfaces/ServiceOrder'

defineProps<{
  serviceOrder: ShortServiceOrder
  width: number
}>()
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card bg-light shadow p-4 highlight-box" :style="{ width: (width ?? 400) + 'px' }">
      <h4>{{ !serviceOrder.title ? 'Empty Title' : serviceOrder.title }}</h4>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}

.highlight-box {
  padding: 20px;
  background-color: #f8f9fa; /* Light gray */
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.highlight-box:hover {
  background-color: #e2e6ea; /* Darker gray */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow */
  transform: scale(1.05); /* Slightly increase size */
}
</style>
