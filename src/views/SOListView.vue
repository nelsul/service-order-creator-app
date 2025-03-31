<script setup lang="ts">
import { getUserPictureUrl } from '@/api/apiUserService'
import NavBarComponent from '@/components/NavBarComponent.vue'
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
  <NavBarComponent
    title="Service Orders Creator"
    :userPictureUrl="getUserPictureUrl(getUserData().pictureId)"
  />
</template>
