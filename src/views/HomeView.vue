<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="card">
    <div class="card-body text-center">
      <h4>Welcome to the Service Order Creator</h4>

      <div></div>

      <span
        >Please, <RouterLink to="/">Login</RouterLink> (or
        <RouterLink to="/">Register</RouterLink>)</span
      >
    </div>
  </div>
</template>
