<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow p-6">
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <span 
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="severityClass"
          >
            {{ publication.severity }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ publication.category }}
          </span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
          {{ publication.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {{ publication.excerpt }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between text-sm">
      <div class="flex items-center gap-4 text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{{ publication.author }}</span>
          <span v-if="publication.isAnonymous" class="text-xs text-amber-600 dark:text-amber-400">(anonyme)</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{{ publication.commentsCount }}</span>
        </div>
        <span>{{ formatDate(publication.createdAt) }}</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="showActions"
          @click="$emit('report', publication.id)"
          class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          Signaler
        </button>
        
        <span 
          v-if="publication.status === 'reported'"
          class="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded text-xs font-medium"
        >
          Signalé
        </span>
        <span 
          v-if="publication.status === 'blocked'"
          class="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded text-xs font-medium"
        >
          Bloqué
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Publication {
  id: string
  title: string
  excerpt: string
  author: string
  isAnonymous: boolean
  category: string
  severity: 'critique' | 'élevée' | 'moyenne' | 'faible' | 'info'
  commentsCount: number
  createdAt: string
  status?: 'published' | 'reported' | 'blocked'
}

interface Props {
  publication: Publication
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true
})

defineEmits<{
  report: [id: string]
}>()

const severityClass = computed(() => {
  const classes = {
    'critique': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    'élevée': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    'moyenne': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'faible': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'info': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  }
  return classes[props.publication.severity] || classes.info
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
