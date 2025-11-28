<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/modules/vigitech"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au tableau de bord
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mes Publications</h1>
        <p class="text-gray-600 dark:text-gray-400">Gérez vos publications sur VigiTech</p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recherche</label>
            <input v-model="searchQuery" type="text" placeholder="Rechercher..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statut</label>
            <select v-model="filterStatus"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="">Tous</option>
              <option value="published">Publié</option>
              <option value="reported">Signalé</option>
              <option value="blocked">Bloqué</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
            <select v-model="filterCategory"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="">Toutes</option>
              <option value="Malware">Malware</option>
              <option value="Phishing">Phishing</option>
              <option value="Vulnérabilité">Vulnérabilité</option>
              <option value="Ransomware">Ransomware</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Publications Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Titre
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sévérité
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commentaires
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="publication in filteredPublications" :key="publication.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div>
                      <NuxtLink :to="`/modules/vigitech/publication-${publication.id}`"
                        class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                        {{ publication.title }}
                      </NuxtLink>
                      <div v-if="publication.isAnonymous" class="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Publication anonyme
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900 dark:text-white">{{ publication.category }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="severityClass(publication.severity)">
                    {{ publication.severity }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="statusClass(publication.status)">
                    {{ statusLabel(publication.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ publication.commentsCount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(publication.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink :to="`/vigiforum/${publication.id}`"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Voir">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </NuxtLink>
                    <button @click="handleEdit(publication.id)"
                      class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      title="Modifier">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="handleDelete(publication.id)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Supprimer">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!filteredPublications.length" class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Aucune publication trouvée</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Filters
const searchQuery = ref('')
const filterStatus = ref('')
const filterCategory = ref('')

// Mock publications
const publications = ref([
  {
    id: '1',
    title: 'Nouvelle vulnérabilité critique dans Apache Log4j',
    category: 'Vulnérabilité',
    severity: 'critique' as const,
    status: 'published' as const,
    commentsCount: 24,
    isAnonymous: false,
    createdAt: '2025-11-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'Campagne de phishing sophistiquée',
    category: 'Phishing',
    severity: 'élevée' as const,
    status: 'reported' as const,
    commentsCount: 12,
    isAnonymous: true,
    createdAt: '2025-11-21T14:20:00Z'
  },
  {
    id: '3',
    title: 'Ransomware LockBit - Analyse des nouvelles variantes',
    category: 'Ransomware',
    severity: 'critique' as const,
    status: 'suspended' as const,
    commentsCount: 31,
    isAnonymous: false,
    createdAt: '2025-11-22T09:15:00Z'
  },
  {
    id: '4',
    title: 'Attaque DDoS - Retour d\'expérience',
    category: 'DDoS',
    severity: 'moyenne' as const,
    status: 'blocked' as const,
    commentsCount: 8,
    isAnonymous: false,
    createdAt: '2025-11-23T11:00:00Z'
  }
])

const filteredPublications = computed(() => {
  let results = publications.value

  if (searchQuery.value) {
    results = results.filter(p =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterStatus.value) {
    results = results.filter(p => p.status === filterStatus.value)
  }

  if (filterCategory.value) {
    results = results.filter(p => p.category === filterCategory.value)
  }

  return results
})

const severityClass = (severity: string) => {
  const classes = {
    'critique': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'élevée': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'moyenne': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'faible': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'info': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
  return classes[severity as keyof typeof classes] || classes.info
}

const statusClass = (status: string) => {
  const classes = {
    'published': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'reported': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'blocked': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'suspended': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
  return classes[status as keyof typeof classes] || classes.published
}

const statusLabel = (status: string) => {
  const labels = {
    'published': 'Publié',
    'reported': 'Signalé',
    'blocked': 'Bloqué',
    'suspended': 'Suspendu'
  }
  return labels[status as keyof typeof labels] || status
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleEdit = (id: string) => {
  console.log('Edit publication:', id)
}

const handleDelete = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
    console.log('Delete publication:', id)
  }
}

definePageMeta({
  layout: 'default'
})
</script>
