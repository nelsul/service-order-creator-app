<script setup lang="ts">
import { createServiceOrder } from '@/api/apiServiceOrderService'
import FloatingButtonComponent from '@/components/FloatingButtonComponent.vue'
import NavBarComponent from '@/components/NavBarComponent.vue'
import { isNotLogged } from '@/services/userService'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  isNotLogged(router)
})

async function createNew() {
  try {
    const response = await createServiceOrder('', '')

    if (!response.id) {
      throw Error('Invalid response when creating service order')
    }

    router.push(`/service-orders/${response.id}/edit`)

    console.log(response)
  } catch (e) {
    alert((e as Error).message)
  }
}
</script>

<template>
  <!-- NavbAR  -->
  <NavBarComponent title="Service Orders Creator" />

  <!-- Floating Button -->
  <FloatingButtonComponent :onClick="createNew" />
</template>
