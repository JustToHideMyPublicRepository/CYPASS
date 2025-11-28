<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="CYPASS Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Vérification de votre adresse e-mail
        </h2>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center">
        <IconLoader class="animate-spin h-12 w-12 text-primary-600" />
        <p class="mt-4 text-lg text-gray-600">Vérification en cours...</p>
      </div>

      <div v-else>
        <div v-if="isSuccess" class="bg-green-50 p-6 rounded-lg shadow-md">
          <IconCircleCheck class="mx-auto h-16 w-16 text-green-600" />
          <h3 class="mt-4 text-xl font-semibold text-green-800">Vérification réussie !</h3>
          <p class="mt-2 text-green-700">{{ message }}</p>
          <NuxtLink v-if="authStore.isAuthenticated" to="/dashboard" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Accéder au tableau de bord
          </NuxtLink>
          <NuxtLink v-else to="/auth/login" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Se connecter
          </NuxtLink>
        </div>

        <div v-else class="bg-red-50 p-6 rounded-lg shadow-md">
          <IconCircleX class="mx-auto h-16 w-16 text-red-600" />
          <h3 class="mt-4 text-xl font-semibold text-red-800">Échec de la vérification</h3>
          <p class="mt-2 text-red-700">{{ message }}</p>
          <NuxtLink to="/auth/request-email-verification" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Demander un nouveau lien
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { IconLoader, IconCircleCheck, IconCircleX } from '@tabler/icons-vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const isSuccess = ref(false);
const message = ref('');

onMounted(async () => {
  const token = route.query.token as string;

  if (!token) {
    message.value = 'Jeton de vérification manquant dans l\'URL. Veuillez vérifier le lien.';
    isSuccess.value = false;
    loading.value = false;
    return;
  }

  try {
    const result = await authStore.verifyEmail(token);
    if (result.success) {
      message.value = result.message;
      isSuccess.value = true;
      await nextTick();
      if (authStore.isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    } else {
      message.value = result.message;
      isSuccess.value = false;
    }
  } catch (error) {
    console.error('Error during email verification:', error);
    message.value = 'Une erreur inattendue est survenue lors de la tentative de vérification. Veuillez réessayer ou contacter le support.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
  }
});
</script>
