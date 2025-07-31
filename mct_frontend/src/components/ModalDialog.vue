<script setup lang="ts">
defineProps({ showClose: { type: Boolean, default: true } })
const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click="close"></div>
  <dialog open class="modal-dialog" @click.stop>
    <div class="modal-content">
      <button v-if="showClose" class="modal-close" @click="close">
        <span class="material-icons">close</span>
      </button>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.modal-backdrop {
  position: fixed;
  z-index: 10010;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(80,40,140,0.15);
  transition: background .16s;
}
.modal-dialog {
  z-index: 10011;
  min-width: 390px;
  width: 90%;
  max-width: 500px;
  margin: 12vh auto 0 auto;
  border: none; outline: none;
  border-radius: 16px;
  box-shadow: 0 8px 50px rgba(88,0,128,.12);
  background: #fff;
}
.modal-content {
  padding: 30px 32px 22px 32px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 15px; right: 13px;
  background: none;
  border: none;
  font-size: 2em;
  color: var(--color-secondary);
  cursor: pointer;
}
@media (max-width: 600px) {
  .modal-dialog {
    min-width: 90vw;
  }
  .modal-content {
    padding: 16px 4vw 14px 4vw;
  }
}
</style>
