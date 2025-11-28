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
        <h2 class="text-4xl font-bold text-white mb-6">Récupérez votre accès</h2>
        <p class="text-lg text-white/90">
          Réinitialisez votre mot de passe en toute sécurité pour retrouver l'accès à votre compte.
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
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Mot de passe oublié</h2>
          <p class="mt-2 text-sm text-gray-600">
            Entrez votre adresse e-mail pour recevoir un lien de réinitialisation
          </p>
        </div>

        <div class="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <form @submit.prevent="handleSubmit" class="space-y-6">
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
              <button type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                :disabled="loading">
                <span v-if="loading">Envoi en cours...</span>
                <span v-else>Envoyer le lien</span>
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

          <div v-if="success" class="mt-4 bg-green-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <IconCircleCheck class="h-5 w-5 text-green-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">
                  Si cette adresse email est associée à un compte, un lien de réinitialisation de mot de passe vous a été envoyé.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  Ou
                </span>
              </div>
            </div>

            <div class="mt-6">
              <NuxtLink to="/auth/login"
                class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                Retour à la connexion
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { IconCircleCheck, IconX } from '@tabler/icons-vue'

const authStore = useAuthStore();

const email = ref('');
const error = ref('');
const success = ref(false);
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;

  try {
    const result = await authStore.forgotPassword(email.value);

    if (result.success) {
      success.value = true;
    } else {
      error.value = result.message;
    }
  } catch (err) {
    console.error(err);
    error.value = 'Une erreur s\'est produite lors de l\'envoi du lien';
  } finally {
    loading.value = false;
  }
};
</script>
