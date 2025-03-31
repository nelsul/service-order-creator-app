<script setup lang="ts">
import BackButtonComponent from '@/components/BackButtonComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const profilePicture = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    profilePicture.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

function register() {
  console.log('Name:', name.value)
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Profile Picture:', profilePicture.value)
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <CardComponent :max-widht="500" class="position-relative">
      <!-- Back Button -->
      <BackButtonComponent class="position-absolute top-0 start-0 mt-2 ms-2"></BackButtonComponent>

      <!-- Title -->
      <h3 class="text-center mb-3">Register</h3>

      <!-- Profile Picture Preview -->
      <div class="text-center">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Profile Preview"
          class="rounded-circle mb-3"
          style="width: 100px; height: 100px; object-fit: cover"
        />
      </div>

      <!-- Profile Picture Upload -->
      <div class="mb-3">
        <label class="form-label">Upload Profile Picture</label>
        <input type="file" class="form-control" @change="handleFileUpload" accept="image/*" />
      </div>

      <!-- Name Field -->
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model="name" required />
      </div>

      <!-- Email Field -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>

      <!-- Password Field -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" required />
      </div>

      <!-- Register Button -->
      <button class="btn btn-success w-100" @click="register">Register</button>

      <!-- Login Box -->
      <div class="text-center mt-2">
        <span>Already have an account? <RouterLink to="/login">Login</RouterLink></span>
      </div>
    </CardComponent>
  </div>
</template>

<style scoped></style>
