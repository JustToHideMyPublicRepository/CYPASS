<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <NuxtLink to="/modules/vigitech/publications"
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour à mes publications
      </NuxtLink>

      <!-- Publication Header -->
      <div v-if="publication" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
        <div class="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="severityClass">
                {{ publication.severity }}
              </span>
              <span
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                {{ publication.category }}
              </span>
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="statusClass">
                {{ statusLabel }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button @click="handleEdit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
              <button v-if="publication.status === 'blocked' || publication.status === 'suspended'"
                @click="handleUnblock"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
                Débloquer
              </button>
              <button @click="handleDelete"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            </div>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ publication.title }}
          </h1>

          <div class="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ publication.author }}</span>
              <span v-if="publication.isAnonymous" class="text-amber-600 dark:text-amber-400">(anonyme)</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ formatDate(publication.createdAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ publication.views }} vues</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="prose dark:prose-invert max-w-none mb-8">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ publication.content }}
          </p>
        </div>

        <!-- Moderation Info -->
        <div v-if="publication.moderationInfo"
          class="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <h3 class="font-semibold text-orange-900 dark:text-orange-200 mb-2">Informations de modération</h3>
          <p class="text-sm text-orange-800 dark:text-orange-300 mb-1">
            <span class="font-medium">Raison :</span> {{ publication.moderationInfo.reason }}
          </p>
          <p class="text-sm text-orange-800 dark:text-orange-300 mb-1">
            <span class="font-medium">Modéré par :</span> {{ publication.moderationInfo.moderatedBy }}
          </p>
          <p class="text-sm text-orange-800 dark:text-orange-300">
            <span class="font-medium">Date :</span> {{ formatDate(publication.moderationInfo.moderatedAt) }}
          </p>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ publication?.views || 0 }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Vues</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 dark:bg-green-900 rounded-full p-3">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ comments.length }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Commentaires</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-3">
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-3">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ publication?.reportCount || 0 }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Signalements</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 dark:bg-purple-900 rounded-full p-3">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ publication?.shares || 0 }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Partages</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Commentaires ({{ comments.length }})
        </h2>

        <div v-if="comments.length" class="space-y-4">
          <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment" :show-actions="false"
            :show-edit="true" :show-delete="true" @edit="handleEditComment" @delete="handleDeleteComment" />
        </div>

        <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>Aucun commentaire pour le moment</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVigitechStore } from '~/stores/vigitech'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const vigitechStore = useVigitechStore()
const authStore = useAuthStore()

// Get publication ID from route
const publicationId = computed(() => route.params.id as string)

// Get publication from store
const publication = computed(() => vigitechStore.getPublicationById(publicationId.value))

// Get comments from store for this publication
const comments = computed(() => vigitechStore.getCommentsByPublicationId(publicationId.value))

const severityClass = computed(() => {
  if (!publication.value) return ''

  const classes = {
    'critique': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    'élevée': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    'moyenne': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'faible': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'info': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  }
  return classes[publication.value.severity] || classes.info
})

const statusClass = computed(() => {
  if (!publication.value) return ''

  const classes = {
    'published': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'reported': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    'blocked': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    'suspended': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  }
  return classes[publication.value.status] || classes.published
})

const statusLabel = computed(() => {
  if (!publication.value) return ''

  const labels = {
    'published': 'Publié',
    'reported': 'Signalé',
    'blocked': 'Bloqué',
    'suspended': 'Suspendu'
  }
  return labels[publication.value.status] || publication.value.status
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleEdit = () => {
  console.log('Edit publication:', publicationId.value)
  // TODO: Navigate to edit page or open edit modal
}

const handleDelete = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette publication ? Cette action est irréversible.')) {
    vigitechStore.deletePublication(publicationId.value)
    router.push('/modules/vigitech/publications')
  }
}

const handleUnblock = () => {
  if (!publication.value) return

  if (confirm('Souhaitez-vous débloquer cette publication ?')) {
    vigitechStore.updatePublicationStatus(publicationId.value, 'published')
  }
}

const handleEditComment = (commentId: string) => {
  console.log('Edit comment:', commentId)
  // TODO: Implement comment editing
}

const handleDeleteComment = (commentId: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    vigitechStore.deleteComment(commentId)
  }
}

definePageMeta({
  layout: 'default'
})
</script>
