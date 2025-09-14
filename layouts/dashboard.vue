<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Overlay pour le mode mobile -->
    <div v-if="isMobile && !isCollapsed" @click="toggleSidebar" class="fixed inset-0 bg-black opacity-50 z-20 md:hidden"></div>

    <!-- Sidebar -->
    <div :class="[
      'transition-all duration-300 ease-in-out bg-white border-r border-gray-200 fixed h-screen z-30',
      'md:relative md:translate-x-0',
      isCollapsed ? 'w-24' : 'w-64',
      isMobile ? (isCollapsed ? '-translate-x-full' : 'translate-x-0') : ''
    ]">
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <NuxtLink to="/" @click="isMobile ? toggleSidebar() : null">
          <div class="flex items-center">
            <img class="h-8 w-8 mr-2" src="/img/logo.png" alt="Logo" />
            <span v-if="!isCollapsed" class="text-xl font-bold text-primary-600">CYPASS</span>
          </div>
        </NuxtLink>

        <button @click="toggleSidebar" class="p-2 rounded-md hover:bg-gray-100 hidden md:block">
          <IconChevronsRight v-if="isCollapsed" class="h-5 w-5 text-gray-500" />
          <IconChevronsLeft v-else class="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <nav class="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
        <NuxtLink to="/dashboard" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
          route.path === '/dashboard' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
        ]" @click="handleLinkClick">
          <IconLayoutDashboard class="h-6 w-6" />
          <span v-if="!isCollapsed" class="ml-3">Tableau de bord</span>
        </NuxtLink>

        <div class="py-2">
          <div class="px-3 mb-2" :class="{ 'text-xs uppercase font-semibold text-gray-500': !isCollapsed }">
            <span v-if="!isCollapsed">Modules</span>
            <div v-else class="border-b border-gray-200"></div>
          </div>

          <NuxtLink to="/modules/docsentry" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
            route.path.includes('/modules/docsentry') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
          ]" @click="handleLinkClick">
            <IconFileCheck class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">DocSentry</span>
          </NuxtLink>

          <NuxtLink to="/modules/secuscan" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
            route.path.includes('/modules/secuscan') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
          ]" @click="handleLinkClick">
            <IconShieldCheck class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">SecuScan</span>
          </NuxtLink>

          <NuxtLink to="/modules/leakmonitor" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
            route.path.includes('/modules/leakmonitor') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
          ]" @click="handleLinkClick">
            <IconAlertCircle class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">LeakMonitor</span>
          </NuxtLink>

          <NuxtLink to="/modules/vigitech" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
            route.path.includes('/modules/vigitech') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
          ]" @click="handleLinkClick">
            <IconEyeCheck class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">VigiTech</span>
          </NuxtLink>
        </div>

        <div class="py-2">
          <div class="px-3 mb-2" :class="{ 'text-xs uppercase font-semibold text-gray-500': !isCollapsed }">
            <span v-if="!isCollapsed">Compte</span>
            <div v-else class="border-b border-gray-200"></div>
          </div>

          <NuxtLink to="/dashboard/profile" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
            route.path === '/dashboard/profile' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
          ]" @click="handleLinkClick">
            <IconUser class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">Profil</span>
          </NuxtLink>

          <NuxtLink to="/dashboard/settings" class="flex items-center px-3 py-2 rounded-md transition-colors" :class="[
            route.path === '/dashboard/settings' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
          ]" @click="handleLinkClick">
            <IconSettings class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">Paramètres</span>
          </NuxtLink>

          <button @click="logout"
            class="w-full flex items-center px-3 py-2 rounded-md transition-colors text-red-700 hover:bg-red-100 border-t">
            <IconLogout class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">Déconnexion</span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
        <div class="flex items-center">
          <!-- Bouton hamburger pour mobile -->
          <button @click="toggleSidebar" class="p-2 rounded-md hover:bg-gray-100 md:hidden">
            <IconMenu2 class="h-6 w-6 text-gray-600" />
          </button>
          <h1 class="text-xl font-semibold text-gray-900 ml-2 md:ml-0">{{ pageTitle }}</h1>
        </div>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <button @click="userMenuOpen = !userMenuOpen" class="flex items-center space-x-3 focus:outline-none">
              <img :src="userProfilePictureUrl" alt="User Avatar" class="h-8 w-8 rounded-full object-cover" />
              <span class="hidden md:block text-sm font-medium text-gray-700">{{ userName }}</span>
            </button>

            <div v-if="userMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
              <div class="py-1" role="menu">
                <NuxtLink to="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem" @click="userMenuOpen = false">
                  Mon profil
                </NuxtLink>
                <NuxtLink to="/dashboard/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem" @click="userMenuOpen = false">
                  Paramètres
                </NuxtLink>
                <div class="border-t border-gray-100"></div>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                  role="menuitem">
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu -->
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { IconChevronsRight, IconChevronsLeft, IconLayoutDashboard, IconFileCheck, IconShieldCheck, IconAlertCircle, IconEyeCheck, IconUser, IconSettings, IconLogout, IconMenu2 } from '@tabler/icons-vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isCollapsed = ref(false);
const userMenuOpen = ref(false);
const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
  if (isMobile.value) {
    isCollapsed.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});

const userName = computed(() => authStore.user?.firstName || authStore.user?.emailAddress || 'Utilisateur');
const userProfilePictureUrl = computed(() => authStore.user?.profilePictureUrl || '/img/default-profil.png');

const pageTitle = computed(() => {
  const path = route?.path || '';
  if (path === '/dashboard') return 'Tableau de bord';
  if (path === '/dashboard/profile') return 'Mon profil';
  if (path === '/dashboard/settings') return 'Paramètres';
  if (path.includes('/modules/docsentry')) return 'DocSentry';
  if (path.includes('/modules/secuscan')) return 'SecuScan';
  if (path.includes('/modules/leakmonitor')) return 'LeakMonitor';
  if (path.includes('/modules/vigitech')) return 'VigiTech';
  return '';
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLinkClick = () => {
  if (isMobile.value) {
    isCollapsed.value = true;
  }
};

const logout = () => {
  userMenuOpen.value = false;
  authStore.logout();
  router.push('/');
};
</script>
