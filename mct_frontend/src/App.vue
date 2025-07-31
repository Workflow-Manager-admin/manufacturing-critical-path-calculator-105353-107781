<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import { ref, type Component } from 'vue'
import ModalDialog from './components/ModalDialog.vue'

const showModal = ref(false)
const modalContent = ref<Component | null>(null)

/** PUBLIC_INTERFACE
 * Triggers showing the global modal dialog with given content.
 */
function openGlobalModal(contentComponent: Component) {
  modalContent.value = contentComponent
  showModal.value = true
}
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <main class="main-area">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :open-global-modal="openGlobalModal" />
      </RouterView>
    </main>
    <!-- Global Modal for dialogs -->
    <ModalDialog v-if="showModal" @close="showModal = false">
      <component v-if="modalContent" :is="modalContent" />
    </ModalDialog>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  background: var(--color-background);
  min-height: 100vh;
  font-family: 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

.main-area {
  flex: 1;
  padding: 2.5rem 2rem 2rem 280px;
  background: #faf8fc;
  min-height: 100vh;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .main-area {
    padding-left: 90px;
  }
}

/* Hide global modal backdrop under the modal slot */
:global(.modal-backdrop) {
  position: fixed;
  z-index: 101;
  top: 0;left: 0;right: 0;bottom: 0;
  background: rgba(44,16,72,0.18);
}
</style>
