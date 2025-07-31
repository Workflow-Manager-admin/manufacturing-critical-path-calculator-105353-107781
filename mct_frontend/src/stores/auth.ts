import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../utils/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null as null | { email: string; token: string })

  // PUBLIC_INTERFACE
  interface AuthResponse {
    success: boolean;
    error?: string;
    data?: {
      email: string;
      token: string;
    };
    [key: string]: unknown;
  }

  function isAuthResponse(obj: unknown): obj is AuthResponse {
    return (
      !!obj &&
      typeof obj === "object" &&
      "success" in obj &&
      typeof (obj as { success: unknown }).success === "boolean"
    );
  }

  async function login(email: string, password: string) {
    // Replace with backend call to mct_database or auth service
    const res = await api.post('/auth/login', { email, password }) as unknown;
    if (!isAuthResponse(res)) {
      throw new Error("Unexpected server response");
    }
    if (!res.success) throw new Error(res.error || "Invalid credentials");
    if (!res.data) throw new Error("User data missing in response");
    user.value = { email: res.data.email, token: res.data.token };
    // Optionally store token in localStorage, etc.
  }

  // PUBLIC_INTERFACE
  async function register(email: string, password: string) {
    const res = await api.post('/auth/register', { email, password }) as unknown;
    if (!isAuthResponse(res)) {
      throw new Error("Unexpected server response");
    }
    if (!res.success) throw new Error(res.error || "Registration failed");
    if (!res.data) throw new Error("User data missing in response");
    user.value = { email: res.data.email, token: res.data.token };
  }

  // PUBLIC_INTERFACE
  function logout() {
    user.value = null
    // Remove token, redirect, etc.
  }

  return { user, login, register, logout }
})
