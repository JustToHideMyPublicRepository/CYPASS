<template>
  <section class="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-16">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 z-0">
      <div class="absolute inset-0 opacity-20">
        <div
          class="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-blob">
        </div>
        <div
          class="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000">
        </div>
        <div
          class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000">
        </div>
      </div>
    </div>

    <!-- Grille de points -->
    <div class="absolute inset-0 z-0 opacity-10">
      <div class="absolute inset-0"
        style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;">
      </div>
    </div>

    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <!-- Texte -->
        <div class="space-y-8 animate-fade-in lg:col-span-2">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-slide-down w-fit">
            <span class="flex h-2 w-2 mr-2">
              <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span class="text-sm font-medium">Plateforme 100% souveraine - Made in Benin</span>
          </div>

          <!-- Titre -->
          <div>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight animate-slide-up">
              <span class="block mb-2">Votre bouclier</span>
              <span
                class="block bg-gradient-to-r from-primary-400 via-secondary-400 to-pink-400 text-transparent bg-clip-text">
                de cybersécurité
              </span>
            </h1>
          </div>

          <!-- Sous-titre -->
          <p class="text-lg md:text-xl text-gray-300 animate-slide-up animation-delay-200 leading-relaxed max-w-xl">
            La première plateforme béninoise de cybersécurité offrant des solutions avancées
            pour l'authentification de documents, l'audit de sites web et la détection proactive des menaces.
          </p>

          <!-- CTA -->
          <div class="flex flex-col sm:flex-row items-start gap-4 pt-4 animate-slide-up animation-delay-400">
            <NuxtLink to="/auth/signup"
              class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50 w-full sm:w-auto">
              <span class="relative z-10 flex items-center">
                Commencer gratuitement
                <IconArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
            </NuxtLink>

            <NuxtLink to="/verifier"
              class="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <IconFileCheck class="mr-2 h-5 w-5" />
              Vérifier un document
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 animate-fade-in animation-delay-600">
            <div v-for="(stat, index) in stats" :key="index">
              <div
                class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-400 mt-2">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="relative w-full lg:col-span-1 flex justify-center animate-slide-right">
          <div class="relative max-w-md w-full">
            <img src="https://cdn-icons-png.freepik.com/512/8781/8781562.png" alt="Cybersecurity Expert"
              class="w-full h-auto rounded-2xl shadow-2xl" />

            <!-- Décorations -->
            <div class="absolute -top-6 -right-6 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse">
            </div>
            <div
              class="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
      <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { IconFileCheck, IconArrowRight } from '@tabler/icons-vue';

// Stats pour le Hero
const stats = [
  { value: '1000+', label: 'Utilisateurs actifs' },
  { value: '5000+', label: 'Documents protégés' },
  { value: '99.9%', label: 'Disponibilité' },
  { value: '24/7', label: 'Support technique' }
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
