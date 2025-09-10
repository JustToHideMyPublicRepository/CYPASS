<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Vérification de document</h1>
          <p class="mt-1 text-sm text-gray-600">Vérifiez l'authenticité d'un document</p>
        </div>
      </div>

      <button @click="router.go(-1)" class="btn btn-outline gap-2 flex items-center">
        <IconArrowLeft class="w-5 h-5" />
        Retour
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="bg-white shadow-sm rounded-lg p-6">
        <div class="max-w-3xl mx-auto">
          <div class="space-y-8">
            <!-- Vérification par hash -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Vérification par hash</h3>
              <div class="mt-1">
                <input
                  v-model="hash"
                  type="text"
                  class="input"
                  placeholder="Entrez le hash SHA-256 du document"
                />
                <p class="mt-2 text-sm text-gray-500">
                  Entrez le hash SHA-256 du document que vous souhaitez vérifier
                </p>
                <button 
                  @click="verifyByHash"
                  class="mt-4 btn btn-primary"
                  :disabled="!hash || verifying"
                >
                  {{ verifying ? 'Vérification...' : 'Vérifier' }}
                </button>
              </div>
            </div>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            <!-- Vérification par QR Code -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Scanner un QR Code</h3>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <IconQrcode class="mx-auto h-12 w-12 text-gray-400" />

                  <div class="flex text-sm text-gray-600">
                    <label for="qr-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Télécharger un QR code</span>
                      <input id="qr-upload" name="qr-upload" type="file" class="sr-only" accept="image/*" @change="handleQRUpload">
                    </label>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG jusqu'à 5MB
                  </p>
                </div>
              </div>
            </div>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            <!-- Vérification par document -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Vérifier un document</h3>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <IconFile class="mx-auto h-12 w-12 text-gray-400" />
                  
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Télécharger un document</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" @change="handleFileUpload">
                    </label>
                  </div>
                  <p class="text-xs text-gray-500">
                    PDF, Word, Excel, PowerPoint jusqu'à 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Résultats de la vérification -->
          <div v-if="verificationResult" class="mt-8 p-4 rounded-md" :class="[
            verificationResult.verified ? 'bg-green-50' : 'bg-red-50'
          ]">
            <div class="flex">
              <div class="flex-shrink-0">
                <IconCircleCheck v-if="verificationResult.verified" class="h-5 w-5 text-green-400" />
                <IconCircleX v-else class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium" :class="[
                  verificationResult.verified ? 'text-green-800' : 'text-red-800'
                ]">
                  {{ verificationResult.verified ? 'Document authentique' : 'Document non authentifié' }}
                </h3>
                <div class="mt-2 text-sm" :class="[
                  verificationResult.verified ? 'text-green-700' : 'text-red-700'
                ]">
                  <p>{{ verificationResult.message }}</p>
                  <div v-if="verificationResult.verified && verificationResult.document" class="mt-4">
                    <p><strong>Nom du fichier:</strong> {{ verificationResult.document.filename }}</p>
                    <p><strong>Date d'authentification:</strong> {{ formatDateTime(verificationResult.document.createdAt) }}</p>
                    <p><strong>Hash:</strong> {{ verificationResult.document.hash }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDocumentsStore } from '~/stores/documents';
import CryptoJS from 'crypto-js';
import { useRouter } from 'vue-router'
import { IconArrowLeft, IconQrcode, IconFile, IconCircleCheck, IconCircleX } from '@tabler/icons-vue';

const router = useRouter()

const documentsStore = useDocumentsStore();

const hash = ref('');
const verifying = ref(false);
const verificationResult = ref(null);

// Vérification par hash
const verifyByHash = async () => {
  if (!hash.value) return;
  
  verifying.value = true;
  verificationResult.value = null;
  
  try {
    const result = documentsStore.verifyDocument(hash.value);
    verificationResult.value = result;
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    verificationResult.value = {
      verified: false,
      message: 'Une erreur est survenue lors de la vérification'
    };
  } finally {
    verifying.value = false;
  }
};

// Vérification par QR Code
const handleQRUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Implémenter la lecture du QR code - Simulation avec un hash fixe
  hash.value = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069';
  await verifyByHash();
};

// Vérification par document
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  verifying.value = true;
  verificationResult.value = null;
  
  try {
    // Lecture et génération de hash
    const buffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    const calculatedHash = CryptoJS.SHA256(wordArray).toString();
    
    // Vérifier le hash
    hash.value = calculatedHash;
    await verifyByHash();
  } catch (error) {
    console.error('Erreur lors du calcul du hash:', error);
    verificationResult.value = {
      verified: false,
      message: 'Une erreur est survenue lors de la lecture du fichier'
    };
  } finally {
    verifying.value = false;
  }
};

// Formater les dates
const formatDateTime = (dateString) => {
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(dateString));
};
</script>