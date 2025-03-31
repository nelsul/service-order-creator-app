<script setup lang="ts">
defineProps<{ onClick: () => void }>()
</script>

<template>
  <button
    class="btn btn-lg btn-success shadow position-fixed rounded-circle d-flex justify-content-center align-items-center"
    style="bottom: 20px; right: 20px; width: 60px; height: 60px"
    @click="onClick"
  >
    <i class="bi bi-plus-lg fs-3"></i>
  </button>
</template>
