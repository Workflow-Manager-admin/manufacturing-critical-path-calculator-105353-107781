<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  modelValue: String,
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
function updateValue(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="md-input-group">
    <input
      :id="name"
      :name="name"
      :type="type"
      class="md-input"
      :required="required"
      :value="modelValue"
      :autocomplete="autocomplete"
      @input="updateValue"
    />
    <label :for="name" class="md-label">{{ label }}</label>
  </div>
</template>

<style scoped>
.md-input-group {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 23px;
}
.md-label {
  color: var(--color-primary);
  font-size: .98em;
  font-weight: 500;
  margin-bottom: 3.5px;
  margin-inline-start: 3px;
  letter-spacing: .02em;
}
.md-input {
  border: 1.5px solid var(--color-primary);
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 1.05em;
  transition: border .13s;
  outline: none;
}

.md-input:focus {
  border: 2.2px solid var(--color-secondary);
}
</style>
