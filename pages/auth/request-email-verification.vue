<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="CYPASS Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Demander un nouveau lien de vérification
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Entrez votre adresse e-mail pour recevoir un nouveau lien de vérification.
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
              <span v-if="loading" class="flex items-center">
                <IconLoader class="animate-spin h-5 w-5 mr-3" /> Envoi en cours...
              </span>
              <span v-else>Envoyer le lien</span>
            </button>
          </div>
        </form>

        <div v-if="message" :class="{'bg-green-50 text-green-800': isSuccess, 'bg-red-50 text-red-800': !isSuccess}" class="mt-4 p-4 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <IconCircleCheck v-if="isSuccess" class="h-5 w-5 text-green-400" />
              <IconX v-else class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">{{ message }}</p>
            </div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { IconLoader, IconCircleCheck, IconX } from '@tabler/icons-vue';

const authStore = useAuthStore();

const email = ref('');
const loading = ref(false);
const message = ref('');
const isSuccess = ref(false);

let messageTimeout: NodeJS.Timeout | null = null;

const clearMessage = () => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(() => {
    message.value = '';
  }, 5000); 
};

const handleSubmit = async () => {
  loading.value = true;
  message.value = '';
  isSuccess.value = false;

  try {
    const result = await authStore.requestEmailVerification(email.value);
    if (result.success) {
      message.value = result.message || 'Si un compte correspondant est trouvé, un e-mail de vérification a été envoyé à cette adresse.';
      isSuccess.value = true;
    } else {
      message.value = result.message || 'Échec de l\'envoi du lien de vérification.';
      isSuccess.value = false;
    }
  } catch (err) {
    console.error(err);
    message.value = 'Une erreur s\'est produite lors de l\'envoi du lien.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
    clearMessage();
  }
};
</script>
