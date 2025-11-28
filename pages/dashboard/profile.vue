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
      <VueFinalModal
        v-model="showProfilePictureModal"
        :esc-to-close="true"
        :click-to-close="true"
        class="flex justify-center items-center"
        content-class="relative flex flex-col max-h-[90vh] mx-4 p-6 border-none rounded-lg bg-white w-full max-w-lg shadow-xl overflow-y-auto"
        overlay-class="fixed inset-0 bg-black bg-opacity-50"
      >
        <div class="p-4">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Changer la photo de profil</h3>
          <div class="flex flex-col items-center space-y-4 mb-6">
            <img v-if="previewProfilePictureUrl" :src="previewProfilePictureUrl" alt="Aperçu"
              class="h-24 w-24 rounded-full object-cover border-2 border-primary-500" />
            <div v-else
              class="h-24 w-24 rounded-full bg-primary-600 text-white flex items-center justify-center text-4xl font-medium border-2 border-primary-500">
              {{ userInitials }}
            </div>
            <p class="text-sm text-gray-500">Aperçu de votre nouvelle photo</p>
          </div>

          <div class="space-y-4">
            <div>
              <label for="file-upload" class="block text-sm font-medium text-gray-700">
                Télécharger un fichier
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <IconPhoto class="mx-auto h-12 w-12 text-gray-400" />
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Sélectionner un fichier</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*"
                        @change="onProfilePictureFileSelected">
                    </label>
                    <p class="pl-1">ou glisser-déposer</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF, WebP jusqu'à 10MB
                  </p>
                  <p v-if="selectedProfilePictureFile" class="text-sm text-gray-700 mt-2">
                    Fichier sélectionné: <span class="font-medium">{{ selectedProfilePictureFile.name }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="relative flex py-5 items-center">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="flex-shrink mx-4 text-gray-400 text-sm">OU</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>

            <div>
              <label for="newProfilePictureUrl" class="block text-sm font-medium text-gray-700">URL de la photo</label>
              <input v-model="tempProfilePictureUrl" type="text" id="newProfilePictureUrl" class="input"
                placeholder="Collez l'URL de votre image ici" @input="onTempProfilePictureUrlInput" />
              <p v-if="profilePictureUrlError" class="mt-2 text-sm text-red-600">{{ profilePictureUrlError }}</p>
              <p class="mt-2 text-sm text-gray-500">
                Laissez vide pour utiliser l'image par défaut (initiales).
              </p>
            </div>
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
import { ref, computed, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { IconLoader, IconPhoto } from '@tabler/icons-vue';
import { VueFinalModal } from 'vue-final-modal';

const authStore = useAuthStore();
const loading = ref(false);
const message = ref('');
const isSuccess = ref(false);

// Modale photo de profil
const showProfilePictureModal = ref(false);
const tempProfilePictureUrl = ref('');
const selectedProfilePictureFile = ref<File | null>(null);
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

// Valeurs actuelles de l'utilisateur
const initialProfileData = {
  firstName: authStore.user?.firstName ?? '',
  lastName: authStore.user?.lastName ?? '',
  emailAddress: authStore.user?.emailAddress ?? '',
  phone: authStore.user?.phone ?? null,
  company: authStore.user?.company ?? null,
  jobTitle: authStore.user?.jobTitle ?? null,
  bio: authStore.user?.bio ?? null,
  profilePictureUrl: authStore.user?.profilePictureUrl ?? null,
};

const profileData = ref({ ...initialProfileData });

// Aperçu de la photo de profil dans la modale
const previewProfilePictureUrl = computed(() => {
  if (selectedProfilePictureFile.value) {
    return URL.createObjectURL(selectedProfilePictureFile.value);
  }
  if (tempProfilePictureUrl.value) {
    return tempProfilePictureUrl.value;
  }
  return profileData.value.profilePictureUrl;
});

const resetProfileData = () => {
  profileData.value = { ...initialProfileData };
  message.value = ''; 
};

const openProfilePictureModal = () => {
  tempProfilePictureUrl.value = profileData.value.profilePictureUrl || '';
  selectedProfilePictureFile.value = null;
  profilePictureUrlError.value = '';
  showProfilePictureModal.value = true;
};

const resetTempProfilePicture = () => {
  tempProfilePictureUrl.value = ''; 
  selectedProfilePictureFile.value = null;
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

const onProfilePictureFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      profilePictureUrlError.value = 'Type de fichier non autorisé. Veuillez sélectionner une image (JPG, PNG, GIF, WebP).';
      selectedProfilePictureFile.value = null;
      input.value = '';
      return;
    }

    if (file.size > maxSize) {
      profilePictureUrlError.value = 'Le fichier est trop volumineux. La taille maximale est de 10MB.';
      selectedProfilePictureFile.value = null;
      input.value = '';
      return;
    }

    selectedProfilePictureFile.value = file;
    tempProfilePictureUrl.value = '';
    profilePictureUrlError.value = '';
  } else {
    selectedProfilePictureFile.value = null;
  }
};

const onTempProfilePictureUrlInput = () => {
  selectedProfilePictureFile.value = null;
  profilePictureUrlError.value = '';
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
    let dataToUpdate: Partial<typeof profileData.value> = {};
    let fileToUpload: File | null = null;

    if (selectedProfilePictureFile.value) {
      fileToUpload = selectedProfilePictureFile.value;
      dataToUpdate = { ...profileData.value };
      delete dataToUpdate.profilePictureUrl;
    } else {
      dataToUpdate = {
        ...profileData.value,
        profilePictureUrl: tempProfilePictureUrl.value === '' ? null : tempProfilePictureUrl.value,
      };
    }

    const result = await authStore.updateProfile(dataToUpdate, fileToUpload);

    if (result.success) {
      message.value = 'Photo de profil mise à jour avec succès !';
      isSuccess.value = true;
      if (result.user?.profilePictureUrl !== undefined) {
        profileData.value.profilePictureUrl = result.user.profilePictureUrl;
        initialProfileData.profilePictureUrl = result.user.profilePictureUrl;
      }
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
  selectedProfilePictureFile.value = null;
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
      // profilePictureUrl est géré par la modale
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

onUnmounted(() => {
  if (selectedProfilePictureFile.value && previewProfilePictureUrl.value) {
    URL.revokeObjectURL(previewProfilePictureUrl.value);
  }
});
</script>
