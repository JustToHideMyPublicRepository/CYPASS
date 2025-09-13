<template>
  <main>
    <!-- Section Hero -->
    <section class="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <img src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg" alt="Digital Security Background"
        class="absolute inset-0 h-full w-full object-cover z-0 opacity-70">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-800/70 to-secondary-800/70 z-10"></div>
      <div class="relative z-20 text-center max-w-4xl px-4 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-slide-up">
          Protégez votre monde numérique avec <span class="text-secondary-400">CYPASS</span>
        </h1>
        <p class="text-lg md:text-xl mb-10 animate-slide-up delay-100">
          La première plateforme béninoise souveraine de cybersécurité, offrant des solutions avancées pour
          l'authentification de documents, l'audit de sites web et la détection proactive des menaces.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up delay-200">
          <div class="flex flex-col sm:flex-row gap-4 w-full">
            <NuxtLink to="/modules/docsentry"
              class="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
              Découvrir nos solutions
            </NuxtLink>
            <NuxtLink to="/auth/signup"
              class="btn btn-outline text-lg px-8 py-4 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
              Commencer gratuitement
            </NuxtLink>
          </div>

          <div class="w-full sm:w-auto">
            <NuxtLink href="/verifier"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
              Vérifier un document
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Modules-->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Une solution complète pour votre sécurité</h2>
        <p class="text-xl text-gray-600 mb-16">Des outils puissants pour pour protéger vos actifs numériques.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(module, index) in modules" :key="index"
            class="group bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animate-slide-up"
            :style="{ 'animation-delay': `${index * 100}ms` }">
            <div class="p-4 rounded-full inline-flex items-center justify-center mb-6" :class="module.bgColor">
              <component :is="module.icon" class="h-8 w-8" :class="module.textColor" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ module.title }}</h3>
            <p class="text-gray-600 mb-6">{{ module.description }}</p>
            <NuxtLink :to="module.link"
              class="text-primary-600 font-semibold flex items-center justify-center group-hover:text-primary-700 transition-colors">
              En savoir plus
              <IconArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!--Description -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4">La solution de confiance pour votre cybersécurité</h2>
          <p class="text-xl text-gray-600">Nos engagements pour votre tranquillité d'esprit.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="lg:order-2 animate-fade-in animate-slide-up">
            <img
              src="https://img.freepik.com/photos-gratuite/femme-affaires-sombre-se-serrant-main-collegue-masculin_74855-1763.jpg?semt=ais_incoming&w=740&q=80"
              alt="Team Collaboration" class="rounded-lg shadow-xl">
          </div>
          <div class="lg:order-1 space-y-10">
            <div v-for="(item, index) in why" :key="index" class="flex items-start animate-fade-in animate-slide-up"
              :style="{ 'animation-delay': `${index * 100}ms` }">
              <div class="flex-shrink-0 p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <span class="text-2xl">{{ item.icon }}</span>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ item.title }}</h3>
                <p class="text-lg text-gray-600">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Temoignages -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Ce que nos utilisateurs disent de nous</h2>
        <p class="text-xl text-gray-600 mb-16">Des témoignages qui parlent d'eux-mêmes.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(testimonial, index) in testimonies" :key="index"
            class="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animate-slide-up"
            :style="{ 'animation-delay': `${index * 100}ms` }">
            <p class="text-gray-700 text-lg italic mb-6">"{{ testimonial.text }}"</p>
            <div class="flex items-center justify-center">
              <div class="flex-shrink-0">
                <div
                  class="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium text-xl">
                  {{ getInitials(testimonial.name) }}
                </div>
              </div>
              <div class="ml-4 text-left">
                <p class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-md text-gray-600">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <!-- <section class="py-24 bg-primary-700 text-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-extrabold mb-6">Prêt à Sécuriser Votre Avenir ?</h2>
        <p class="text-xl mb-10">Rejoignez des centaines d'entreprises qui font confiance à CYPASS pour leur cybersécurité.</p>
        <NuxtLink to="/auth/signup" class="btn bg-secondary-500 text-white hover:bg-secondary-600 text-lg px-10 py-4 transform hover:scale-105 transition-transform duration-300">
          Créer un compte gratuit
        </NuxtLink>
      </div>
    </section> -->
  </main>
</template>

<script setup>
import { IconFileCheck, IconShieldCheck, IconAlertCircle, IconEyeCheck, IconArrowRight } from '@tabler/icons-vue';

const modules = [
  {
    icon: IconFileCheck,
    title: 'DocSentry',
    description: 'Authentifiez vos documents sensibles avec une signature électronique et un QR code unique vérifiable publiquement.',
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-600',
    link: '/modules/docsentry'
  },
  {
    icon: IconShieldCheck,
    title: 'SecuScan',
    description: 'Auditez automatiquement la sécurité de vos sites web selon les standards OWASP et obtenez des recommandations personnalisées.',
    bgColor: 'bg-secondary-100',
    textColor: 'text-secondary-600',
    link: '/modules/secuscan'
  },
  {
    icon: IconAlertCircle,
    title: 'LeakMonitor',
    description: 'Surveillez les fuites de données et détectez les informations sensibles exposées sur le Dark Web.',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    link: '/modules/leakmonitor'
  },
  {
    icon: IconEyeCheck,
    title: 'VigiTech',
    description: 'Détectez proactivement les menaces et les activités suspectes dans vos systèmes.',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    link: '/modules/vigitech'
  }
];

const why = [
  {
    icon: '🏛️',
    title: 'Souveraineté numérique',
    description: 'Une solution 100% béninoise qui garantit la souveraineté de vos données sensibles.'
  },
  {
    icon: '📋',
    title: 'Conformité réglementaire',
    description: 'Respect des normes et réglementations locales et internationales en matière de cybersécurité.'
  },
  {
    icon: '🤝',
    title: 'Support local',
    description: 'Une équipe d\'experts béninois à votre écoute pour un accompagnement personnalisé.'
  }
];

const testimonies = [
  {
    text: 'CYPASS nous a permis de sécuriser nos documents sensibles et de détecter des vulnérabilités critiques sur notre infrastructure.',
    name: 'Delluc Hounmenou',
    position: 'Directeur Général, HODD'
  },
  {
    text: 'Une solution complète et intuitive qui répond parfaitement à nos besoins en matière de cybersécurité.',
    name: 'Marcias LALEYE',
    position: 'Responsable commerciale, SAS Bénin'
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
