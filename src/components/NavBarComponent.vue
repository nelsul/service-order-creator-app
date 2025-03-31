<script setup lang="ts">
import { getUserPictureUrl } from '@/api/apiUserService'
import { getUserData, removeUserData } from '@/services/userService'
import { useRouter } from 'vue-router'

defineProps<{ title: string }>()

const router = useRouter()

function logout() {
  removeUserData()
  router.push('/')
}
</script>

<template>
  <nav class="navbar navbar-light bg-light shadow p-3">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Title -->
      <h3 class="m-0">{{ title }}</h3>

      <div class="d-flex align-items-center">
        <!-- User Picture -->
        <img
          :src="getUserPictureUrl(getUserData().pictureId)"
          alt="Profile"
          class="rounded-circle mr-2"
          style="width: 40px; height: 40px; object-fit: cover"
        />

        <!-- Logout Button -->
        <button class="btn btn-link text-danger btn-sm" @click="logout">
          <i class="bi bi-box-arrow-right" style="font-size: 1.5rem"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
