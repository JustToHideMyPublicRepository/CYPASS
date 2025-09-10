<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Activités</h1>
          <p class="mt-1 text-sm text-gray-600">Historique de toutes vos activités</p>
        </div>

        <!-- Filtres -->
        <div class="mt-4 md:mt-0 flex space-x-3">
          <select v-model="selectedType" class="input">
            <option value="">Tous les types</option>
            <option value="document">Documents</option>
            <option value="scan">Audits</option>
          </select>

          <select v-model="selectedPeriod" class="input">
            <option value="all">Toute la période</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>

          <button @click="router.go(-1)" class="btn btn-outline gap-2 flex items-center">
            <IconArrowLeft class="w-5 h-5" />
            Retour
          </button>
        </div>
      </div>

      <div class="mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
        <!-- En-tête avec stats -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Total activités</p>
              <p class="mt-1 text-2xl font-semibold text-gray-900">{{ filteredActivities.length }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Documents</p>
              <p class="mt-1 text-2xl font-semibold text-primary-600">
                {{ activityCounts.documents }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Audits</p>
              <p class="mt-1 text-2xl font-semibold text-secondary-600">
                {{ activityCounts.scans }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Dernière activité</p>
              <p class="mt-1 text-sm font-medium text-gray-900">
                {{ lastActivityDate }}
              </p>
            </div>
          </div>
        </div>

        <!-- Liste des activités -->
        <div class="flow-root">
          <ul class="divide-y divide-gray-200">
            <ActivitiesItem v-for="activity in paginatedActivities" :key="activity.id" :activity-type="activity.type"
              :title="activity.title" :description="activity.description" :date="activity.date" :link="activity.link"
              :scan-id="activity.scanId" :score="activity.score" @show-details="handleScanDetails" />
          </ul>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              Affichage {{ rangeStart }}-{{ rangeEnd }} sur {{ filteredActivities.length }}
            </div>
            <div class="flex space-x-2">
              <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary px-4 py-2 text-sm">
                Précédent
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="btn btn-secondary px-4 py-2 text-sm">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useDocumentsStore } from '~/stores/documents';
import { useScansStore } from '~/stores/scans';
import { useScanDetails } from '~/composables/useScanDetails';
import { useRouter } from 'vue-router'
import { IconArrowLeft } from '@tabler/icons-vue';

const router = useRouter()
const authStore = useAuthStore();
const documentsStore = useDocumentsStore();
const scansStore = useScansStore();
const { showScanDetails } = useScanDetails();

const selectedType = ref('');
const selectedPeriod = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;

const user = computed(() => authStore.user);
const documents = computed(() => documentsStore.getUserDocuments(user.value?.id || 0));
const scans = computed(() => scansStore.getUserScans(user.value?.id || 0));

const activityCounts = computed(() => ({
  documents: filteredActivities.value.filter(a => a.type === 'document').length,
  scans: filteredActivities.value.filter(a => a.type === 'scan').length
}));

const allActivities = computed(() => {
  const docActivities = documents.value.map(doc => ({
    id: `doc-${doc.id}`,
    type: 'document',
    title: `Document authentifié : ${doc.filename}`,
    description: `Hash: ${doc.hash.substring(0, 12)}...`,
    date: new Date(doc.createdAt),
    link: '/modules/docsentry'
  }));

  const scanActivities = scans.value.map(scan => ({
    id: `scan-${scan.id}`,
    type: 'scan',
    title: `Audit de sécurité : ${scan.url}`,
    description: `${scan.vulnerabilities.length} vulnérabilités détectées`,
    date: new Date(scan.createdAt),
    score: scan.score,
    link: '/modules/secuscan',
    scanId: scan.id
  }));

  return [...docActivities, ...scanActivities]
    .sort((a, b) => b.date - a.date);
});

const filteredActivities = computed(() => {
  let filtered = allActivities.value;

  if (selectedType.value) {
    filtered = filtered.filter(activity => activity.type === selectedType.value);
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  if (selectedPeriod.value === 'today') {
    filtered = filtered.filter(activity => activity.date >= today);
  } else if (selectedPeriod.value === 'week') {
    filtered = filtered.filter(activity => activity.date >= weekStart);
  } else if (selectedPeriod.value === 'month') {
    filtered = filtered.filter(activity => activity.date >= monthStart);
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredActivities.value.length / itemsPerPage)
);

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredActivities.value.slice(start, end);
});

const rangeStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const rangeEnd = computed(() => {
  const end = currentPage.value * itemsPerPage;
  return end > filteredActivities.value.length ? filteredActivities.value.length : end;
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const lastActivityDate = computed(() => {
  if (allActivities.value.length === 0) return 'Aucune activité';
  return formatDateTime(allActivities.value[0].date);
});

const handleScanDetails = (scanId) => {
  showScanDetails(scanId);
  navigateTo('/modules/secuscan');
};

const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(date));
};

watch([selectedType, selectedPeriod], () => {
  currentPage.value = 1;
});
</script>