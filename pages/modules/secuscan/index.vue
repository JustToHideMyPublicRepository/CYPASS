<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">SecuScan</h1>
          <p class="mt-1 text-sm text-gray-600">Audit automatisé de sites web</p>
        </div>
        <button @click="showScanModal = true" class="mt-4 md:mt-0 btn btn-primary inline-flex items-center">
          <IconShieldCheck class="h-5 w-5 mr-2" />
          Analyser un site
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Mes audits de sécurité</h2>

        <div v-if="userScans.length === 0" class="text-center py-10">
          <IconShieldCheck class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun audit</h3>
          <p class="mt-1 text-sm text-gray-500">Commencez par analyser votre premier site web.</p>
          <div class="mt-6">
            <button @click="showScanModal = true" class="btn btn-primary inline-flex items-center">
              <IconShieldCheck class="h-5 w-5 mr-2" />
              Analyser un site
            </button>
          </div>
        </div>

        <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="scan in userScans" :key="scan.id"
            class="bg-white overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div class="p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-medium text-gray-900 truncate">{{ scan.url }}</h3>
                <div :class="[
                  scan.score >= 80 ? 'bg-green-100 text-green-800' :
                    scan.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                ]" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  <span>{{ scan.score }}/100</span>
                </div>
              </div>

              <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div :class="[
                  scan.score >= 80 ? 'bg-green-500' :
                    scan.score >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                ]" class="h-2.5 rounded-full" :style="{ width: `${scan.score}%` }"></div>
              </div>

              <div class="text-sm text-gray-500 mb-3">
                <div class="flex items-center">
                  <IconClock class="h-4 w-4 mr-1.5 text-gray-400" />
                  <span>{{ formatDateTime(scan.createdAt) }}</span>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="(vuln, idx) in scan.vulnerabilities.slice(0, 2)" :key="idx" :class="[
                  vuln.severity === 'high' ? 'bg-red-100 text-red-800' :
                    vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                ]" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium">
                  {{ vuln.name }}
                </span>
                <span v-if="scan.vulnerabilities.length > 2"
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  +{{ scan.vulnerabilities.length - 2 }}
                </span>
              </div>

              <div class="mt-5">
                <button @click="viewScanDetails(scan)"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Voir les détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations complémentaires -->
      <aboutSecuScan />
    </div>

    <!-- Modal nouveau scan -->
    <div v-if="showScanModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                <IconShieldCheck class="h-6 w-6 text-primary-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Analyser un site web
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Entrez l'URL du site web que vous souhaitez analyser. SecuScan effectuera un audit complet et vous
                    fournira un rapport détaillé.
                  </p>
                </div>
              </div>
            </div>

            <div v-if="!scanning" class="mt-5">
              <div>
                <label for="website-url" class="block text-sm font-medium text-gray-700">URL du site</label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span
                    class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://
                  </span>
                  <input v-model="websiteUrl" type="text" name="website-url" id="website-url"
                    class="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="exemple.com" />
                </div>
              </div>
            </div>

            <div v-else class="mt-5">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div class="flex-1">
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-gray-700">Progression globale</span>
                      <span class="text-sm font-medium text-gray-700">{{ scanProgress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        :style="{ width: `${scanProgress}%` }"></div>
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <div v-for="step in scanSteps" :key="step.id" class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div v-if="step.id < currentStep.step"
                        class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <IconCheck class="h-5 w-5 text-green-600" />
                      </div>
                      <div v-else-if="step.id === currentStep.step"
                        class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center animate-pulse">
                        <div class="h-3 w-3 bg-primary-600 rounded-full"></div>
                      </div>
                      <div v-else class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <div class="h-3 w-3 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ step.name }}</p>
                      <p class="text-sm text-gray-500">{{ step.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="startScan" :disabled="!isValidUrl || scanning"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="scanning">Analyse en cours...</span>
              <span v-else>Lancer l'analyse</span>
            </button>
            <button @click="showScanModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal résultats du scan -->
    <div v-if="showResultsModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                :class="[
                  currentScan.score >= 80 ? 'bg-green-100' :
                    currentScan.score >= 60 ? 'bg-yellow-100' :
                      'bg-red-100'
                ]">
                <IconShieldCheck class="h-6 w-6" :class="[
                  currentScan.score >= 80 ? 'text-green-600' :
                    currentScan.score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                ]" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <span>Résultats de l'analyse</span>
                  <span class="ml-2 text-sm px-2 py-1 rounded" :class="[
                    currentScan.score >= 80 ? 'bg-green-100 text-green-800' :
                      currentScan.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                  ]">
                    Score: {{ currentScan.score }}/100
                  </span>
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Analyse de {{ currentScan.url }} - {{ formatDateTime(currentScan.createdAt) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <div class="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div :class="[
                  currentScan.score >= 80 ? 'bg-green-500' :
                    currentScan.score >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                ]" class="h-3 rounded-full" :style="{ width: `${currentScan.score}%` }"></div>
              </div>

              <div class="mb-6">
                <h4 class="text-base font-medium text-gray-900 mb-2">Vulnérabilités détectées</h4>
                <div v-if="currentScan.vulnerabilities.length === 0" class="text-sm text-gray-600">
                  Aucune vulnérabilité détectée. Félicitations !
                </div>
                <div v-else class="space-y-3">
                  <div v-for="vuln in currentScan.vulnerabilities" :key="vuln.id"
                    class="bg-gray-50 px-4 py-3 rounded-md">
                    <div class="flex items-start">
                      <div :class="[
                        vuln.severity === 'high' ? 'bg-red-100 text-red-800' :
                          vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                      ]" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {{ vuln.severity.toUpperCase() }}
                      </div>
                      <div class="ml-3">
                        <h5 class="text-sm font-medium text-gray-900">{{ vuln.name }}</h5>
                        <p class="mt-1 text-sm text-gray-600">{{ vuln.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-base font-medium text-gray-900 mb-2">Recommandations</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li v-for="(rec, index) in currentScan.recommendations" :key="index">
                    {{ rec }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="downloadReport"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
              Télécharger le rapport
            </button>
            <button @click="showResultsModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useScansStore } from '~/stores/scans';
import aboutSecuScan from '~/components/modAbout/aboutSecuScan';
import { IconShieldCheck, IconClock, IconCheck } from '@tabler/icons-vue';

const authStore = useAuthStore();
const scansStore = useScansStore();

const showScanModal = ref(false);
const showResultsModal = ref(false);
const websiteUrl = ref('');
const scanning = ref(false);
const currentStep = ref({ step: 0, totalSteps: 0, currentStepInfo: null, progress: 0 });
const scanProgress = ref(0);
const currentScan = ref(null);

// Étapes du scan
const scanSteps = [
  { id: 1, name: 'Configuration', description: 'Configuration de l\'analyse' },
  { id: 2, name: 'DNS', description: 'Résolution DNS et vérification de l\'accessibilité' },
  { id: 3, name: 'Headers', description: 'Analyse des en-têtes de sécurité' },
  { id: 4, name: 'SSL', description: 'Vérification du certificat SSL/TLS' },
  { id: 5, name: 'Vulns', description: 'Recherche de vulnérabilités connues' },
  { id: 6, name: 'Deps', description: 'Analyse des dépendances' },
  { id: 7, name: 'Report', description: 'Génération du rapport' }
];

const user = computed(() => authStore.user);
const userScans = computed(() => scansStore.getUserScans(user.value?.id || 0));

const isValidUrl = computed(() => {
  if (!websiteUrl.value) return false;
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return pattern.test(websiteUrl.value);
});

const startScan = async () => {
  if (!isValidUrl.value) return;

  scanning.value = true;
  scanProgress.value = 0;

  try {
    const newScan = await scansStore.addScan(
      {
        url: websiteUrl.value,
        userId: user.value.id
      },
      (progress) => {
        currentStep.value = progress;
        scanProgress.value = progress.progress;
      }
    );

    // Mettre à jour currentScan avec le nouveau scan
    currentScan.value = newScan;

    // Fermer le modal de scan et réinitialiser les états
    setTimeout(() => {
      showScanModal.value = false;
      websiteUrl.value = '';
      scanning.value = false;
      currentStep.value = { step: 0, totalSteps: 0, currentStepInfo: null, progress: 0 };
      scanProgress.value = 0;

      // Afficher le modal des résultats
      showResultsModal.value = true;
    }, 1000);

  } catch (error) {
    console.error('Erreur lors du scan', error);
    alert('Une erreur s\'est produite lors de l\'analyse du site. Veuillez réessayer.');
    scanning.value = false;
  }
};

const viewScanDetails = (scan) => {
  currentScan.value = scan;
  showResultsModal.value = true;
};

const downloadReport = () => {
  if (!currentScan.value) return;
  alert(`Le rapport pour ${currentScan.value.url} serait téléchargé ici.`);
};

const formatDateTime = (dateString) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(dateString));
};
</script>