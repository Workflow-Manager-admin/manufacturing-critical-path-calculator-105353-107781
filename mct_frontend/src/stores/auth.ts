import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../utils/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null as null | { email: string; token: string })

  // PUBLIC_INTERFACE
  async function login(email: string, password: string) {
    // Replace with backend call to mct_database or auth service
    const res = await api.post('/auth/login', { email, password })
    if (!res.success) throw new Error(res.error || "Invalid credentials")
    user.value = { email: res.data.email, token: res.data.token }
    // Optionally store token in localStorage, etc.
  }

  // PUBLIC_INTERFACE
  async function register(email: string, password: string) {
    const res = await api.post('/auth/register', { email, password })
    if (!res.success) throw new Error(res.error || "Registration failed")
    user.value = { email: res.data.email, token: res.data.token }
  }

  // PUBLIC_INTERFACE
  function logout() {
    user.value = null
    // Remove token, redirect, etc.
  }

  return { user, login, register, logout }
})
