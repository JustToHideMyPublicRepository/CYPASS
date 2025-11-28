<template>
    <!-- Testimonials Section - Design moderne avec cards -->
    <section class="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p class="text-xl text-gray-600">
            Découvrez les témoignages de nos utilisateurs satisfaits
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(testimonial, index) in testimonies" :key="index"
            class="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl border border-gray-100 animate-fade-in animate-slide-up"
            :style="{ 'animation-delay': `${index * 100}ms` }">

            <!-- Quote Icon -->
            <div class="absolute top-6 right-6 text-primary-100 group-hover:text-primary-200 transition-colors">
              <svg class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>

            <!-- Content -->
            <div class="relative">
              <p class="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "{{ testimonial.text }}"
              </p>

              <!-- Author -->
              <div class="flex items-center space-x-4">
                <div
                  class="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {{ getInitials(testimonial.name) }}
                </div>
                <div>
                  <p class="text-lg font-bold text-gray-900">{{ testimonial.name }}</p>
                  <p class="text-sm text-gray-600">{{ testimonial.position }}</p>
                  <p v-if="testimonial.company" class="text-xs text-primary-600 font-semibold mt-1">
                    {{ testimonial.company }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Rating Stars -->
            <div class="flex mt-6 space-x-1">
              <svg v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
// Témoignages
const testimonies = [
  {
    text: 'CYPASS nous a permis de sécuriser nos documents sensibles et de détecter des vulnérabilités critiques sur notre infrastructure. Un outil indispensable !',
    name: 'Delluc Hounmenou',
    position: 'Directeur Général',
    company: 'HODD'
  },
  {
    text: 'Une solution complète et intuitive qui répond parfaitement à nos besoins en matière de cybersécurité. L\'équipe support est réactive et professionnelle.',
    name: 'Marcias LALEYE',
    position: 'Responsable commerciale',
    company: 'SAS Bénin'
  }
];

const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
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
