<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Paramètres</h1>
          <p class="mt-1 text-sm text-gray-600">Gérez vos préférences et la sécurité de votre compte</p>
        </div>
      </div>

      <div class="mt-6 space-y-6">
        <!-- Sécurité -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Sécurité</h2>

            <!-- Mot de passe -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-700">Changer le mot de passe</h3>
              <form @submit.prevent="updatePassword" class="mt-4 space-y-4">
                <div>
                  <label for="current-password" class="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                  <input
                    v-model="passwordData.currentPassword"
                    type="password"
                    id="current-password"
                    class="input"
                    :disabled="loading"
                  />
                </div>

                <div>
                  <label for="new-password" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                  <input
                    v-model="passwordData.newPassword"
                    type="password"
                    id="new-password"
                    class="input"
                    :disabled="loading"
                  />
                </div>

                <div>
                  <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                  <input
                    v-model="passwordData.confirmPassword"
                    type="password"
                    id="confirm-password"
                    class="input"
                    :disabled="loading"
                  />
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="btn btn-primary" :disabled="loading || !canUpdatePassword">
                    <span v-if="loading" class="flex items-center">
                      <IconLoader class="animate-spin h-5 w-5 mr-3" /> Mise à jour...
                    </span>
                    <span v-else>Mettre à jour</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Double authentification -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Double authentification</h3>
                  <p class="mt-1 text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                </div>
                <button
                  @click="toggle2FA"
                  class="btn"
                  :class="is2FAEnabled ? 'btn-danger' : 'btn-primary'"
                >
                  {{ is2FAEnabled ? 'Désactiver' : 'Activer' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Notifications</h2>

            <div class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Alertes de sécurité</h3>
                  <p class="mt-1 text-sm text-gray-500">Recevez des notifications en cas d'activité suspecte</p>
                </div>
                <button
                  @click="toggleNotification('security')"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  :class="[notifications.security ? 'bg-primary-600' : 'bg-gray-200']"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[notifications.security ? 'translate-x-5' : 'translate-x-0']"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Rapports hebdomadaires</h3>
                  <p class="mt-1 text-sm text-gray-500">Recevez un résumé hebdomadaire de vos activités</p>
                </div>
                <button
                  @click="toggleNotification('weekly')"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  :class="[notifications.weekly ? 'bg-primary-600' : 'bg-gray-200']"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[notifications.weekly ? 'translate-x-5' : 'translate-x-0']"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Nouveautés produit</h3>
                  <p class="mt-1 text-sm text-gray-500">Soyez informé des nouvelles fonctionnalités</p>
                </div>
                <button
                  @click="toggleNotification('product')"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  :class="[notifications.product ? 'bg-primary-600' : 'bg-gray-200']"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[notifications.product ? 'translate-x-5' : 'translate-x-0']"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Suppression du compte -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Danger</h2>

            <div class="mt-6">
              <div class="flex items-start">
                <div class="flex-grow">
                  <h3 class="text-sm font-medium text-red-700">Supprimer le compte</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. Soyez certain.
                  </p>
                </div>
                <button
                  @click="confirmDeleteAccount"
                  class="btn btn-danger ml-4"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="message" :class="{'bg-green-50 text-green-800': isSuccess, 'bg-red-50 text-red-800': !isSuccess}" class="mt-4 p-4 rounded-md">
        <p class="text-sm font-medium">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const notifications = ref({
  security: true,
  weekly: false,
  product: true
});

const is2FAEnabled = ref(false);

const canUpdatePassword = computed(() => {
  return passwordData.value.currentPassword &&
         passwordData.value.newPassword &&
         passwordData.value.confirmPassword &&
         passwordData.value.newPassword === passwordData.value.confirmPassword &&
         passwordData.value.newPassword.length >= 8; // Changed to 8 based on backend
});

const updatePassword = async () => {
  if (!canUpdatePassword.value) {
    message.value = 'Veuillez vérifier les mots de passe. Le nouveau mot de passe doit avoir au moins 8 caractères et correspondre à la confirmation.';
    isSuccess.value = false;
    clearMessage();
    return;
  }

  loading.value = true;
  message.value = '';
  isSuccess.value = false;

  try {
    const result = await authStore.updatePassword(passwordData.value);
    if (result.success) {
      message.value = result.message || 'Mot de passe mis à jour avec succès !';
      isSuccess.value = true;
      passwordData.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    } else {
      message.value = result.message || 'Échec de la mise à jour du mot de passe.';
      isSuccess.value = false;
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    message.value = 'Une erreur est survenue lors de la mise à jour du mot de passe.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
    clearMessage();
  }
};

const toggle2FA = () => {
  is2FAEnabled.value = !is2FAEnabled.value;
  // Implement 2FA logic here (e.g., API call to enable/disable 2FA)
  message.value = `Double authentification ${is2FAEnabled.value ? 'activée' : 'désactivée'} (simulation).`;
  isSuccess.value = true;
  clearMessage();
};

const toggleNotification = (type: 'security' | 'weekly' | 'product') => {
  notifications.value[type] = !notifications.value[type];
  // Save preferences (e.g., API call)
  message.value = `Préférence de notification pour "${type}" mise à jour (simulation).`;
  isSuccess.value = true;
  clearMessage();
};

const confirmDeleteAccount = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    message.value = 'Suppression du compte initiée (simulation).';
    isSuccess.value = true;
    clearMessage();
  }
};
</script>
