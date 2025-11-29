<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2">VigiTech Forum</h1>
          <p class="text-blue-100">Partagez et découvrez les dernières informations en cybersécurité</p>
        </div>
        <button v-if="isAuthenticated" @click="showPublicationModal = true"
          class="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle publication
        </button>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Search and Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <input v-model="searchQuery" type="text" placeholder="Rechercher une publication..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <select v-model="filterCategory"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="">Toutes les catégories</option>
              <option value="Malware">Malware</option>
              <option value="Phishing">Phishing</option>
              <option value="Vulnérabilité">Vulnérabilité</option>
              <option value="DDoS">DDoS</option>
              <option value="Ransomware">Ransomware</option>
              <option value="Data Breach">Data Breach</option>
            </select>
          </div>

          <div>
            <select v-model="filterSeverity"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="">Toutes les sévérités</option>
              <option value="critique">Critique</option>
              <option value="élevée">Élevée</option>
              <option value="moyenne">Moyenne</option>
              <option value="faible">Faible</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Publications List -->
      <div class="space-y-4 mb-8">
        <NuxtLink v-for="publication in paginatedPublications" :key="publication.id"
          :to="`/vigiforum/${publication.id}`" class="block">
          <PublicationCard :publication="publication" :show-actions="isAuthenticated" @report="handleReport" />
        </NuxtLink>
      </div>

      <!-- No Results -->
      <div v-if="!paginatedPublications.length"
        class="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
        <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>Aucune publication trouvée</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
          Précédent
        </button>
        <span class="text-gray-700 dark:text-gray-300">Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
          Suivant
        </button>
      </div>

      <!-- Not Authenticated Message -->
      <div v-if="!isAuthenticated"
        class="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
        <p class="text-blue-800 dark:text-blue-200 mb-2">
          Connectez-vous pour publier et commenter
        </p>
        <NuxtLink to="/auth/login"
          class="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          Se connecter
        </NuxtLink>
      </div>
    </div>

    <PublicationFormModal :is-open="showPublicationModal" @close="showPublicationModal = false"
      @submit="handlePublish" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVigitechStore } from '~/stores/vigitech'
import PublicationFormModal from '~/components/vigitech/PublicationFormModal.vue'
import type { PublicationFormData } from '~/components/vigitech/PublicationFormModal.vue'

// Store
const vigitechStore = useVigitechStore()

// Mock authentication state
const isAuthenticated = ref(true) // Change to false to test unauthenticated view

// Modal state
const showPublicationModal = ref(false)

// Search and filters
const searchQuery = ref('')
const filterCategory = ref('')
const filterSeverity = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Computed filtered publications
const filteredPublications = computed(() => {
  let results = vigitechStore.publishedPublications

  if (searchQuery.value) {
    results = results.filter(p =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterCategory.value) {
    results = results.filter(p => p.category === filterCategory.value)
  }

  if (filterSeverity.value) {
    results = results.filter(p => p.severity === filterSeverity.value)
  }

  return results
})

const paginatedPublications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPublications.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredPublications.value.length / itemsPerPage))

// Handlers
const handlePublish = (data: PublicationFormData) => {
  vigitechStore.addPublication({
    ...data,
    excerpt: data.content.substring(0, 150) + '...',
    author: data.isAnonymous ? 'Utilisateur anonyme' : 'Utilisateur connecté'
  })
  console.log('Publication créée:', data)
}

const handleReport = (id: string) => {
  console.log('Reporting publication:', id)
}

definePageMeta({
  layout: 'default'
})
</script>
