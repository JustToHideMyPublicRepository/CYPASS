<!-- pages/auth/login.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Image -->
    <div class="hidden lg:flex lg:w-1/2 bg-primary-600 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90"></div>
      <img src="https://cybersecuritymag.africa/sites/default/files/2024-06/formation_en_cybersecurite_au_benin.jpeg"
        alt="Security" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
      <div class="relative z-10 flex flex-col justify-center px-12">
        <div class="flex items-center mb-8">
          <img class="h-12 w-12" src="/img/logo.png" alt="Logo" />
          <span class="ml-4 text-3xl font-bold text-white">CYPASS</span>
        </div>
        <h2 class="text-4xl font-bold text-white mb-6">Sécurisez votre avenir numérique</h2>
        <p class="text-lg text-white/90">
          La première plateforme béninoise souveraine de cybersécurité, offrant des solutions avancées pour
          l'authentification de documents, l'audit de sites web et la détection proactive des menaces.
        </p>
      </div>
    </div>

    <!-- Formulaire -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <div class="flex justify-center lg:hidden">
            <img class="h-12 w-12" src="/img/logo.png" alt="Logo" />
          </div>
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Connexion</h2>
          <p class="mt-2 text-sm text-gray-600">
            Ou
            <NuxtLink to="/auth/signup" class="font-medium text-primary-600 hover:text-primary-500">
              créer un nouveau compte
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <div class="mt-1">
                <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="input"
                  :disabled="loading" />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div class="mt-1 relative">
                <input v-model="password" id="password" name="password" :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password" required class="input pr-10" :disabled="loading" />
                <button type="button" @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                  <IconEye v-if="!showPassword" class="h-5 w-5" />
                  <IconEyeOff v-else class="h-5 w-5" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input v-model="rememberMe" id="remember-me" name="remember-me" type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>

              <div class="text-sm">
                <NuxtLink to="/auth/forgot-password" class="font-medium text-primary-600 hover:text-primary-500">
                  Mot de passe oublié?
                </NuxtLink>
              </div>
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500  disabled:bg-gray-400 disabled:cursor-not-allowed" :disabled="loading || !isFormValid">
                <span v-if="loading" class="flex items-center">
                  <IconLoader class="animate-spin h-5 w-5 mr-3" /> Connexion en cours...
                </span>
                <span v-else>Se connecter</span>
              </button>
            </div>
          </form>

          <div v-if="error" class="mt-4 bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <IconX class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import { IconX, IconLoader, IconEye, IconEyeOff } from '@tabler/icons-vue';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const loading = ref(false);

const showPassword = ref(false);

let messageTimeout: NodeJS.Timeout | null = null;

const clearMessage = () => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(() => {
    error.value = '';
  }, 5000);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isFormValid = computed(() => {
  return email.value.includes('@') &&
    password.value.length > 0;
});

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const result = await authStore.login(email.value, password.value, rememberMe.value);

    if (result.success) {
      router.push('/dashboard');
    } else {
      error.value = result.message;
      clearMessage();
    }
  } catch (err) {
    console.error(err);
    error.value = 'Une erreur s\'est produite lors de la connexion';
    clearMessage();
  } finally {
    loading.value = false;
  }
};
</script>
