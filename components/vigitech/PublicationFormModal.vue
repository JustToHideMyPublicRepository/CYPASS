<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    @click.self="close">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div
        class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Nouvelle publication</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Titre <span class="text-red-500">*</span>
          </label>
          <input v-model="formData.title" type="text" required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Titre de votre publication..." />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contenu <span class="text-red-500">*</span>
          </label>
          <textarea v-model="formData.content" rows="6" required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Décrivez votre découverte, alerte ou question..."></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Catégorie <span class="text-red-500">*</span>
            </label>
            <select v-model="formData.category" required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="Malware">Malware</option>
              <option value="Phishing">Phishing</option>
              <option value="Vulnérabilité">Vulnérabilité</option>
              <option value="DDoS">DDoS</option>
              <option value="Ransomware">Ransomware</option>
              <option value="Data Breach">Data Breach</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Niveau de sévérité <span class="text-red-500">*</span>
            </label>
            <select v-model="formData.severity" required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="critique">Critique</option>
              <option value="élevée">Élevée</option>
              <option value="moyenne">Moyenne</option>
              <option value="faible">Faible</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>

        <div class="flex items-center">
          <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input v-model="formData.isAnonymous" type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            Publier anonymement
          </label>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button type="button" @click="close"
            class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Annuler
          </button>
          <button type="submit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Publier
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Severity, Category } from '~/stores/vigitech'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [data: PublicationFormData]
}>()

export interface PublicationFormData {
  title: string
  content: string
  category: Category
  severity: Severity
  isAnonymous: boolean
}

const formData = ref<PublicationFormData>({
  title: '',
  content: '',
  category: 'Vulnérabilité',
  severity: 'moyenne',
  isAnonymous: false
})

const resetForm = () => {
  formData.value = {
    title: '',
    content: '',
    category: 'Vulnérabilité',
    severity: 'moyenne',
    isAnonymous: false
  }
}

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...formData.value })
  resetForm()
  close()
}

// Reset form when modal closes
watch(() => props.isOpen, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>
