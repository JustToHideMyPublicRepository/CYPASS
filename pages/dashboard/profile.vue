<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Mon Profil</h1>
          <p class="mt-1 text-sm text-gray-600">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div class="mt-6">
        <div class="bg-white shadow-sm rounded-lg">
          <div class="p-6">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <!-- Photo de profil -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Photo de profil</label>
                <div class="mt-2 flex items-center space-x-4">
                  <img v-if="profileData.profilePictureUrl" :src="profileData.profilePictureUrl" alt="User Avatar"
                    class="h-16 w-16 rounded-full object-cover" />
                  <div v-else
                    class="h-16 w-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-medium">
                    {{ userInitials }}
                  </div>
                  <button type="button" @click="openProfilePictureModal" class="btn btn-outline">
                    Changer
                  </button>
                </div>
              </div>

              <!-- Informations personnelles -->
              <div>
                <div class="mb-4">
                  <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                  <input v-model="profileData.firstName" type="text" id="firstName" class="input" :disabled="loading" />
                </div>
                <div class="mb-4">
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Nom de famille</label>
                  <input v-model="profileData.lastName" type="text" id="lastName" class="input" :disabled="loading" />
                </div>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
                    <input v-model="profileData.emailAddress" type="email" id="email" class="input" disabled />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input v-model="profileData.phone" type="tel" id="phone" class="input" :disabled="loading" />
                  </div>

                  <div>
                    <label for="company" class="block text-sm font-medium text-gray-700">Structure</label>
                    <input v-model="profileData.company" type="text" id="company" class="input" :disabled="loading" />
                  </div>

                  <div>
                    <label for="jobTitle" class="block text-sm font-medium text-gray-700">Poste</label>
                    <input v-model="profileData.jobTitle" type="text" id="jobTitle" class="input" :disabled="loading" />
                  </div>
                </div>
              </div>

              <!-- Bio -->
              <div>
                <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                <textarea v-model="profileData.bio" id="bio" rows="4" class="input" :disabled="loading"></textarea>
              </div>

              <!-- Boutons -->
              <div class="flex justify-end space-x-3">
                <button type="button" class="btn btn-outline" :disabled="loading" @click="resetProfileData">
                  Annuler
                </button>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <span v-if="loading" class="flex items-center">
                    <IconLoader class="animate-spin h-5 w-5 mr-3" /> Enregistrement...
                  </span>
                  <span v-else>Enregistrer</span>
                </button>
              </div>
            </form>

            <div v-if="message" :class="{ 'bg-green-50 text-green-800': isSuccess, 'bg-red-50 text-red-800': !isSuccess }"
              class="mt-4 p-4 rounded-md">
              <p class="text-sm font-medium">{{ message }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modale de changement de photo de profil -->
      <VueFinalModal v-model="showProfilePictureModal" :esc-to-close="true" :click-to-close="true"
        classes="flex justify-center items-center"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 w-full max-w-md">
        <div class="p-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Changer la photo de profil</h3>
          <div class="flex flex-col items-center space-y-4 mb-6">
            <img v-if="tempProfilePictureUrl" :src="tempProfilePictureUrl" alt="Aperçu"
              class="h-24 w-24 rounded-full object-cover border-2 border-primary-500" />
            <div v-else
              class="h-24 w-24 rounded-full bg-primary-600 text-white flex items-center justify-center text-4xl font-medium border-2 border-primary-500">
              {{ userInitials }}
            </div>
            <p class="text-sm text-gray-500">Aperçu de votre nouvelle photo</p>
          </div>

          <div>
            <label for="newProfilePictureUrl" class="block text-sm font-medium text-gray-700">URL de la photo</label>
            <input v-model="tempProfilePictureUrl" type="text" id="newProfilePictureUrl" class="input"
              placeholder="Collez l'URL de votre image ici" />
            <p v-if="profilePictureUrlError" class="mt-2 text-sm text-red-600">{{ profilePictureUrlError }}</p>
            <p class="mt-2 text-sm text-gray-500">
              Laissez vide pour utiliser l'image par défaut (initiales).
            </p>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" class="btn btn-outline" @click="resetTempProfilePicture">
              Réinitialiser
            </button>
            <button type="button" class="btn btn-primary" @click="saveProfilePicture">
              Mettre à jour
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelProfilePictureEdit">
              Annuler
            </button>
          </div>
        </div>
      </VueFinalModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { IconLoader } from '@tabler/icons-vue';
import { VueFinalModal } from 'vue-final-modal';

const authStore = useAuthStore();
const loading = ref(false);
const message = ref('');
const isSuccess = ref(false);

// Modale photo de profil
const showProfilePictureModal = ref(false);
const tempProfilePictureUrl = ref('');
const profilePictureUrlError = ref('');

let messageTimeout: NodeJS.Timeout | null = null;

const clearMessage = () => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(() => {
    message.value = '';
  }, 5000); 
};

const userInitials = computed(() => {
  if (authStore.user?.firstName && authStore.user?.lastName) {
    return `${authStore.user.firstName[0]}${authStore.user.lastName[0]}`.toUpperCase();
  }
  if (authStore.user?.firstName) {
    return authStore.user.firstName[0].toUpperCase();
  }
  if (authStore.user?.emailAddress) {
    return authStore.user.emailAddress[0].toUpperCase();
  }
  return 'U';
});

// Initialiser profileData avec les valeurs actuelles de l'utilisateur
const initialProfileData = {
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  emailAddress: authStore.user?.emailAddress || '', 
  phone: authStore.user?.phone || '',
  company: authStore.user?.company || '',
  jobTitle: authStore.user?.jobTitle || '',
  bio: authStore.user?.bio || '',
  profilePictureUrl: authStore.user?.profilePictureUrl || '',
};

const profileData = ref({ ...initialProfileData });

const resetProfileData = () => {
  profileData.value = { ...initialProfileData };
  message.value = ''; 
};

const openProfilePictureModal = () => {
  tempProfilePictureUrl.value = profileData.value.profilePictureUrl || '';
  profilePictureUrlError.value = '';
  showProfilePictureModal.value = true;
};

const resetTempProfilePicture = () => {
  tempProfilePictureUrl.value = ''; 
  profilePictureUrlError.value = '';
};

const isValidUrl = (url: string) => {
  if (!url) return true; 
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const saveProfilePicture = async () => {
  profilePictureUrlError.value = '';
  if (tempProfilePictureUrl.value && !isValidUrl(tempProfilePictureUrl.value)) {
    profilePictureUrlError.value = 'Veuillez entrer une URL valide.';
    return;
  }

  loading.value = true;
  message.value = '';
  isSuccess.value = false;

  try {
    const dataToUpdate = {
      profilePictureUrl: tempProfilePictureUrl.value,
    };

    const result = await authStore.updateProfile(dataToUpdate);
    if (result.success) {
      message.value = 'Photo de profil mise à jour avec succès !';
      isSuccess.value = true;
      profileData.value.profilePictureUrl = tempProfilePictureUrl.value;
      initialProfileData.profilePictureUrl = tempProfilePictureUrl.value;
      showProfilePictureModal.value = false;
    } else {
      message.value = result.message || 'Échec de la mise à jour de la photo de profil.';
      isSuccess.value = false;
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la photo de profil:', error);
    message.value = 'Une erreur est survenue lors de la mise à jour de la photo de profil.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
    clearMessage();
  }
};

const cancelProfilePictureEdit = () => {
  showProfilePictureModal.value = false;
  tempProfilePictureUrl.value = '';
  profilePictureUrlError.value = '';
};

const updateProfile = async () => {
  loading.value = true;
  message.value = '';
  isSuccess.value = false;

  try {
    const dataToUpdate = {
      firstName: profileData.value.firstName,
      lastName: profileData.value.lastName,
      phone: profileData.value.phone,
      company: profileData.value.company,
      jobTitle: profileData.value.jobTitle,
      bio: profileData.value.bio,
      // profilePictureUrl n'est pas inclus ici car il est géré par la modale dédiée
    };

    const result = await authStore.updateProfile(dataToUpdate);
    if (result.success) {
      message.value = 'Profil mis à jour avec succès !';
      isSuccess.value = true;
      Object.assign(initialProfileData, profileData.value);
    } else {
      message.value = result.message || 'Échec de la mise à jour du profil.';
      isSuccess.value = false;
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    message.value = 'Une erreur est survenue lors de la mise à jour du profil.';
    isSuccess.value = false;
  } finally {
    loading.value = false;
    clearMessage();
  }
};
</script>
