<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <nav class="fixed top-0 inset-x-0 bg-white shadow z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <img class="h-8 w-8 mr-2" src="/img/logo.png" alt="Logo" />
              <span class="text-xl font-bold text-primary-600">CYPASS</span>
            </NuxtLink>
          </div>

          <div class="hidden md:flex space-x-8 mx-auto">
             <NuxtLink 
                to="/verifier" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary-600 hover:border-primary-600 transition-colors"
                active-class="text-primary-600 border-b-2 border-primary-600"
              >
              Vérifiez un document
            </NuxtLink>
            <NuxtLink 
                to="/vigiforum" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary-600 hover:border-primary-600 transition-colors"
                active-class="text-primary-600 border-b-2 border-primary-600"
              >
              Forum Communautaire
            </NuxtLink>
          </div>

          <div class="flex-shrink-0 flex items-center justify-end">
            <template v-if="!isAuthenticated">
              <NuxtLink to="/auth/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                Se connecter
              </NuxtLink>
            </template>

            <div v-else class="relative">
              <button @click="userMenuOpen = !userMenuOpen" class="flex items-center space-x-3 focus:outline-none">
                <img :src="userProfilePictureUrl" alt="User Avatar" class="h-8 w-8 rounded-full object-cover" />
                <span class="hidden md:block text-sm font-medium text-gray-700">{{ userName }}</span>
              </button>

              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div class="py-1" role="menu">
                  <NuxtLink to="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Tableau de bord
                  </NuxtLink>
                  <NuxtLink to="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Mon profil
                  </NuxtLink>
                  <NuxtLink to="/dashboard/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Paramètres
                  </NuxtLink>
                  <div class="border-t border-gray-100"></div>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100" role="menuitem">
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="pt-16"> 
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(column, index) in footer.columns" :key="index">
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">{{ column.title }}</h3>
            <ul class="mt-4 space-y-4">
              <li v-for="(item, itemIndex) in column.links" :key="itemIndex">
                <NuxtLink
                  v-if="item.route"
                  :to="item.route"
                  class="text-base text-gray-500 hover:text-gray-900"
                >
                  {{ item.text }}
                </NuxtLink>
                <a
                  v-else
                  :href="item.href || '#'"
                  class="text-base text-gray-500 hover:text-gray-900"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; {{ new Date().getFullYear() }} {{ footer.copyright }}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// ... (Le script reste identique à l'original)
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const userMenuOpen = ref(false);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.firstName || authStore.user?.emailAddress || 'Utilisateur');
const userProfilePictureUrl = computed(() => authStore.user?.profilePictureUrl || '/img/default-profil.png');

const logout = () => {
  authStore.logout();
  router.push('/');
  userMenuOpen.value = false;
};

// Footer
const footer = {
  copyright: 'CYPASS',
  columns: [
    {
      title: 'Solutions',
      links: [
        { text: 'DocSentry', href: '#' },
        { text: 'SecuScan', href: '#' },
        { text: 'LeakMonitor', href: '#' },
        { text: 'VigiTech', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Documentation', href: '#' },
        { text: 'Guide', route: '/guide' },
        { text: 'FAQ', route: '/faq' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { text: 'À propos', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Carrières', href: '#' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { text: 'Confidentialité', href: '#' },
        { text: 'CGU', href: '#' }
      ]
    }
  ]
};
</script>
