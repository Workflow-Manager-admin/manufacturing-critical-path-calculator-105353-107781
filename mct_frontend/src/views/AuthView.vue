<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import MdInput from '../components/MdInput.vue'
import MdButton from '../components/MdButton.vue'

const authStore = useAuthStore()
const mode = ref<'login'|'register'>('login')
const form = ref({ email: '', password: '', confirmPassword: '' })
const error = ref('')

async function onLogin() {
  error.value = ''
  if (!form.value.email || !form.value.password) {
    error.value = 'Email and password are required.'
    return
  }
  try {
    await authStore.login(form.value.email, form.value.password)
  } catch (e: unknown) {
    if (e instanceof Error) error.value = e.message || 'Login failed'
    else error.value = 'Login failed'
  }
}

async function onRegister() {
  error.value = ''
  if (!form.value.email || !form.value.password) {
    error.value = 'Email and password required.'
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }
  try {
    await authStore.register(form.value.email, form.value.password)
  } catch (e: unknown) {
    if (e instanceof Error) error.value = e.message || 'Registration failed'
    else error.value = 'Registration failed'
  }
}
</script>

<template>
  <div class="auth-background">
    <div class="auth-card">
      <h2>{{ mode === 'login' ? 'Sign in to your account' : 'Create account' }}</h2>
      <form @submit.prevent="mode === 'login' ? onLogin() : onRegister()">
        <MdInput
          label="Email"
          name="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="username"
        />
        <MdInput
          label="Password"
          name="password"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
        />
        <MdInput
          v-if="mode === 'register'"
          label="Confirm Password"
          name="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          required
        />
        <div v-if="error" class="auth-error">{{ error }}</div>
        <MdButton type="submit" style="margin-top:20px;width:100%;">
          {{ mode === 'login' ? 'Sign In' : 'Create Account' }}
        </MdButton>
      </form>
      <div class="auth-toggle">
        <span v-if="mode === 'login'">New? <button @click="mode='register'">Create Account</button></span>
        <span v-if="mode === 'register'">Already registered? <button @click="mode='login'">Sign In</button></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-background {
  min-height: 95vh;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(100deg, var(--color-md-fab), #f1edfa 67%, #fff 92%);
}
.auth-card {
  background: #fff;
  border-radius: 17px;
  min-width: 350px;
  box-shadow: 0 7px 35px #dedafaaa;
  padding: 37px 23px 19px 23px;
}

h2 {
  color: var(--color-primary);
  margin-bottom: 18px;
  font-weight: 700;
}

.auth-toggle {
  padding-top: 19px;
  text-align: center;
}

.auth-toggle button {
  background: none;
  color: var(--color-secondary);
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.auth-error {
  color: var(--color-secondary);
  padding-top: 8px;
  font-weight: 500;
}
</style>
