<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Rapport de sécurité</h1>
          <p class="mt-1 text-sm text-gray-600">Vue d'ensemble de la sécurité de vos services</p>
        </div>
        <div class="mt-4 md:mt-0 flex items-center space-x-3">
          <button class="btn btn-primary inline-flex items-center">
            <IconDownload class="h-5 w-5 mr-2" />
            Télécharger le rapport
          </button>

          <button @click="router.go(-1)" class="btn btn-outline gap-2 flex items-center">
            <IconArrowLeft class="w-5 h-5" />
            Retour
          </button>
        </div>
      </div>

      <!-- Score global -->
      <div class="mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Score de sécurité global</h3>
              <p class="mt-1 text-sm text-gray-500">Basé sur l'analyse de tous vos services</p>
            </div>
            <div class="mt-4 sm:mt-0">
              <div class="inline-flex items-center px-4 py-2 rounded-full" :class="[
                score >= 80 ? 'bg-green-100 text-green-800' : 
                score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              ]">
                <span class="text-2xl font-bold">{{ score }}/100</span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  :class="[
                    score >= 80 ? 'bg-green-500' : 
                    score >= 60 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  ]"
                  :style="{ width: `${score}%` }"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Résumé des vulnérabilités -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white overflow-hidden shadow-sm rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-red-100 rounded-lg">
                <IconAlertTriangle class="h-6 w-6 text-red-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Vulnérabilités critiques</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">2</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <IconArrowUp class="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      <span class="sr-only">Diminution de</span>
                      50%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-sm rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-yellow-100 rounded-lg">
                <IconAlertTriangle class="h-6 w-6 text-yellow-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Vulnérabilités moyennes</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">5</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <IconArrowUp class="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      <span class="sr-only">Diminution de</span>
                      25%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-sm rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <IconInfoCircle class="h-6 w-6 text-blue-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Vulnérabilités faibles</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">8</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <IconArrowUp class="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      <span class="sr-only">Diminution de</span>
                      10%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Détails par service -->
      <div class="mt-8 bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Détails par service</h3>
          
          <div class="space-y-6">
            <div v-for="service in services" :key="service.name" class="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-base font-medium text-gray-900">{{ service.name }}</h4>
                  <p class="mt-1 text-sm text-gray-500">{{ service.description }}</p>
                </div>
                <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="[
                  service.score >= 80 ? 'bg-green-100 text-green-800' : 
                  service.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                ]">
                  Score: {{ service.score }}/100
                </div>
              </div>

              <div class="mt-4">
                <div class="relative">
                  <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      :class="[
                        service.score >= 80 ? 'bg-green-500' : 
                        service.score >= 60 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      ]"
                      :style="{ width: `${service.score}%` }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h5 class="text-sm font-medium text-gray-700">Vulnérabilités détectées</h5>
                  <ul class="mt-2 space-y-2">
                    <li v-for="vuln in service.vulnerabilities" :key="vuln.name" class="flex items-start">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="[
                        vuln.severity === 'high' ? 'bg-red-100 text-red-800' : 
                        vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'
                      ]">
                        {{ vuln.severity }}
                      </span>
                      <span class="ml-2 text-sm text-gray-600">{{ vuln.name }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-gray-700">Recommandations</h5>
                  <ul class="mt-2 space-y-2">
                    <li v-for="(rec, index) in service.recommendations" :key="index" class="flex items-start">
                      <IconCircleCheck class="h-5 w-5 text-gray-400 mr-2" />
                      <span class="text-sm text-gray-600">{{ rec }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { IconArrowLeft, IconDownload, IconAlertTriangle, IconInfoCircle, IconArrowUp, IconCircleCheck } from '@tabler/icons-vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const score = ref(85);

const services = ref([
  {
    name: 'DocSentry',
    description: 'Service d\'authentification de documents',
    score: 92,
    vulnerabilities: [
      { name: 'Configuration TLS non optimale', severity: 'low' },
      { name: 'En-têtes de sécurité manquants', severity: 'low' }
    ],
    recommendations: [
      'Mettre à jour la configuration TLS',
      'Ajouter les en-têtes de sécurité recommandés'
    ]
  },
  {
    name: 'SecuScan',
    description: 'Service d\'audit de sécurité',
    score: 88,
    vulnerabilities: [
      { name: 'Dépendances obsolètes', severity: 'medium' },
      { name: 'Politique de mots de passe faible', severity: 'low' }
    ],
    recommendations: [
      'Mettre à jour les dépendances',
      'Renforcer la politique de mots de passe'
    ]
  },
  // {
  //   name: 'LeakMonitor',
  //   description: 'Service de détection de fuites',
  //   score: 75,
  //   vulnerabilities: [
  //     { name: 'Injection SQL possible', severity: 'high' },
  //     { name: 'XSS Stored', severity: 'medium' },
  //     { name: 'CSRF Token manquant', severity: 'low' }
  //   ],
  //   recommendations: [
  //     'Implémenter la validation des entrées',
  //     'Ajouter une protection XSS',
  //     'Mettre en place des tokens CSRF'
  //   ]
  // },
  // {
  //   name: 'VigiTech',
  //   description: 'Service de surveillance des menaces',
  //   score: 95,
  //   vulnerabilities: [
  //     { name: 'Logs insuffisants', severity: 'low' }
  //   ],
  //   recommendations: [
  //     'Améliorer la journalisation des événements'
  //   ]
  // }
]);
</script>