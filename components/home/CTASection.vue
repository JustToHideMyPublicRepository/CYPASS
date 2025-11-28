<template>
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700"></div>
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob">
      </div>
      <div
        class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000">
      </div>
    </div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="space-y-8 animate-fade-in">
        <h2 class="text-4xl md:text-5xl font-bold text-white leading-tight">
          Prêt à sécuriser votre avenir numérique ?
        </h2>
        <p class="text-xl text-primary-100 max-w-2xl mx-auto">
          Rejoignez des centaines d'entreprises qui font confiance à CYPASS pour leur cybersécurité. Essayez
          gratuitement, sans engagement.
        </p>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <NuxtLink to="/auth/signup"
            class="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
            <span>Créer un compte gratuit</span>
            <IconArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>

          <NuxtLink to="/guide"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto">
            Voir la démo
          </NuxtLink>
        </div>

        <!-- Trust badges -->
        <div class="pt-8 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
          <div class="flex items-center space-x-2">
            <IconShieldCheck class="h-5 w-5" />
            <span>100% Sécurisé</span>
          </div>
          <div class="flex items-center space-x-2">
            <IconAlertCircle class="h-5 w-5" />
            <span>Sans engagement</span>
          </div>
          <div class="flex items-center space-x-2">
            <IconEyeCheck class="h-5 w-5" />
            <span>Support 24/7</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { IconShieldCheck, IconAlertCircle, IconEyeCheck, IconArrowRight } from '@tabler/icons-vue';
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
