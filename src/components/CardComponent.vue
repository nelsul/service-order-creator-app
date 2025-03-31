<script setup lang="ts">
defineProps({
  maxWidht: Number,
})
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow p-4" :style="{ width: (maxWidht ?? 400) + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
