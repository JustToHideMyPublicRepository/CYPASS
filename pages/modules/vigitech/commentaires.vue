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
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mes Commentaires</h1>
        <p class="text-gray-600 dark:text-gray-400">Gérez vos commentaires sur VigiTech</p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recherche</label>
            <input v-model="searchQuery" type="text" placeholder="Rechercher dans vos commentaires..."
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
            </select>
          </div>
        </div>
      </div>

      <!-- Comments Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commentaire
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Publication
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
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
              <tr v-for="comment in filteredComments" :key="comment.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="px-6 py-4">
                  <div class="max-w-md">
                    <p class="text-sm text-gray-900 dark:text-white line-clamp-2">{{ comment.content }}</p>
                    <div v-if="comment.isAnonymous" class="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      Commentaire anonyme
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <NuxtLink :to="`/vigiforum/${comment.publicationId}`"
                    class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    {{ comment.publicationTitle }}
                  </NuxtLink>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="statusClass(comment.status)">
                    {{ statusLabel(comment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(comment.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink :to="`/vigiforum/${comment.publicationId}`"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Voir la publication">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </NuxtLink>
                    <button @click="handleEdit(comment.id)"
                      class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      title="Modifier">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="handleDelete(comment.id)"
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

        <div v-if="!filteredComments.length" class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>Aucun commentaire trouvé</p>
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

// Mock comments
const comments = ref([
  {
    id: 'c1',
    content: 'Excellente analyse. Nous avons détecté plusieurs tentatives d\'exploitation sur nos serveurs. La mise à jour est effectivement critique.',
    publicationId: '1',
    publicationTitle: 'Nouvelle vulnérabilité critique dans Apache Log4j',
    status: 'published' as const,
    isAnonymous: false,
    createdAt: '2025-11-20T11:45:00Z'
  },
  {
    id: 'c2',
    content: 'Merci pour le partage. Quelqu\'un a-t-il des IOCs (Indicators of Compromise) à partager pour la détection ?',
    publicationId: '1',
    publicationTitle: 'Nouvelle vulnérabilité critique dans Apache Log4j',
    status: 'published' as const,
    isAnonymous: true,
    createdAt: '2025-11-20T13:20:00Z'
  },
  {
    id: 'c3',
    content: 'Cette campagne est particulièrement sophistiquée. Nous avons observé des techniques d\'ingénierie sociale très avancées.',
    publicationId: '2',
    publicationTitle: 'Campagne de phishing visant les institutions financières',
    status: 'reported' as const,
    isAnonymous: false,
    createdAt: '2025-11-21T15:30:00Z'
  },
  {
    id: 'c4',
    content: 'Les nouvelles variantes de LockBit sont effectivement préoccupantes. Notre équipe a observé une évolution rapide des techniques.',
    publicationId: '3',
    publicationTitle: 'Ransomware LockBit 3.0 - Nouvelles variantes détectées',
    status: 'blocked' as const,
    isAnonymous: false,
    createdAt: '2025-11-22T10:00:00Z'
  },
  {
    id: 'c5',
    content: 'Nous avons développé un script de détection qui pourrait être utile à la communauté.',
    publicationId: '4',
    publicationTitle: 'Attaque DDoS massive contre des services cloud',
    status: 'published' as const,
    isAnonymous: false,
    createdAt: '2025-11-23T17:15:00Z'
  }
])

const filteredComments = computed(() => {
  let results = comments.value

  if (searchQuery.value) {
    results = results.filter(c =>
      c.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.publicationTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterStatus.value) {
    results = results.filter(c => c.status === filterStatus.value)
  }

  return results
})

const statusClass = (status: string) => {
  const classes = {
    'published': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'reported': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'blocked': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status as keyof typeof classes] || classes.published
}

const statusLabel = (status: string) => {
  const labels = {
    'published': 'Publié',
    'reported': 'Signalé',
    'blocked': 'Bloqué'
  }
  return labels[status as keyof typeof labels] || status
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleEdit = (id: string) => {
  console.log('Edit comment:', id)
}

const handleDelete = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    console.log('Delete comment:', id)
  }
}

definePageMeta({
  layout: 'default'
})
</script>
