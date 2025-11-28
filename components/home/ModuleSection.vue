<template>
  <section class="py-24 bg-gray-50 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Une suite complète d'outils
        </h2>
        <p class="text-xl text-gray-600">
          Des solutions puissantes et intégrées pour protéger tous vos actifs numériques
        </p>
      </div>

      <!-- Modules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink v-for="(module, index) in modules" :key="index" :to="module.link"
          class="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in animate-slide-up"
          :style="{ 'animation-delay': `${index * 100}ms` }">
          <!-- Gradient background on hover -->
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            :class="module.gradientClass"></div>

          <!-- Icon -->
          <div class="relative mb-6">
            <div
              class="inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              :class="module.bgColor">
              <component :is="module.icon" class="h-8 w-8" :class="module.textColor" />
            </div>
            <!-- Badge "Nouveau" ou "Populaire" -->
            <span v-if="module.badge" class="absolute -top-1 -right-1 px-2 py-1 text-xs font-semibold rounded-full"
              :class="module.badgeClass">
              {{ module.badge }}
            </span>
          </div>

          <!-- Content -->
          <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {{ module.title }}
          </h3>
          <p class="text-gray-600 mb-6 leading-relaxed">
            {{ module.description }}
          </p>

          <!-- CTA -->
          <div class="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
            <span class="mr-2">En savoir plus</span>
            <IconArrowRight class="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
          </div>

          <!-- Decorative element -->
          <div
            class="absolute -bottom-2 -right-2 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            :class="module.textColor">
            <component :is="module.icon" class="w-full h-full" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  IconFileCheck,
  IconShieldCheck,
  IconAlertCircle,
  IconEyeCheck,
  IconArrowRight
} from '@tabler/icons-vue';

// Modules avec plus de détails
const modules = [
  {
    icon: IconEyeCheck,
    title: 'VigiTech',
    description: 'Détectez proactivement les menaces et les activités suspectes dans vos systèmes avec notre IA avancée.',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    gradientClass: 'from-red-400 to-red-600',
    link: '/modules/vigitech',
    badge: 'Populaire',
    badgeClass: 'bg-red-500 text-white'
  },
  {
    icon: IconFileCheck,
    title: 'DocSentry',
    description: 'Authentifiez vos documents sensibles avec une signature électronique et un QR code unique vérifiable publiquement.',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    gradientClass: 'from-blue-400 to-blue-600',
    link: '/modules/docsentry',
    badge: 'Nouveau',
    badgeClass: 'bg-blue-500 text-white'
  },
  {
    icon: IconShieldCheck,
    title: 'SecuScan',
    description: 'Auditez automatiquement la sécurité de vos sites web selon les standards OWASP et obtenez des recommandations personnalisées.',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    gradientClass: 'from-green-400 to-green-600',
    link: '/modules/secuscan',
    badge: 'Bientôt',
    badgeClass: 'bg-green-500 text-white'
  },
  {
    icon: IconAlertCircle,
    title: 'LeakMonitor',
    description: 'Surveillez les fuites de données et détectez les informations sensibles exposées sur le Dark Web.',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    gradientClass: 'from-yellow-400 to-yellow-600',
    link: '/modules/leakmonitor',
  },
];
</script>

<style scoped>
/* Animations personnalisées */
@keyframes blob {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

.animate-slide-down {
  animation: slide-down 0.8s ease-out forwards;
}

.animate-slide-left {
  animation: slide-left 0.8s ease-out forwards;
}

.animate-slide-right {
  animation: slide-right 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}
</style>
