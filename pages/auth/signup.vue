<template>
  <div class="min-h-screen flex">
    <!-- Image -->
    <div class="hidden lg:flex lg:w-1/2 bg-primary-600 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90"></div>
      <img src="https://cio-mag.com/wp-content/uploads/2018/03/A-1.jpg" alt="Security"
        class="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
      <div class="relative z-10 flex flex-col justify-center px-12">
        <div class="flex items-center mb-8">
          <img class="h-12 w-12" src="/img/logo.png" alt="Logo" />
          <span class="ml-4 text-3xl font-bold text-white">CYPASS</span>
        </div>
        <h2 class="text-4xl font-bold text-white mb-6">Rejoignez la révolution de la cybersécurité</h2>
        <p class="text-lg text-white/90">
          Créez votre compte et commencez à protéger vos actifs numériques avec la première plateforme béninoise de
          cybersécurité.
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
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p class="mt-2 text-sm text-gray-600">
            Ou
            <NuxtLink to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500">
              connectez-vous à votre compte
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <form @submit.prevent="handleSignup" class="space-y-6">
            <!-- Prénom et Nom sur la même ligne -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <div class="mt-1">
                  <input v-model="firstName" id="firstName" name="firstName" type="text" required class="input"
                    :disabled="loading" />
                </div>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  Nom de famille
                </label>
                <div class="mt-1">
                  <input v-model="lastName" id="lastName" name="lastName" type="text" required class="input"
                    :disabled="loading" />
                </div>
              </div>
            </div>

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
                  required class="input pr-10" :disabled="loading" />
                <button type="button" @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                  <IconEye v-if="!showPassword" class="h-5 w-5" />
                  <IconEyeOff v-else class="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div class="mt-1 relative">
                <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'" required class="input pr-10" :disabled="loading" />
                <button type="button" @click="toggleConfirmPasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                  <IconEye v-if="!showConfirmPassword" class="h-5 w-5" />
                  <IconEyeOff v-else class="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <!-- Indicateur du mot de passe -->
            <PasswordStrengthIndicator v-if="password" :password="password" />

            <div>
              <button type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                :disabled="loading || !isFormValid">
                <span v-if="loading" class="flex items-center">
                  <IconLoader class="animate-spin h-5 w-5 mr-3" /> Création en cours...
                </span>
                <span v-else>Créer mon compte</span>
              </button>
            </div>
          </form>

          <div v-if="error" class="mt-4 bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <IconX class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ error.message }}</h3>
                <ul v-if="error.errors && error.errors.length > 0" class="mt-1 list-disc pl-5 text-red-700">
                  <li v-for="(err, index) in error.errors" :key="index">{{ err }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <p class="text-xs text-center text-gray-600">
              En créant un compte, vous acceptez nos
              <a href="#" class="text-primary-600 hover:text-primary-500">Conditions d'utilisation</a>
              et notre
              <a href="#" class="text-primary-600 hover:text-primary-500">Politique de confidentialité</a>
            </p>
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
import PasswordStrengthIndicator from '~/components/PasswordStrengthIndicator.vue';

const authStore = useAuthStore();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref<{ message: string; errors?: string[] } | null>(null);
const loading = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

let messageTimeout: NodeJS.Timeout | null = null;

const clearMessage = () => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(() => {
    error.value = null;
  }, 5000);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const isFormValid = computed(() => {
  return firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    email.value.includes('@') &&
    password.value.length > 0 &&
    confirmPassword.value.length > 0 &&
    password.value === confirmPassword.value;
});

const handleSignup = async () => {
  if (!isFormValid.value) {
    error.value = { message: 'Veuillez remplir tous les champs obligatoires et vous assurer que les mots de passe correspondent.' };
    clearMessage();
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const result = await authStore.signup({
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      password: password.value
    });

    if (result.success) {
      router.push('/auth/email-verification-pending');
    } else {
      error.value = {
        message: result.message || 'Une erreur inconnue est survenue.',
        errors: result.errors || []
      };
      clearMessage();
    }
  } catch (err) {
    console.error(err);
    error.value = { message: 'Une erreur s\'est produite lors de la création du compte.' };
    clearMessage();
  } finally {
    loading.value = false;
  }
};
</script>
