<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isNotLogged } from '@/services/userService'
import { getServiceOrder, updateServiceOrder } from '@/api/apiServiceOrderService'
import NavBarComponent from '@/components/NavBarComponent.vue'
import BackButtonComponent from '@/components/BackButtonComponent.vue'
import { getAllServiceTypes } from '@/api/apiServiceType'
import type { ServiceType } from '@/interfaces/ServiceType'
import type { ServiceOrderOptions } from '@/interfaces/ServiceOrder'

const router = useRouter()
const route = useRoute()

const serviceOrderId = route.params.id as string

const title = ref('')
const description = ref('')
const serviceTypes = ref<ServiceType[]>([])
const selectedType = ref<number | null>(null)

const typeOptions = ref<ServiceOrderOptions | null>(null)

const isLoading = ref(true)
const isTypesLoading = ref(false)
const isSaving = ref(false)

onBeforeMount(() => {
  isNotLogged(router)
})

onMounted(async () => {
  await fetchServiceOrder()
  await fetchServiceTypes()
})

watch(selectedType, (newValue) => {
  if (newValue == null) {
    return
  }

  const selectedServiceType = serviceTypes.value.find((s) => s.id == newValue)

  if (!selectedServiceType) {
    return
  }

  typeOptions.value = {
    version: selectedServiceType.version,
    options: selectedServiceType!.options.map((o) => {
      return { title: o, selected: false }
    }),
  }
})

async function fetchServiceTypes() {
  isLoading.value = true
  try {
    const response = await getAllServiceTypes()

    serviceTypes.value = response
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

async function fetchServiceOrder() {
  isTypesLoading.value = true
  try {
    const response = await getServiceOrder(serviceOrderId)

    if (response.title == null) {
      throw Error('Invalid reponse when getting service order data')
    }

    title.value = response.title
    description.value = response.description
    selectedType.value = response.serviceTypeId ?? null
    typeOptions.value = response.options ?? null
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isTypesLoading.value = false
  }
}

// Save Service Order
async function saveServiceOrder() {
  isSaving.value = true

  try {
    await updateServiceOrder(
      serviceOrderId,
      title.value,
      description.value,
      selectedType.value,
      typeOptions.value,
    )
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

      <!-- Type Dropdown -->
      <div class="mb-3">
        <label class="form-label">Type</label>
        <select v-model="selectedType" class="form-select" :disabled="isSaving || isTypesLoading">
          <option value="" disabled>Select a type</option>
          <option v-for="serviceType in serviceTypes" :key="serviceType.id" :value="serviceType.id">
            {{ serviceType.title }}
          </option>
        </select>
        <div v-if="isTypesLoading" class="text-muted">Loading types...</div>
      </div>

      <!-- Checklist -->
      <div class="mb-3">
        <label class="form-label">Checklist</label>

        <div v-if="isTypesLoading" class="text-muted">Loading checklist...</div>

        <div v-else-if="typeOptions != null">
          <div class="form-check" v-for="option in typeOptions.options" :key="option.title">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="option.selected"
              :disabled="isSaving"
            />
            <label class="form-check-label">{{ option.title }}</label>
          </div>
        </div>

        <div v-else class="text-muted">No checklist items available.</div>
      </div>

      <!-- Save Button -->
      <button class="btn btn-primary mt-3" @click="saveServiceOrder" :disabled="isSaving">
        <span v-if="isSaving" class="spinner-border spinner-border-sm"></span>
        Save Changes
      </button>
    </div>
  </div>
</template>
