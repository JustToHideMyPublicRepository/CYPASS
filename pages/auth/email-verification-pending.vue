<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="CYPASS Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Vérifiez votre adresse e-mail
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Un e-mail de vérification a été envoyé à votre adresse. Veuillez cliquer sur le lien qu'il contient pour activer votre compte.
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <p class="text-sm text-gray-600">
          Vous n'avez pas reçu l'e-mail ?
        </p>
        <button @click="requestNewVerificationEmail" :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <span v-if="loading" class="flex items-center">
            <IconLoader class="animate-spin h-5 w-5 mr-3" /> Envoi en cours...
          </span>
          <span v-else>Renvoyer l'e-mail de vérification</span>
        </button>

        <div v-if="message" :class="{'bg-green-50 text-green-800': isSuccess, 'bg-red-50 text-red-800': !isSuccess}" class="p-3 rounded-md">
          <p class="text-sm font-medium">{{ message }}</p>
        </div>

        <NuxtLink to="/auth/login" class="text-sm font-medium text-primary-600 hover:text-primary-500">
          Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { IconLoader } from '@tabler/icons-vue';

const authStore = useAuthStore();
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

const requestNewVerificationEmail = async () => {
  loading.value = true;
  message.value = '';
  isSuccess.value = false;

  const userEmail = authStore.user?.emailAddress;
  if (!userEmail) {
    message.value = 'Veuillez vous connecter pour demander un nouveau lien de vérification.';
    isSuccess.value = false;
    loading.value = false;
    clearMessage();
    return;
  }

  try {
    const result = await authStore.requestEmailVerification(userEmail);
    if (result.success) {
      message.value = result.message || 'Un nouvel e-mail de vérification a été envoyé.';
      isSuccess.value = true;
    } else {
      message.value = result.message || 'Échec de l\'envoi du nouvel e-mail de vérification.';
      isSuccess.value = false;
    }
  } catch (error) {
    message.value = 'Une erreur est survenue lors de la demande de nouvel e-mail.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
    clearMessage();
  }
};
</script>
