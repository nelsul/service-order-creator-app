<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isNotLogged } from '@/services/userService'
import { getServiceOrder, updateServiceOrder } from '@/api/apiServiceOrderService'
import NavBarComponent from '@/components/NavBarComponent.vue'
import BackButtonComponent from '@/components/BackButtonComponent.vue'

const router = useRouter()
const route = useRoute()

const serviceOrderId = route.params.id as string

const title = ref('')
const description = ref('')

const isLoading = ref(true)
const isSaving = ref(false)

onBeforeMount(() => {
  isNotLogged(router)
})

onMounted(async () => {
  await fetchServiceOrder()
})

async function fetchServiceOrder() {
  isLoading.value = true
  try {
    const response = await getServiceOrder(serviceOrderId)

    if (response.title == null) {
      throw Error('Invalid reponse when getting service order data')
    }

    title.value = response.title
    description.value = response.description
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

// Save Service Order
async function saveServiceOrder() {
  isSaving.value = true
  try {
    await updateServiceOrder(serviceOrderId, title.value, description.value)
    alert('Service Order Updated!')
    // router.push('/service-orders')
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <!-- NavbAR  -->
  <NavBarComponent title="Service Orders Creator" />

  <div class="container mt-4">
    <BackButtonComponent></BackButtonComponent>

    <h2>Edit Service Order</h2>

    <!-- Page Loading -->
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading service order...</p>
    </div>

    <div v-else>
      <!-- Title -->
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="title" type="text" class="form-control" :disabled="isSaving" />
      </div>

      <!-- Description -->
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="description" class="form-control" :disabled="isSaving"></textarea>
      </div>

      <!-- Save Button -->
      <button class="btn btn-primary mt-3" @click="saveServiceOrder" :disabled="isSaving">
        <span v-if="isSaving" class="spinner-border spinner-border-sm"></span>
        Save Changes
      </button>
    </div>
  </div>
</template>
