<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Performances</h1>
          <p class="mt-1 text-sm text-gray-600">Analyse des performances de vos services</p>
        </div>
        <button @click="router.go(-1)" class="btn btn-outline gap-2 flex items-center">
          <IconArrowLeft class="w-5 h-5" />
          Retour
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>

      <!-- Graphique des performances -->
      <div class="mt-8 bg-white shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900">Évolution des performances</h2>
          <div class="mt-6 h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Graphique des performances à venir</p>
          </div>
        </div>
      </div>

      <!-- Détails des performances -->
      <div class="mt-8 bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900">Détails des performances par service</h3>
          
          <div class="mt-6 border-t border-gray-200">
            <dl class="divide-y divide-gray-200">
              <div v-for="(service, index) in services" :key="index" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">{{ service.name }}</dt>
                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="flex-grow">
                    <div class="flex items-center">
                      <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div :class="service.barColor" class="h-2.5 rounded-full" :style="{ width: `${service.performance}%` }"></div>
                      </div>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{ service.performance }}%</span>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ service.description }}</p>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconArrowLeft, IconArrowUp, IconBolt, IconClockCheck, IconServer } from '@tabler/icons-vue'

const router = useRouter()

const stats = [
  {
    icon: IconBolt,
    title: 'Temps de réponse moyen',
    value: '320ms',
    trend: '15%',
    trendLabel: 'Amélioration de',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    icon: IconClockCheck,
    title: 'Disponibilité',
    value: '99.9%',
    trend: '0.5%',
    trendLabel: 'Amélioration de',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    icon: IconServer,
    title: 'Temps de traitement',
    value: '1.2s',
    trend: '10%',
    trendLabel: 'Amélioration de',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600'
  }
];

const services = [
  {
    name: 'DocSentry',
    performance: 95,
    barColor: 'bg-green-600',
    description: 'Temps de réponse moyen: 280ms'
  },
  {
    name: 'SecuScan',
    performance: 88,
    barColor: 'bg-green-600',
    description: 'Temps de réponse moyen: 450ms'
  },
  {
    name: 'LeakMonitor',
    performance: 75,
    barColor: 'bg-yellow-600',
    description: 'Temps de réponse moyen: 850ms'
  },
  {
    name: 'VigiTech',
    performance: 92,
    barColor: 'bg-green-600',
    description: 'Temps de réponse moyen: 320ms'
  }
];
</script>