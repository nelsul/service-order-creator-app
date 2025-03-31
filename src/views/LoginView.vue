<script setup lang="ts">
import BackButtonComponent from '@/components/BackButtonComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function login() {
  if (email.value === 'user@example.com' && password.value === 'password123') {
    // localStorage.setItem('token', 'your-jwt-token') // Simulated token storage
    // router.push('/dashboard') // Redirect after login
  } else {
    errorMessage.value = 'Invalid email or password'
  }
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <CardComponent :max-widht="500" class="position-relative">
      <!-- Back Button -->
      <BackButtonComponent class="position-absolute top-0 start-0 mt-2 ms-2"></BackButtonComponent>

      <!-- Profile Picture Preview -->
      <h3 class="text-center mb-3">Login</h3>

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

      <!-- Login Button -->
      <button class="btn btn-primary w-100" @click="login">Login</button>

      <!-- Register Box -->
      <div class="text-center mt-2">
        <span>Don't have an account? <RouterLink to="/register">Register</RouterLink></span>
      </div>
    </CardComponent>
  </div>
</template>

<style scoped>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}
</style>
