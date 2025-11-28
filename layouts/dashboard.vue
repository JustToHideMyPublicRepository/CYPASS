<template>
  <div class="flex h-screen w-full bg-gray-50 overflow-hidden">

    <div v-if="isMobileMenuOpen" class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-900/80" @click="isMobileMenuOpen = false"></div>
      <div class="fixed inset-0 flex">
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-8 w-auto" src="/img/logo.png" alt="CYPASS">
              <span class="ml-3 text-xl font-bold text-primary-600">CYPASS</span>
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li v-for="item in navigation" :key="item.name">
                      <NuxtLink :to="item.href"
                        class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        :class="[isRouteActive(item.href) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600']"
                        @click="isMobileMenuOpen = false">
                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                        {{ item.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:flex lg:flex-col transition-all duration-300 ease-in-out border-r border-gray-200 bg-white"
         :class="[collapsed ? 'w-20' : 'w-72']">
      
      <div class="flex h-16 shrink-0 items-center border-b border-gray-200 transition-all duration-300"
           :class="collapsed ? 'justify-center px-2' : 'justify-between px-6'">
        
        <NuxtLink v-if="!collapsed" to="/" class="flex items-center overflow-hidden whitespace-nowrap">
          <img class="h-8 w-auto" src="/img/logo.png" alt="CYPASS">
          <span class="ml-3 text-xl font-bold text-primary-600">CYPASS</span>
        </NuxtLink>

        <button @click="collapsed = !collapsed" class="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
             <IconChevronsRight v-if="collapsed" class="w-6 h-6" />
             <IconChevronsLeft v-else class="w-5 h-5" />
        </button>
      </div>

      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 pt-4">
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href"
                    class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 items-center"
                    :class="[isRouteActive(item.href) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600']"
                    :title="collapsed ? item.name : ''">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span v-if="!collapsed" class="whitespace-nowrap">{{ item.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li class="mt-auto">
              <div v-if="!collapsed" class="text-xs font-semibold leading-6 text-gray-400 uppercase mb-2">Compte</div>
              <ul role="list" class="-mx-2 space-y-1">
                 <li v-for="item in userNavigation" :key="item.name">
                  <NuxtLink :to="item.href"
                    class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary-600 items-center"
                    :class="[isRouteActive(item.href) ? 'bg-gray-100' : '']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0 group-hover:text-primary-600" aria-hidden="true" />
                    <span v-if="!collapsed" class="whitespace-nowrap">{{ item.name }}</span>
                  </NuxtLink>
                </li>
                 <li>
                   <button @click="handleLogout" class="w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-red-600 hover:bg-red-50 items-center">
                      <IconLogout class="h-6 w-6 shrink-0" />
                      <span v-if="!collapsed">Déconnexion</span>
                   </button>
                 </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      </div>

    <div class="flex flex-1 flex-col overflow-hidden">
      
      <header class="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="isMobileMenuOpen = true">
          <span class="sr-only">Ouvrir le menu</span>
          <IconMenu2 class="h-6 w-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center">
          <h1 class="text-lg font-semibold leading-6 text-gray-900">{{ currentPageTitle }}</h1>
          
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true"></div>

            <div class="relative">
              <button type="button" class="-m-1.5 flex items-center p-1.5" @click="isUserMenuOpen = !isUserMenuOpen">
                <span class="sr-only">Menu utilisateur</span>
                <img class="h-8 w-8 rounded-full bg-gray-50 object-cover" :src="userAvatar" alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ userName }}</span>
                  <IconChevronDown class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </button>

              <div v-if="isUserMenuOpen" 
                    class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <NuxtLink to="/dashboard/profile" class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50" @click="isUserMenuOpen=false">Mon profil</NuxtLink>
                <NuxtLink to="/dashboard/settings" class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50" @click="isUserMenuOpen=false">Paramètres</NuxtLink>
                <button @click="handleLogout" class="block w-full text-left px-3 py-1 text-sm leading-6 text-red-600 hover:bg-red-50">Déconnexion</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto bg-gray-50">
        <div class="px-4 py-6 sm:px-6 lg:px-8">
           <slot />
        </div>
      </main>
    </div>

    <div v-if="isUserMenuOpen" @click="isUserMenuOpen = false" class="fixed inset-0 z-0 bg-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { 
  IconLayoutDashboard, IconFileCheck, IconShieldCheck, IconAlertCircle, 
  IconEyeCheck, IconUser, IconSettings, IconLogout, IconMenu2, 
  IconChevronsLeft, IconChevronsRight, IconChevronDown
} from '@tabler/icons-vue'


// Configuration
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const collapsed = ref(false)
const isMobile = ref(false)

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: IconLayoutDashboard },
  { name: 'DocSentry', href: '/modules/docsentry', icon: IconFileCheck },
  { name: 'SecuScan', href: '/modules/secuscan', icon: IconShieldCheck },
  { name: 'LeakMonitor', href: '/modules/leakmonitor', icon: IconAlertCircle },
  { name: 'VigiTech', href: '/modules/vigitech', icon: IconEyeCheck },
]

const userNavigation = [
  { name: 'Profil', href: '/dashboard/profile', icon: IconUser },
  { name: 'Paramètres', href: '/dashboard/settings', icon: IconSettings },
]

const userName = computed(() => authStore.user?.firstName || 'Utilisateur')
const userAvatar = computed(() => authStore.user?.profilePictureUrl || '/img/default-profil.png')

const currentPageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Tableau de bord'
  if (path.includes('/profile')) return 'Mon Profil'
  if (path.includes('/settings')) return 'Paramètres'
  
  const activeItem = navigation.find(item => path.includes(item.href) && item.href !== '/dashboard')
  return activeItem ? activeItem.name : 'Dashboard'
})

const isRouteActive = (href: string) => {
  if (href === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(href)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) collapsed.value = false
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>
