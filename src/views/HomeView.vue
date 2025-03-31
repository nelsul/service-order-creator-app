<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { getUserData } from '@/services/userService'
import { onBeforeMount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  try {
    if (getUserData()) {
      router.push('/service-orders')
    }
  } catch {}
})
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
