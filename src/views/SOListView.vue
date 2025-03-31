<script setup lang="ts">
import { createServiceOrder, getAllServiceOrders } from '@/api/apiServiceOrderService'
import FloatingButtonComponent from '@/components/FloatingButtonComponent.vue'
import NavBarComponent from '@/components/NavBarComponent.vue'
import ServiceOrderItemComponent from '@/components/ServiceOrderItemComponent.vue'
import type { ShortServiceOrder } from '@/interfaces/ServiceOrder'
import { isNotLogged } from '@/services/userService'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref(true)

const ordersList = ref<ShortServiceOrder[]>([])

onBeforeMount(() => {
  isNotLogged(router)
})

onMounted(async () => {
  await fetchServiceOrders()
})

async function fetchServiceOrders() {
  isLoading.value = true
  try {
    const response = await getAllServiceOrders()

    if (!response.length) {
      throw Error('Invalid reponse when getting service orders')
    }

    ordersList.value = response
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

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

function selectServiceOrder(order: ShortServiceOrder) {
  router.push(`/service-orders/${order.id}/edit`)
}
</script>

<template>
  <!-- NavbAR  -->
  <NavBarComponent title="Service Orders Creator" />

  <div class="container mt-4">
    <!-- Page Loading -->
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading service orders...</p>
    </div>

    <div v-else>
      <div v-for="(order, index) in ordersList" :key="index" class="mb-4">
        <ServiceOrderItemComponent
          :service-order="order"
          :width="500"
          @click="selectServiceOrder(order)"
        ></ServiceOrderItemComponent>
      </div>
    </div>
  </div>

  <!-- Floating Button -->
  <FloatingButtonComponent :onClick="createNew" />
</template>
