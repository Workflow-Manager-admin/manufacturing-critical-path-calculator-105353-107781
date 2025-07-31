<script setup lang="ts">
defineProps({ type: { type: String as () => "button" | "submit" | "reset", default: "button" }, disabled: { type: Boolean, default: false } })
</script>
<template>
  <button :type="type" class="md-btn" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.md-btn {
  appearance: none;
  border: none;
  outline: none;
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
.md-btn:hover, .md-btn:focus {
  background: var(--color-secondary);
}
.md-btn:disabled {
  opacity: .60;
  cursor: not-allowed;
}
</style>
