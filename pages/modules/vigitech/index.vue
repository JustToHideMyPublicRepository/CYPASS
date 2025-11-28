<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">VigiTech Admin</h1>
        <p class="text-gray-600 dark:text-gray-400">Tableau de bord de gestion</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">Publications</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.publications }}</p>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">Commentaires</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.comments }}</p>
            </div>
            <div class="bg-green-100 dark:bg-green-900 rounded-full p-3">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">Signalements</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.reports }}</p>
            </div>
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-3">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">Bloqués</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.blocked }}</p>
            </div>
            <div class="bg-red-100 dark:bg-red-900 rounded-full p-3">
              <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <NuxtLink to="/modules/vigitech/publications"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Mes Publications</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Gérer vos publications</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/modules/vigitech/commentaires"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Mes Commentaires</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Gérer vos commentaires</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink v-if="isAdmin" to="/modules/vigitech/signalements"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Signalements</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Modérer les contenus</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Activité récente</h2>

        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id"
            class="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="activityIconClass(activity.type)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="activityIcon(activity.type)" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-gray-900 dark:text-white font-medium">{{ activity.title }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ formatDate(activity.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mock user role
const isAdmin = ref(true)

// Mock stats
const stats = ref({
  publications: 12,
  comments: 45,
  reports: 8,
  blocked: 3
})

// Mock recent activities
const recentActivities = ref([
  {
    id: '1',
    type: 'publication',
    title: 'Nouvelle publication créée',
    description: 'Vulnérabilité critique dans Apache Log4j',
    createdAt: '2025-11-28T10:30:00Z'
  },
  {
    id: '2',
    type: 'comment',
    title: 'Nouveau commentaire',
    description: 'Sur "Campagne de phishing visant les institutions financières"',
    createdAt: '2025-11-28T09:15:00Z'
  },
  {
    id: '3',
    type: 'report',
    title: 'Nouveau signalement',
    description: 'Publication signalée par un utilisateur',
    createdAt: '2025-11-27T16:45:00Z'
  },
  {
    id: '4',
    type: 'block',
    title: 'Contenu bloqué',
    description: 'Publication "Spam commercial" bloquée',
    createdAt: '2025-11-27T14:20:00Z'
  }
])

const activityIcon = (type: string) => {
  const icons = {
    publication: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    comment: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    report: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    block: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
  }
  return icons[type as keyof typeof icons] || icons.publication
}

const activityIconClass = (type: string) => {
  const classes = {
    publication: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    comment: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    report: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    block: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
  }
  return classes[type as keyof typeof classes] || classes.publication
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

definePageMeta({
  layout: 'default'
})
</script>
