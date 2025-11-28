<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
      <button @click="router.go(-1)" class="btn btn-outline gap-2 flex items-center">
        <IconArrowLeft class="w-5 h-5" />
        Retour
      </button>
    </div>

    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-10">
        <div class="flex justify-center">
          <img class="h-12 w-12" src="/img/logo.png" alt="Logo" />
        </div>
        <h1 class="mt-6 text-3xl font-extrabold text-gray-900">Vérification</h1>
        <p class="mt-2 text-gray-600">
          Vérifiez l'authenticité d'un document
        </p>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="max-w-xl mx-auto">
            <form @submit.prevent="verifyDocument">
              <div class="space-y-6">
                <div>
                  <label for="hash" class="block text-sm font-medium text-gray-700">
                    Hash du document
                  </label>
                  <div class="mt-1">
                    <input v-model="hash" id="hash" name="hash" type="text" class="input"
                      placeholder="Entrez le hash SHA-256 du document" :disabled="loading" />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Entrez le hash SHA-256 du document que vous souhaitez vérifier
                  </p>
                </div>

                <div class="flex justify-center">
                  <span class="text-gray-500">ou</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Scanner un QR code
                  </label>
                  <div
                    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <IconQrcode class="mx-auto h-12 w-12 text-gray-400" />

                      <div class="flex text-sm text-gray-600">
                        <label for="qr-upload"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>Télécharger un QR code</span>
                          <input id="qr-upload" name="qr-upload" type="file" class="sr-only" accept="image/*"
                            @change="handleQRUpload">
                        </label>
                      </div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG jusqu'à 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" class="w-full btn btn-primary" :disabled="!hash || loading">
                    <span v-if="loading">Vérification en cours...</span>
                    <span v-else>Vérifier le document</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IconArrowLeft, IconQrcode } from '@tabler/icons-vue';

const router = useRouter();
const hash = ref('');
const loading = ref(false);

const verifyDocument = async () => {
  if (!hash.value) return;

  loading.value = true;
  try {
    // Rediriger vers la page de détails du document
    await router.push(`/verifier/${hash.value}`);
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
  } finally {
    loading.value = false;
  }
};

const handleQRUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  // Simulation pour l'instant: extraire le hash du QR code
  // Dans une application réelle, vous utiliseriez une bibliothèque pour lire le QR code
  // et extraire le hash qu'il contient.
  setTimeout(() => {
    hash.value = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'; // Exemple de hash
  }, 500);
};
</script>
