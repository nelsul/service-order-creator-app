<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isNotLogged } from '@/services/userService'
import {
  addServiceOrderImage,
  getServiceOrder,
  getServiceOrderImage,
  removeServiceOrderImage,
  updateServiceOrder,
} from '@/api/apiServiceOrderService'
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
const images = ref<{ id: string; base64: string }[]>([])

const typeOptions = ref<ServiceOrderOptions | null>(null)

const isLoading = ref(true)
const isTypesLoading = ref(false)
const isSaving = ref(false)
const uploading = ref(false)

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
    images.value = await setImageList(response.imageFiles)
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isTypesLoading.value = false
  }
}

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
    router.push('/service-orders')
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isSaving.value = false
  }
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    uploading.value = true

    try {
      const response = await addServiceOrderImage(serviceOrderId, file)

      images.value = await setImageList(response.imageFiles)
      uploading.value = false
    } catch (e) {
      alert((e as Error).message)
      uploading.value = false
    }
  }
}

async function setImageList(fileNameList: string[]): Promise<{ id: string; base64: string }[]> {
  const imageList: { id: string; base64: string }[] = []

  for (let i = 0; i < fileNameList.length; i++) {
    const newUrl = await getServiceOrderImage(serviceOrderId, fileNameList[i], 200)

    imageList.push({ id: fileNameList[i], base64: newUrl })
  }

  return imageList
}

const deleteImage = async (imageId: string) => {
  try {
    const response = await removeServiceOrderImage(serviceOrderId, imageId)

    images.value = await setImageList(response.imageFiles)
  } catch (e) {
    alert((e as Error).message)
    uploading.value = false
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

      <div class="mt-5">
        <!-- Image Upload Section -->
        <h3>Upload Image</h3>
        <input type="file" @change="handleImageUpload" />

        <div v-if="uploading" class="text-center mt-3">Uploading...</div>

        <h3 class="mt-5">Uploaded Images</h3>
        <!-- Display Uploaded Images -->
        <div v-if="images.length === 0">No images uploaded yet.</div>
        <div class="image-list">
          <div
            v-for="image in images"
            :key="image.id"
            class="image-container position-relative mr-3"
          >
            <img
              :src="'data:image/jpeg;base64,' + image.base64"
              alt="Uploaded Image"
              class="img-thumbnail"
            />
            <!-- Delete Button -->
            <button
              @click="deleteImage(image.id)"
              class="btn-close position-absolute"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-container {
  position: relative;
  width: 200px;
}

img {
  width: 100%;
  height: auto;
}

.btn-close {
  top: -15px;
  right: -20px;
  background-color: rgb(201, 58, 58);
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
}
</style>
