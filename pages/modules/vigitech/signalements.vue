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
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Signalements</h1>
        <p class="text-gray-600 dark:text-gray-400">Modérez les contenus signalés par la communauté</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">En attente</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ pendingCount }}</p>
            </div>
            <div class="bg-orange-100 dark:bg-orange-900 rounded-full p-3">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">Traités</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ resolvedCount }}</p>
            </div>
            <div class="bg-green-100 dark:bg-green-900 rounded-full p-3">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">Bloqués</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ blockedCount }}</p>
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

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type de contenu</label>
            <select v-model="filterType"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="">Tous</option>
              <option value="publication">Publication</option>
              <option value="comment">Commentaire</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statut</label>
            <select v-model="filterStatus"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="">Tous</option>
              <option value="pending">En attente</option>
              <option value="resolved">Résolu</option>
              <option value="blocked">Bloqué</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raison</label>
            <select v-model="filterReason"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
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

      <!-- Reports List -->
      <div class="space-y-4">
        <div v-for="report in filteredReports" :key="report.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="px-3 py-1 rounded-full text-xs font-medium" :class="typeClass(report.contentType)">
                  {{ report.contentType === 'publication' ? 'Publication' : 'Commentaire' }}
                </span>
                <span class="px-3 py-1 rounded-full text-xs font-medium" :class="statusClass(report.status)">
                  {{ statusLabel(report.status) }}
                </span>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {{ reasonLabel(report.reason) }}
                </span>
              </div>

              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ report.contentTitle }}
              </h3>

              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {{ report.contentPreview }}
              </p>

              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Auteur : {{ report.contentAuthor }}</span>
                <span>•</span>
                <span>Signalé par : {{ report.reportedBy }}</span>
                <span>•</span>
                <span>{{ formatDate(report.createdAt) }}</span>
                <span v-if="report.reportCount > 1" class="text-orange-600 dark:text-orange-400 font-medium">
                  ({{ report.reportCount }} signalements)
                </span>
              </div>

              <div v-if="report.reportDetails"
                class="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Détails :</span> {{ report.reportDetails }}
                </p>
              </div>
            </div>
          </div>

          <!-- Moderation Actions -->
          <div v-if="report.status === 'pending'"
            class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button @click="handleApprove(report.id)"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
              Approuver (Pas de problème)
            </button>
            <button @click="handleSuspend(report.id)"
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
              Suspendre temporairement
            </button>
            <button @click="handleBlock(report.id)"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
              Bloquer définitivement
            </button>
            <button @click="handleDelete(report.id)"
              class="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors">
              Supprimer
            </button>
            <button v-if="isSuperAdmin" @click="handleDeanonymize(report.id)"
              class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors">
              Désanonymiser
            </button>
            <NuxtLink
              :to="report.contentType === 'publication' ? `/vigiforum/${report.contentId}` : `/vigiforum/${report.publicationId}`"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              Voir le contenu
            </NuxtLink>
          </div>

          <!-- Already moderated -->
          <div v-else class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Traité par {{ report.moderatedBy }} le {{ formatDate(report.moderatedAt!) }}
              </span>
              <button v-if="report.status === 'blocked'" @click="handleUnblock(report.id)"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Débloquer
              </button>
            </div>
          </div>
        </div>

        <div v-if="!filteredReports.length"
          class="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Aucun signalement trouvé</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Mock super admin status
const isSuperAdmin = ref(true)

// Filters
const filterType = ref('')
const filterStatus = ref('')
const filterReason = ref('')

// Mock reports data
const reports = ref([
  {
    id: 'r1',
    contentType: 'publication' as const,
    contentId: '3',
    contentTitle: 'Ransomware LockBit 3.0 - Nouvelles variantes détectées',
    contentPreview: 'Les chercheurs en sécurité ont identifié de nouvelles versions du ransomware LockBit avec des capacités améliorées...',
    contentAuthor: 'CyberWatch',
    reportedBy: 'SecurityUser',
    reason: 'misinformation' as const,
    reportDetails: 'Les informations partagées semblent inexactes et pourraient induire en erreur la communauté.',
    reportCount: 3,
    status: 'pending' as const,
    createdAt: '2025-11-27T10:30:00Z',
    publicationId: '3'
  },
  {
    id: 'r2',
    contentType: 'comment' as const,
    contentId: 'c4',
    publicationId: '1',
    contentTitle: 'Commentaire sur "Nouvelle vulnérabilité critique dans Apache Log4j"',
    contentPreview: 'Cette vulnérabilité est un cauchemar pour les équipes de sécurité. Des milliers de serveurs exposés...',
    contentAuthor: 'SecOps',
    reportedBy: 'Utilisateur anonyme',
    reason: 'spam' as const,
    reportDetails: 'Commentaire répétitif et sans valeur ajoutée.',
    reportCount: 1,
    status: 'pending' as const,
    createdAt: '2025-11-27T14:15:00Z'
  },
  {
    id: 'r3',
    contentType: 'publication' as const,
    contentId: '7',
    contentTitle: 'Publicité pour des services de hacking',
    contentPreview: 'Services de pentesting à prix cassés ! Contactez-nous pour plus d\'informations...',
    contentAuthor: 'HackerPro',
    reportedBy: 'AdminSec',
    reason: 'spam' as const,
    reportDetails: 'Publication commerciale non autorisée.',
    reportCount: 5,
    status: 'blocked' as const,
    createdAt: '2025-11-26T09:00:00Z',
    moderatedBy: 'AdminPrincipal',
    moderatedAt: '2025-11-26T09:30:00Z',
    publicationId: '7'
  },
  {
    id: 'r4',
    contentType: 'comment' as const,
    contentId: 'c8',
    publicationId: '2',
    contentTitle: 'Commentaire sur "Campagne de phishing visant les institutions financières"',
    contentPreview: 'Tous les banquiers sont des voleurs de toute façon...',
    contentAuthor: 'Utilisateur anonyme',
    reportedBy: 'ModérateurForum',
    reason: 'inappropriate' as const,
    reportDetails: 'Commentaire hors sujet et inapproprié.',
    reportCount: 2,
    status: 'resolved' as const,
    createdAt: '2025-11-25T16:45:00Z',
    moderatedBy: 'AdminPrincipal',
    moderatedAt: '2025-11-25T17:00:00Z'
  }
])

const filteredReports = computed(() => {
  let results = reports.value

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

const pendingCount = computed(() => reports.value.filter(r => r.status === 'pending').length)
const resolvedCount = computed(() => reports.value.filter(r => r.status === 'resolved').length)
const blockedCount = computed(() => reports.value.filter(r => r.status === 'blocked').length)

const typeClass = (type: string) => {
  return type === 'publication'
    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
}

const statusClass = (status: string) => {
  const classes = {
    'pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    'resolved': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'blocked': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || classes.pending
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
    'spam': 'Spam',
    'harassment': 'Harcèlement',
    'inappropriate': 'Contenu inapproprié',
    'misinformation': 'Désinformation',
    'other': 'Autre'
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

const handleApprove = (id: string) => {
  console.log('Approve report:', id)
}

const handleSuspend = (id: string) => {
  if (confirm('Souhaitez-vous suspendre ce contenu temporairement ?')) {
    console.log('Suspend content:', id)
  }
}

const handleBlock = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir bloquer définitivement ce contenu ?')) {
    console.log('Block content:', id)
  }
}

const handleDelete = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce contenu ? Cette action est irréversible.')) {
    console.log('Delete content:', id)
  }
}

const handleDeanonymize = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir révéler l\'identité de l\'auteur ? Cette action doit être justifiée.')) {
    console.log('Deanonymize author:', id)
  }
}

const handleUnblock = (id: string) => {
  if (confirm('Souhaitez-vous débloquer ce contenu ?')) {
    console.log('Unblock content:', id)
  }
}

definePageMeta({
  layout: 'default'
})
</script>
