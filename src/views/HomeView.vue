<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mt-5">
    <CardComponent :maxWidht="1200">
      <div class="text-center">
        <h4>Welcome to the Service Order Creator</h4>

        <span
          >Please, <RouterLink to="/login">Login</RouterLink> (or
          <RouterLink to="/register">Register</RouterLink>)</span
        >
      </div>
    </CardComponent>
  </div>
</template>
