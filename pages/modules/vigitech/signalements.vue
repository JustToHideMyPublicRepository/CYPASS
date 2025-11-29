<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/modules/vigitech"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-all hover:gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au tableau de bord
        </NuxtLink>
        <div class="flex items-center gap-3 mb-2">
          <div class="bg-blue-600 dark:bg-blue-500 rounded-lg p-3">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Mes Signalements</h1>
            <p class="text-gray-600 dark:text-gray-400">Consultez l'état de vos signalements</p>
          </div>
        </div>
      </div>

      <!-- Stats Cards with modern design -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-600 dark:text-orange-400 text-sm font-medium mb-1 uppercase tracking-wide">En
                attente</p>
              <p class="text-4xl font-bold text-gray-900 dark:text-white">{{ pendingCount }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">En cours d'examen</p>
            </div>
            <div
              class="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-2xl p-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-600 dark:text-green-400 text-sm font-medium mb-1 uppercase tracking-wide">Traités</p>
              <p class="text-4xl font-bold text-gray-900 dark:text-white">{{ resolvedCount }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Action prise</p>
            </div>
            <div
              class="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl p-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-600 dark:text-red-400 text-sm font-medium mb-1 uppercase tracking-wide">Bloqués</p>
              <p class="text-4xl font-bold text-gray-900 dark:text-white">{{ blockedCount }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Contenu supprimé</p>
            </div>
            <div
              class="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-2xl p-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters with modern styling -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type de contenu</label>
            <select v-model="filterType"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Tous</option>
              <option value="publication">Publication</option>
              <option value="comment">Commentaire</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statut</label>
            <select v-model="filterStatus"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Tous</option>
              <option value="pending">En attente</option>
              <option value="resolved">Résolu</option>
              <option value="blocked">Bloqué</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raison</label>
            <select v-model="filterReason"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Toutes</option>
              <option value="spam">Spam</option>
              <option value="harassment">Harcèlement</option>
              <option value="inappropriate">Contenu inapproprié</option>
              <option value="misinformation">Désinformation</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reports List with modern card design -->
      <div class="space-y-6">
        <div v-for="report in filteredReports" :key="report.id"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <!-- Badges with modern styling -->
              <div class="flex items-center gap-3 mb-3 flex-wrap">
                <span class="px-4 py-1.5 rounded-full text-xs font-semibold" :class="typeClass(report.contentType)">
                  {{ report.contentType === 'publication' ? '📄 Publication' : '💬 Commentaire' }}
                </span>
                <span class="px-4 py-1.5 rounded-full text-xs font-semibold" :class="statusClass(report.status)">
                  {{ statusIcon(report.status) }} {{ statusLabel(report.status) }}
                </span>
                <span
                  class="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300">
                  {{ reasonLabel(report.reason) }}
                </span>
              </div>

              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {{ report.contentTitle }}
              </h3>

              <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                {{ report.contentPreview }}
              </p>

              <!-- Meta info with icons -->
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ report.contentAuthor }}
                </span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ formatDate(report.createdAt) }}
                </span>
                <span v-if="report.reportCount > 1"
                  class="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-semibold">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {{ report.reportCount }} signalements
                </span>
              </div>

              <!-- Report Details -->
              <div v-if="report.reportDetails"
                class="mt-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-semibold text-blue-700 dark:text-blue-400">💬 Détails :</span> {{
                    report.reportDetails }}
                </p>
              </div>

              <!-- Status Info -->
              <div v-if="report.status !== 'pending'" class="mt-4 p-4 rounded-xl border"
                :class="report.status === 'blocked' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5"
                    :class="report.status === 'blocked' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      :d="report.status === 'blocked' ? 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'" />
                  </svg>
                  <span class="text-sm font-semibold"
                    :class="report.status === 'blocked' ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'">
                    {{ report.status === 'blocked' ? 'Contenu bloqué' : 'Signalement traité' }}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    par {{ report.moderatedBy }} le {{ formatDate(report.moderatedAt!) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <NuxtLink
              :to="report.contentType === 'publication' ? `/vigiforum/${report.contentId}` : `/vigiforum/${report.publicationId}`"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Voir le contenu
            </NuxtLink>
          </div>
        </div>

        <!-- Empty State with modern design -->
        <div v-if="!filteredReports.length"
          class="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div
            class="bg-gray-100 dark:bg-gray-700 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Aucun signalement trouvé</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Essayez de modifier vos filtres</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVigitechStore } from '~/stores/vigitech'

const vigitechStore = useVigitechStore()

// Filters
const filterType = ref('')
const filterStatus = ref('')
const filterReason = ref('')

// Get reports from store (filtered by current user)
const userReports = computed(() => vigitechStore.reports)

const filteredReports = computed(() => {
  let results = userReports.value

  if (filterType.value) {
    results = results.filter(r => r.contentType === filterType.value)
  }

  if (filterStatus.value) {
    results = results.filter(r => r.status === filterStatus.value)
  }

  if (filterReason.value) {
    results = results.filter(r => r.reason === filterReason.value)
  }

  return results
})

const pendingCount = computed(() => userReports.value.filter(r => r.status === 'pending').length)
const resolvedCount = computed(() => userReports.value.filter(r => r.status === 'resolved').length)
const blockedCount = computed(() => userReports.value.filter(r => r.status === 'blocked').length)

const typeClass = (type: string) => {
  return type === 'publication'
    ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 dark:from-blue-900 dark:to-blue-800 dark:text-blue-300'
    : 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 dark:from-green-900 dark:to-green-800 dark:text-green-300'
}

const statusClass = (status: string) => {
  const classes = {
    'pending': 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 dark:from-orange-900 dark:to-orange-800 dark:text-orange-300',
    'resolved': 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 dark:from-green-900 dark:to-green-800 dark:text-green-300',
    'blocked': 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 dark:from-red-900 dark:to-red-800 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || classes.pending
}

const statusIcon = (status: string) => {
  const icons = {
    'pending': '⏳',
    'resolved': '✅',
    'blocked': '🚫'
  }
  return icons[status as keyof typeof icons] || '⏳'
}

const statusLabel = (status: string) => {
  const labels = {
    'pending': 'En attente',
    'resolved': 'Résolu',
    'blocked': 'Bloqué'
  }
  return labels[status as keyof typeof labels] || status
}

const reasonLabel = (reason: string) => {
  const labels = {
    'spam': '🚫 Spam',
    'harassment': '⚠️ Harcèlement',
    'inappropriate': '🔞 Contenu inapproprié',
    'misinformation': '❌ Désinformation',
    'other': '📝 Autre'
  }
  return labels[reason as keyof typeof labels] || reason
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
