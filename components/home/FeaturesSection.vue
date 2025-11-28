<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Image Side -->
        <div class="relative animate-fade-in animate-slide-left">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80" alt="Cybersecurity Team"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent"></div>
          </div>

          <!-- Floating card -->
          <div class="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <IconShieldCheck class="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">99.9% Uptime</p>
                <p class="text-xs text-gray-500">Sécurité promesse</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Side -->
        <div class="space-y-12 animate-fade-in animate-slide-right">
          <div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi choisir CYPASS ?
            </h2>
            <p class="text-xl text-gray-600">
              Une solution de confiance pour votre tranquillité d'esprit numérique
            </p>
          </div>

          <div class="space-y-8">
            <div v-for="(item, index) in why" :key="index"
              class="flex items-start space-x-4 group animate-fade-in animate-slide-up"
              :style="{ 'animation-delay': `${index * 100}ms` }">
              <div class="flex-shrink-0">
                <div
                  class="h-14 w-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  :class="item.bgGradient">
                  {{ item.icon }}
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { IconShieldCheck } from '@tabler/icons-vue';

const why = [
  {
    icon: '🏛️',
    title: 'Souveraineté numérique',
    description: 'Une solution 100% béninoise qui garantit la souveraineté de vos données sensibles avec un hébergement local et conforme.',
    bgGradient: 'from-blue-100 to-blue-200'
  },
  {
    icon: '📋',
    title: 'Conformité réglementaire',
    description: 'Respect des normes RGPD, ISO 27001 et des réglementations locales en matière de cybersécurité et protection des données.',
    bgGradient: 'from-green-100 to-green-200'
  },
  {
    icon: '🤝',
    title: 'Support local dédié',
    description: 'Une équipe d\'experts béninois disponible 24/7 pour un accompagnement personnalisé et une réponse rapide à vos besoins.',
    bgGradient: 'from-yellow-100 to-yellow-200'
  }
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
