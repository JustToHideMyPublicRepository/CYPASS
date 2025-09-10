<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
          <p class="mt-1 text-sm text-gray-500">Bienvenue {{ user?.name }}</p>
        </div>
        <div class="hidden sm:flex items-center space-x-3">
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            <span class="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
            En ligne
          </span>
          <span class="text-sm text-gray-500">
            Dernière connexion: {{ formatDateTime(new Date()) }}
          </span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div v-for="(stat, index) in stats" :key="index" class="bg-white overflow-hidden shadow-sm rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 rounded-lg" :class="stat.bgColor">
                <component :is="stat.icon" class="h-6 w-6" :class="stat.textColor" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.title }}</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ stat.value }}</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <IconArrowUp class="h-5 w-5 text-green-500" />
                      <span class="sr-only">{{ stat.trendLabel }}</span>
                      {{ stat.trend }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 px-5 py-3">
            <div class="text-sm">
              <NuxtLink :to="stat.link" class="font-medium" :class="stat.linkColor">
                {{ stat.linkText }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Modules -->
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-8">
        <NuxtLink v-for="(module, index) in modules" :key="index" :to="module.link" class="group">
          <div
            class="h-full bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
            <div class="flex items-center mb-4">
              <div class="p-3 rounded-lg" :class="module.bgColor">
                <component :is="module.icon" class="h-6 w-6" :class="module.textColor" />
              </div>
              <h3 class="ml-3 text-lg font-medium text-gray-900 transition-colors" :class="module.hoverColor">{{
                module.title }}</h3>
            </div>
            <p class="text-gray-600 mb-4">{{ module.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium transition-colors" :class="module.textColor">
                {{ module.status }}
              </span>
              <IconChevronRight class="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform"
                :class="module.textColor" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Activités récentes -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-900">Activités récentes</h2>
            <NuxtLink to="/dashboard/activities" class="text-sm font-medium text-primary-600 hover:text-primary-700">
              Voir toutes les activités
            </NuxtLink>
          </div>
          <div class="flow-root">
            <ul class="-my-5 divide-y divide-gray-200">
              <DashboardItem v-for="(activity, index) in recentActivities" :key="index" :activity="activity"
                :formatDate="formatDate" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useDocumentsStore } from '~/stores/documents';
import { useScansStore } from '~/stores/scans';
import DashboardItem from '~/components/activities/DashboardItem.vue';
import { IconFileCertificate, IconShieldSearch, IconClock, IconShieldCheck, IconChevronRight, IconArrowUp, IconFileCheck, IconAlertCircle, IconEyeCheck, IconCircleDashedPercentage } from '@tabler/icons-vue';

const authStore = useAuthStore();
const documentsStore = useDocumentsStore();
const scansStore = useScansStore();

const user = computed(() => authStore.user);
const documents = computed(() => documentsStore.getUserDocuments(user.value?.id || 0));
const scans = computed(() => scansStore.getUserScans(user.value?.id || 0));

const averageSecurityScore = computed(() => {
  if (scans.value.length === 0) return 0;
  const total = scans.value.reduce((sum, scan) => sum + scan.score, 0);
  return Math.round(total / scans.value.length);
});

// Statistiques
const stats = [
  {
    icon: IconFileCheck,
    title: 'Documents authentifiés',
    value: documentsStore.getUserDocuments(authStore.user?.id || 0).length, // ou documents.value.length
    trend: '12%',
    trendLabel: 'Augmentation de',
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-600',
    link: '/modules/docsentry',
    linkText: 'Voir tous les documents',
    linkColor: 'text-primary-700 hover:text-primary-900'
  },
  {
    icon: IconShieldCheck,
    title: 'Sites audités',
    value: scansStore.getUserScans(authStore.user?.id || 0).length, // ou scans.value.length
    trend: '8%',
    trendLabel: 'Augmentation de',
    bgColor: 'bg-secondary-100',
    textColor: 'text-secondary-600',
    link: '/modules/secuscan',
    linkText: 'Voir tous les audits',
    linkColor: 'text-secondary-700 hover:text-secondary-900'
  },
  {
    icon: IconClock,
    title: 'Temps de réponse moyen',
    value: '320ms',
    trend: '15%',
    trendLabel: 'Amélioration de',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    link: '/dashboard/performance',
    linkText: 'Voir les performances',
    linkColor: 'text-yellow-700 hover:text-yellow-900'
  },
  {
    icon: IconCircleDashedPercentage,
    title: 'Score de sécurité',
    value: `${averageSecurityScore.value}%`,
    trend: '5%',
    trendLabel: 'Augmentation de',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    link: '/dashboard/security-report',
    linkText: 'Voir le rapport complet',
    linkColor: 'text-green-700 hover:text-green-900'
  }
];

// Modules
const modules = [
  {
    icon: IconFileCheck,
    title: 'DocSentry',
    description: 'Authentification de documents sensibles avec génération de QR code et certificats vérifiables.',
    status: `${documentsStore.getUserDocuments(authStore.user?.id || 0).length} documents`, // ou `${documents.value.length} documents`,
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-600',
    hoverColor: 'group-hover:text-primary-700',
    link: '/modules/docsentry'
  },
  {
    icon: IconShieldCheck,
    title: 'SecuScan',
    description: 'Audit automatisé de sites web avec analyse des vulnérabilités et recommandations de sécurité.',
    status: `${scansStore.getUserScans(authStore.user?.id || 0).length} audits`, // ou `${scans.value.length} audits`,
    bgColor: 'bg-secondary-100',
    textColor: 'text-secondary-600',
    hoverColor: 'group-hover:text-secondary-700',
    link: '/modules/secuscan'
  },
  {
    icon: IconAlertCircle,
    title: 'LeakMonitor',
    description: 'Surveillance des fuites de données et détection des informations sensibles exposées.',
    status: 'Bientôt disponible',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    hoverColor: 'group-hover:text-gray-700',
    link: '/modules/leakmonitor'
  },
  {
    icon: IconEyeCheck,
    title: 'VigiTech',
    description: 'Surveillance proactive des menaces et détection des activités suspectes dans vos systèmes.',
    status: 'Bientôt disponible',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    hoverColor: 'group-hover:text-gray-700',
    link: '/modules/vigitech'
  }
];

// Activity feed
const recentActivities = computed(() => {
  const docActivities = documents.value.map(doc => ({
    type: 'document',
    title: `Document authentifié : ${doc.filename}`,
    description: `Hash: ${doc.hash.substring(0, 12)}...`,
    date: new Date(doc.createdAt),
    bg: 'bg-primary-100',
    icon: IconFileCertificate,
    linkTo: '/modules/docsentry',
  }));
  const scanActivities = scans.value.map(scan => ({
    type: 'scan',
    title: `Audit de sécurité : ${scan.url}`,
    description: `Score: ${scan.score}/100, ${scan.vulnerabilities.length} vulnérabilités détectées`,
    date: new Date(scan.createdAt),
    bg: 'bg-secondary-100',
    icon: IconShieldSearch,
    linkTo: '/modules/secuscan',
  }));
  return [...docActivities, ...scanActivities]
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);
});

// Formatage des dates
const formatDate = date => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date);
const formatDateTime = date => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
</script>
