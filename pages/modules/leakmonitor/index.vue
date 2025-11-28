<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">LeakMonitor</h1>
          <p class="mt-1 text-sm text-gray-600">Surveillance des fuites de données</p>
        </div>
      </div>

      <button @click="router.go(-1)" class="btn btn-outline gap-2 flex items-center">
        <IconArrowLeft class="w-5 h-5" />
        Retour
      </button>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="bg-white shadow-sm rounded-lg p-8 text-center">
        <div class="max-w-3xl mx-auto">
          <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="En développement" class="w-full h-64 object-cover rounded-lg mb-8" />
          
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Ce module est en cours de développement</h2>
          <p class="text-lg text-gray-600 mb-6">
            Le module LeakMonitor est actuellement en cours de développement et sera bientôt disponible. 
            Il vous permettra de surveiller les fuites potentielles de données sensibles liées à votre organisation.
          </p>
          
          <div class="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button class="btn btn-outline">
              Être notifié lors du lancement
            </button>
            <NuxtLink to="/dashboard" class="btn btn-primary">
              Retour au tableau de bord
            </NuxtLink>
          </div>
      
          <div class="mt-12 border-t border-gray-200 pt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Fonctionnalités à venir</h3>
            <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
              <li v-for="(feature, index) in features" :key="index" class="flex items-start">
                <IconCircleCheck class="h-5 w-5 text-secondary-500 mr-2" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconArrowLeft, IconCircleCheck } from '@tabler/icons-vue';

const router = useRouter()

const features = [
  'Surveillance continue du Dark Web',
  'Alertes en temps réel',
  'Détection des informations d\'identification compromises',
  'Recherche par domaine et adresse email',
  'Rapports détaillés et historiques',
  'Intégration avec d\'autres modules CYPASS'
];
</script>
