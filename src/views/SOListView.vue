<script setup lang="ts">
import { getUserData } from '@/services/userService'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  try {
    getUserData()
  } catch {
    router.push('/login')
  }
})
</script>

<template>
  <h1>Test</h1>
</template>
