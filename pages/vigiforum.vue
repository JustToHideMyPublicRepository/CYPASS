<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-2">VigiTech Forum</h1>
        <p class="text-blue-100">Partagez et découvrez les dernières informations en cybersécurité</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Publication Form (Only for authenticated users) -->
      <div v-if="isAuthenticated" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Nouvelle publication</h2>
        <form @submit.prevent="handlePublish">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre</label>
            <input v-model="newPublication.title" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Titre de votre publication..." />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contenu</label>
            <textarea v-model="newPublication.content" rows="4"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez votre découverte, alerte ou question..."></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
              <select v-model="newPublication.category"
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
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Niveau de sévérité</label>
              <select v-model="newPublication.severity"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <option value="critique">Critique</option>
                <option value="élevée">Élevée</option>
                <option value="moyenne">Moyenne</option>
                <option value="faible">Faible</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input v-model="newPublication.isAnonymous" type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              Publier anonymement
            </label>

            <button type="submit"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Publier
            </button>
          </div>
        </form>
      </div>

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
        <NuxtLink v-for="publication in filteredPublications" :key="publication.id" :to="`/vigiforum/${publication.id}`"
          class="block">
          <PublicationCard :publication="publication" :show-actions="isAuthenticated" @report="handleReport" />
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Mock authentication state
const isAuthenticated = ref(true) // Change to false to test unauthenticated view

// New publication form
const newPublication = ref({
  title: '',
  content: '',
  category: 'Vulnérabilité',
  severity: 'moyenne' as 'critique' | 'élevée' | 'moyenne' | 'faible' | 'info',
  isAnonymous: false
})

// Search and filters
const searchQuery = ref('')
const filterCategory = ref('')
const filterSeverity = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Mock publications data
const mockPublications = ref([
  {
    id: '1',
    title: 'Nouvelle vulnérabilité critique dans Apache Log4j',
    excerpt: 'Une faille de sécurité majeure permettant l\'exécution de code à distance a été découverte dans Apache Log4j...',
    author: 'SecExpert',
    isAnonymous: false,
    category: 'Vulnérabilité',
    severity: 'critique' as const,
    commentsCount: 24,
    createdAt: '2025-11-20T10:30:00Z',
    status: 'published' as const
  },
  {
    id: '2',
    title: 'Campagne de phishing visant les institutions financières',
    excerpt: 'Plusieurs banques ont signalé une augmentation des tentatives de phishing sophistiquées...',
    author: 'Utilisateur anonyme',
    isAnonymous: true,
    category: 'Phishing',
    severity: 'élevée' as const,
    commentsCount: 12,
    createdAt: '2025-11-21T14:20:00Z',
    status: 'published' as const
  },
  {
    id: '3',
    title: 'Ransomware LockBit 3.0 - Nouvelles variantes détectées',
    excerpt: 'Les chercheurs en sécurité ont identifié de nouvelles versions du ransomware LockBit avec des capacités améliorées...',
    author: 'CyberWatch',
    isAnonymous: false,
    category: 'Ransomware',
    severity: 'critique' as const,
    commentsCount: 31,
    createdAt: '2025-11-22T09:15:00Z',
    status: 'reported' as const
  },
  {
    id: '4',
    title: 'Attaque DDoS massive contre des services cloud',
    excerpt: 'Une attaque DDoS de grande envergure a perturbé plusieurs fournisseurs de services cloud majeurs...',
    author: 'Utilisateur anonyme',
    isAnonymous: true,
    category: 'DDoS',
    severity: 'élevée' as const,
    commentsCount: 18,
    createdAt: '2025-11-23T16:45:00Z',
    status: 'published' as const
  },
  {
    id: '5',
    title: 'Data breach chez un géant du e-commerce',
    excerpt: 'Des données personnelles de millions d\'utilisateurs auraient été exposées suite à une brèche de sécurité...',
    author: 'InfoSecNews',
    isAnonymous: false,
    category: 'Data Breach',
    severity: 'critique' as const,
    commentsCount: 45,
    createdAt: '2025-11-24T11:30:00Z',
    status: 'published' as const
  },
  {
    id: '6',
    title: 'Nouveau malware ciblant les appareils IoT',
    excerpt: 'Un nouveau malware spécialisé dans l\'exploitation des vulnérabilités IoT a été découvert...',
    author: 'IoTSecure',
    isAnonymous: false,
    category: 'Malware',
    severity: 'moyenne' as const,
    commentsCount: 9,
    createdAt: '2025-11-25T08:20:00Z',
    status: 'published' as const
  }
])

// Computed filtered publications
const filteredPublications = computed(() => {
  let results = mockPublications.value

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

const totalPages = computed(() => Math.ceil(filteredPublications.value.length / itemsPerPage))

// Handlers
const handlePublish = () => {
  console.log('Publishing:', newPublication.value)
  // Reset form
  newPublication.value = {
    title: '',
    content: '',
    category: 'Vulnérabilité',
    severity: 'moyenne',
    isAnonymous: false
  }
}

const handleReport = (id: string) => {
  console.log('Reporting publication:', id)
}

definePageMeta({
  layout: 'default'
})
</script>
