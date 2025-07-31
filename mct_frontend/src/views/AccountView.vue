<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>
<template>
  <div class="account-view">
    <h1>My Account</h1>
    <p>{{ auth.user?.email }}</p>
    <button class="md-btn" @click="auth.logout()">Logout</button>
  </div>
</template>
<style scoped>
.account-view { padding: 30px 0 0 0; }
h1 { color: var(--color-primary); font-weight: 700; font-size: 2rem; }
.md-btn {
  margin-top: 19px;
  appearance: none; border: none; outline: none;
  cursor: pointer;
  border-radius: 7px;
  padding: 11px 20px;
  background: var(--color-primary);
  color: #fff;
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 0.5px 0 var(--color-md-card-border) inset;
  transition: background .14s;
}
.md-btn:hover { background: var(--color-secondary);}
</style>
