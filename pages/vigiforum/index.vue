<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Header with gradient -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute inset-0">
        <div
          class="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob">
        </div>
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000">
        </div>
        <div
          class="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000">
        </div>
      </div>
      <div class="container mx-auto px-4 py-16 relative">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h1 class="text-5xl font-bold mb-2 drop-shadow-lg">VigiTech Forum</h1>
                <p class="text-blue-100 text-lg">🔐 Partagez et découvrez les dernières menaces en cybersécurité</p>
              </div>
            </div>
          </div>
          <button v-if="isAuthenticated" @click="showPublicationModal = true"
            class="group px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-2xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3">
            <svg class="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Nouvelle publication</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- View Toggle -->
      <div class="mb-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="viewMode = 'categories'"
            :class="viewMode === 'categories' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            class="px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Par Catégorie
          </button>
          <button @click="viewMode = 'severity'"
            :class="viewMode === 'severity' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            class="px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Par Sévérité
          </button>
          <button @click="viewMode = 'all'"
            :class="viewMode === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            class="px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Toutes
          </button>
        </div>
      </div>

      <!-- Category Cards View -->
      <div v-if="viewMode === 'categories'" class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Explorer par Catégorie
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="cat in categoryStats" :key="cat.name" @click="selectFilter('category', cat.name)"
            class="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 border-2 border-transparent hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            :class="selectedCategory === cat.name ? 'border-blue-500 shadow-2xl -translate-y-1' : ''">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="text-4xl">{{ cat.icon }}</div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ cat.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ cat.count }} publications</p>
                </div>
              </div>
              <div
                class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full p-2 group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 transition-all"
                  :style="{ width: `${(cat.count / totalPublications) * 100}%` }"></div>
              </div>
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-400">{{ Math.round((cat.count /
                totalPublications) * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Severity Cards View -->
      <div v-if="viewMode === 'severity'" class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Explorer par Sévérité
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div v-for="sev in severityStats" :key="sev.name" @click="selectFilter('severity', sev.name)"
            class="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 border-2 border-transparent transition-all duration-300 hover:-translate-y-2"
            :class="[selectedSeverity === sev.name ? 'shadow-2xl -translate-y-1' : '', sev.borderClass]">
            <div class="text-center">
              <div class="text-5xl mb-3">{{ sev.icon }}</div>
              <h3 class="text-xl font-bold mb-2" :class="sev.textClass">{{ sev.label }}</h3>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ sev.count }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">publications</p>
              <div class="mt-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div :class="sev.barClass" class="rounded-full h-2 transition-all"
                  :style="{ width: `${(sev.count / totalPublications) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Additional Filters (shown when viewing all or after selecting a category/severity) -->
      <div v-if="viewMode === 'all' || selectedCategory || selectedSeverity"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recherche et Filtres</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <input v-model="searchQuery" type="text" placeholder="🔍 Rechercher une publication..."
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>

          <div>
            <select v-model="filterCategory"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Toutes les catégories</option>
              <option value="Malware">🦠 Malware</option>
              <option value="Phishing">🎣 Phishing</option>
              <option value="Vulnérabilité">🔓 Vulnérabilité</option>
              <option value="DDoS">⚡ DDoS</option>
              <option value="Ransomware">🔒 Ransomware</option>
              <option value="Data Breach">💾 Data Breach</option>
            </select>
          </div>

          <div>
            <select v-model="filterSeverity"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Toutes les sévérités</option>
              <option value="critique">🔴 Critique</option>
              <option value="élevée">🟠 Élevée</option>
              <option value="moyenne">🟡 Moyenne</option>
              <option value="faible">🟢 Faible</option>
              <option value="info">🔵 Info</option>
            </select>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="selectedCategory || selectedSeverity || searchQuery" class="flex items-center gap-2 mt-4 flex-wrap">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Filtres actifs:</span>
          <span v-if="selectedCategory" @click="clearFilter('category')"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-1">
            {{ selectedCategory }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <span v-if="selectedSeverity" @click="clearFilter('severity')"
            class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors flex items-center gap-1">
            {{ selectedSeverity }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <button v-if="selectedCategory || selectedSeverity" @click="clearAllFilters"
            class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
            Tout effacer
          </button>
        </div>
      </div>

      <!-- Publications List -->
      <div v-if="viewMode === 'all' || selectedCategory || selectedSeverity" class="space-y-6 mb-8">
        <h2 v-if="selectedCategory || selectedSeverity"
          class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Publications {{ selectedCategory ? `- ${selectedCategory}` : '' }} {{ selectedSeverity ? `-
          ${selectedSeverity}` : '' }}
        </h2>
        <NuxtLink v-for="publication in paginatedPublications" :key="publication.id"
          :to="`/vigiforum/${publication.id}`" class="block">
          <PublicationCard :publication="publication" :show-actions="isAuthenticated" @report="handleReport" />
        </NuxtLink>
      </div>

      <!-- No Results with beautiful design -->
      <div v-if="(viewMode === 'all' || selectedCategory || selectedSeverity) && !paginatedPublications.length"
        class="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div
          class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          <svg class="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Aucune publication trouvée</p>
        <p class="text-gray-500 dark:text-gray-400">Essayez de modifier vos critères de recherche</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && (viewMode === 'all' || selectedCategory || selectedSeverity)"
        class="flex justify-center items-center gap-3">
        <button @click="currentPage--" :disabled="currentPage === 1"
          class="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all hover:scale-105">
          ← Précédent
        </button>
        <span class="text-gray-700 dark:text-gray-300 font-medium px-4 py-2 bg-white dark:bg-gray-800 rounded-xl">Page
          {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages"
          class="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all hover:scale-105">
          Suivant →
        </button>
      </div>

      <!-- Not Authenticated Message -->
      <div v-if="!isAuthenticated"
        class="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
        <div class="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p class="text-blue-800 dark:text-blue-200 text-lg font-semibold mb-4">
          Connectez-vous pour publier et commenter
        </p>
        <NuxtLink to="/auth/login"
          class="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
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
const isAuthenticated = ref(true)

// Modal state
const showPublicationModal = ref(false)

// View mode
const viewMode = ref<'categories' | 'severity' | 'all'>('categories')

// Search and filters
const searchQuery = ref('')
const filterCategory = ref('')
const filterSeverity = ref('')
const selectedCategory = ref('')
const selectedSeverity = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Category stats with icons
const categoryStats = computed(() => {
  const cats = [
    { name: 'Malware', icon: '🦠' },
    { name: 'Phishing', icon: '🎣' },
    { name: 'Vulnérabilité', icon: '🔓' },
    { name: 'DDoS', icon: '⚡' },
    { name: 'Ransomware', icon: '🔒' },
    { name: 'Data Breach', icon: '💾' }
  ]

  return cats.map(cat => ({
    ...cat,
    count: vigitechStore.publishedPublications.filter(p => p.category === cat.name).length
  }))
})

// Severity stats with styling
const severityStats = computed(() => {
  const severities = [
    {
      name: 'critique',
      label: 'Critique',
      icon: '🔴',
      textClass: 'text-red-600 dark:text-red-400',
      borderClass: 'hover:border-red-500',
      barClass: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      name: 'élevée',
      label: 'Élevée',
      icon: '🟠',
      textClass: 'text-orange-600 dark:text-orange-400',
      borderClass: 'hover:border-orange-500',
      barClass: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      name: 'moyenne',
      label: 'Moyenne',
      icon: '🟡',
      textClass: 'text-yellow-600 dark:text-yellow-400',
      borderClass: 'hover:border-yellow-500',
      barClass: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    },
    {
      name: 'faible',
      label: 'Faible',
      icon: '🟢',
      textClass: 'text-green-600 dark:text-green-400',
      borderClass: 'hover:border-green-500',
      barClass: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      name: 'info',
      label: 'Info',
      icon: '🔵',
      textClass: 'text-blue-600 dark:text-blue-400',
      borderClass: 'hover:border-blue-500',
      barClass: 'bg-gradient-to-r from-blue-500 to-blue-600'
    }
  ]

  return severities.map(sev => ({
    ...sev,
    count: vigitechStore.publishedPublications.filter(p => p.severity === sev.name).length
  }))
})

const totalPublications = computed(() => vigitechStore.publishedPublications.length)

// Computed filtered publications
const filteredPublications = computed(() => {
  let results = vigitechStore.publishedPublications

  if (searchQuery.value) {
    results = results.filter(p =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterCategory.value || selectedCategory.value) {
    const cat = filterCategory.value || selectedCategory.value
    results = results.filter(p => p.category === cat)
  }

  if (filterSeverity.value || selectedSeverity.value) {
    const sev = filterSeverity.value || selectedSeverity.value
    results = results.filter(p => p.severity === sev)
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
const selectFilter = (type: 'category' | 'severity', value: string) => {
  if (type === 'category') {
    selectedCategory.value = value
    filterCategory.value = value
    selectedSeverity.value = ''
    filterSeverity.value = ''
  } else {
    selectedSeverity.value = value
    filterSeverity.value = value
    selectedCategory.value = ''
    filterCategory.value = ''
  }
  viewMode.value = 'all'
  currentPage.value = 1
}

const clearFilter = (type: 'category' | 'severity') => {
  if (type === 'category') {
    selectedCategory.value = ''
    filterCategory.value = ''
  } else {
    selectedSeverity.value = ''
    filterSeverity.value = ''
  }
  currentPage.value = 1
}

const clearAllFilters = () => {
  selectedCategory.value = ''
  selectedSeverity.value = ''
  filterCategory.value = ''
  filterSeverity.value = ''
  searchQuery.value = ''
  currentPage.value = 1
}

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

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
