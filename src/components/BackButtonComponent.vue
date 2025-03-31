<script setup lang="ts">
function hasHistory(): boolean {
  return window.history.length > 2
}

function goBack() {
  window.history.back()
}
</script>

<template>
  <button v-if="hasHistory()" @click="goBack" class="btn btn-link">
    <i class="bi bi-arrow-left-circle" style="font-size: 1.5rem"></i>
  </button>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
