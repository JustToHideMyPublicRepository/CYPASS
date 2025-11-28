<template>
  <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="font-medium text-gray-900 dark:text-white text-sm">
          {{ comment.author }}
        </span>
        <span v-if="comment.isAnonymous" class="text-xs text-amber-600 dark:text-amber-400">(anonyme)</span>
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(comment.createdAt) }}</span>
      </div>

      <div class="flex items-center gap-2">
        <button v-if="showActions" @click="$emit('report', comment.id)"
          class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          Signaler
        </button>

        <button v-if="showEdit" @click="$emit('edit', comment.id)"
          class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs">
          Modifier
        </button>

        <button v-if="showDelete" @click="$emit('delete', comment.id)"
          class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs">
          Supprimer
        </button>

        <span v-if="comment.status === 'reported'"
          class="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded text-xs font-medium">
          Signalé
        </span>
        <span v-if="comment.status === 'blocked'"
          class="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded text-xs font-medium">
          Bloqué
        </span>
      </div>
    </div>

    <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
      {{ comment.content }}
    </p>

    <div v-if="comment.publicationTitle" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Sur : <span class="font-medium">{{ comment.publicationTitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Comment {
  id: string
  content: string
  author: string
  isAnonymous: boolean
  createdAt: string
  publicationTitle?: string
  status?: 'published' | 'reported' | 'blocked'
}

interface Props {
  comment: Comment
  showActions?: boolean
  showEdit?: boolean
  showDelete?: boolean
}

withDefaults(defineProps<Props>(), {
  showActions: true,
  showEdit: false,
  showDelete: false
})

defineEmits<{
  report: [id: string]
  edit: [id: string]
  delete: [id: string]
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
