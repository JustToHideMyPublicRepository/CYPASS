<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="CYPASS Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Réinitialiser votre mot de passe
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Entrez votre nouveau mot de passe.
        </p>
      </div>

      <div class="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleResetPassword" class="space-y-6">
          <div>
            <label for="new-password" class="block text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <div class="mt-1 relative">
              <input v-model="newPassword" id="new-password" name="new-password"
                :type="showPassword ? 'text' : 'password'" required class="input pr-10" :disabled="loading" />
              <button type="button" @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                <IconEye v-if="!showPassword" class="h-5 w-5" />
                <IconEyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <PasswordStrengthIndicator v-if="newPassword" :password="newPassword" />
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">
              Confirmer le nouveau mot de passe
            </label>
            <div class="mt-1 relative">
              <input v-model="confirmPassword" id="confirm-password" name="confirm-password"
                :type="showConfirmPassword ? 'text' : 'password'" required class="input pr-10" :disabled="loading" />
              <button type="button" @click="toggleConfirmPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                <IconEye v-if="!showConfirmPassword" class="h-5 w-5" />
                <IconEyeOff v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <button type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              :disabled="loading || !isFormValid">
              <span v-if="loading" class="flex items-center">
                <IconLoader class="animate-spin h-5 w-5 mr-3" /> Réinitialisation...
              </span>
              <span v-else>Réinitialiser le mot de passe</span>
            </button>
          </div>
        </form>

        <div v-if="message" :class="{ 'bg-green-50 text-green-800': isSuccess, 'bg-red-50 text-red-800': !isSuccess }"
          class="mt-4 p-4 rounded-md">
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { IconLoader, IconCircleCheck, IconX, IconEye, IconEyeOff } from '@tabler/icons-vue';
import PasswordStrengthIndicator from '~/components/PasswordStrengthIndicator.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const token = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const message = ref('');
const isSuccess = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

let messageTimeout: NodeJS.Timeout | null = null;

const clearMessage = () => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(() => {
    message.value = '';
  }, 5000);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const isFormValid = computed(() => {
  return newPassword.value.length >= 8 && // Minimum 8 caractères
    newPassword.value === confirmPassword.value &&
    /[A-Z]/.test(newPassword.value) && // Au moins une majuscule
    /[a-z]/.test(newPassword.value) && // Au moins une minuscule
    /\d/.test(newPassword.value) && // Au moins un chiffre
    /[@$!%*?&]/.test(newPassword.value); // Au moins un caractère spécial
});

onMounted(() => {
  const queryToken = route.query.token as string;
  if (queryToken) {
    token.value = queryToken;
  } else {
    message.value = 'Jeton de réinitialisation manquant dans l\'URL.';
    isSuccess.value = false;
    clearMessage();
  }
});

const handleResetPassword = async () => {
  if (!token.value) {
    message.value = 'Jeton de réinitialisation invalide ou manquant.';
    isSuccess.value = false;
    clearMessage();
    return;
  }

  if (!isFormValid.value) {
    message.value = 'Veuillez vous assurer que les mots de passe correspondent et respectent les critères de sécurité.';
    isSuccess.value = false;
    clearMessage();
    return;
  }

  loading.value = true;
  message.value = '';
  isSuccess.value = false;

  try {
    const result = await authStore.resetPassword(token.value, newPassword.value);
    if (result.success) {
      message.value = result.message || 'Votre mot de passe a été réinitialisé avec succès.';
      isSuccess.value = true;
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } else {
      message.value = result.message || 'Échec de la réinitialisation du mot de passe.';
      isSuccess.value = false;
    }
  } catch (err) {
    console.error(err);
    message.value = 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
    clearMessage();
  }
};
</script>
