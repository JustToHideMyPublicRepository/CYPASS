<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <NuxtLink to="/vigiforum"
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour au forum
      </NuxtLink>

      <!-- Publication Not Found -->
      <div v-if="!publication" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
        <svg class="w-20 h-20 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Publication introuvable</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          La publication que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <NuxtLink to="/vigiforum"
          class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          Retour au forum
        </NuxtLink>
      </div>

      <!-- Publication Detail -->
      <div v-else>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <!-- Header -->
          <div class="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="severityClass">
                {{ publication.severity }}
              </span>
              <span
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                {{ publication.category }}
              </span>
              <span v-if="publication.status === 'reported'"
                class="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-full text-sm font-medium">
                Signalé
              </span>
              <span v-if="publication.status === 'blocked'"
                class="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-full text-sm font-medium">
                Bloqué
              </span>
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{{ publication.comments?.length || 0 }} commentaires</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="prose dark:prose-invert max-w-none mb-8">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {{ publication.content }}
            </p>
          </div>

          <!-- Actions -->
          <div v-if="isAuthenticated"
            class="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button @click="handleReport"
              class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Signaler
            </button>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Commentaires ({{ publication?.comments?.length || 0 }})
          </h2>

          <!-- Comment Form (Only for authenticated users) -->
          <div v-if="isAuthenticated" class="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <form @submit.prevent="handleAddComment">
              <textarea v-model="newComment.content" rows="4" placeholder="Votre commentaire..."
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 mb-4"></textarea>

              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input v-model="newComment.isAnonymous" type="checkbox"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  Commenter anonymement
                </label>

                <button type="submit"
                  class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Commenter
                </button>
              </div>
            </form>
          </div>

          <!-- Comments List -->
          <div v-if="publication?.comments && publication.comments.length > 0" class="space-y-4">
            <CommentCard v-for="comment in publication.comments" :key="comment.id" :comment="comment"
              :show-actions="isAuthenticated" @report="handleReportComment" />
          </div>

          <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Aucun commentaire pour le moment</p>
            <p v-if="!isAuthenticated" class="mt-2">
              <NuxtLink to="/auth/login" class="text-blue-600 hover:underline">
                Connectez-vous
              </NuxtLink>
              pour être le premier à commenter
            </p>
          </div>

          <!-- Not Authenticated Message -->
          <div v-if="!isAuthenticated"
            class="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
            <p class="text-blue-800 dark:text-blue-200 mb-2">
              Connectez-vous pour commenter
            </p>
            <NuxtLink to="/auth/login"
              class="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Se connecter
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useVigitechStore } from '~/stores/vigitech'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const vigitechStore = useVigitechStore()
const authStore = useAuthStore()

// Get publication ID from route
const publicationId = computed(() => route.params.id as string)

// Authentication state from store
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Get publication from store
const publication = computed(() => {
  const pub = vigitechStore.getPublicationById(publicationId.value)
  if (!pub) return null

  // Get comments for this publication
  const comments = vigitechStore.getCommentsByPublicationId(publicationId.value)

  return {
    ...pub,
    comments
  }
})

// New comment form
const newComment = ref({
  content: '',
  isAnonymous: false
})

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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleAddComment = () => {
  if (!newComment.value.content.trim() || !publication.value) return

  // Add comment to store
  vigitechStore.addComment({
    content: newComment.value.content,
    author: newComment.value.isAnonymous ? 'Utilisateur anonyme' : 'Utilisateur connecté',
    isAnonymous: newComment.value.isAnonymous,
    publicationId: publicationId.value,
    publicationTitle: publication.value.title
  })

  // Reset form
  newComment.value = {
    content: '',
    isAnonymous: false
  }
}

const handleReport = () => {
  if (!publication.value) return
  console.log('Reporting publication:', publicationId.value)
  // TODO: Implement report functionality with store
}

const handleReportComment = (commentId: string) => {
  console.log('Reporting comment:', commentId)
  // TODO: Implement report functionality with store
}

definePageMeta({
  layout: 'default'
})
</script>
