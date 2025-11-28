<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">DocSentry</h1>
          <p class="mt-1 text-sm text-gray-600">Authentification de documents sensibles</p>
        </div>
        <div class="mt-4 md:mt-0 space-x-3">
          <NuxtLink to="/modules/docsentry/verifier" class="btn btn-outline inline-flex items-center">
            <IconShieldCheck class="h-5 w-5 mr-2" />
            Vérifier un document
          </NuxtLink>
          <button
            @click="showUploadModal = true"
            class="btn btn-primary inline-flex items-center"
          >
            <IconUpload class="h-5 w-5 mr-2" />
            Authentifier un document
          </button>
        </div>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Mes documents authentifiés</h2>
        
        <div v-if="userDocuments.length === 0 && !documentsStore.loading" class="text-center py-10">
          <IconFileCertificate class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun document</h3>
          <p class="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier document à authentifier.</p>
          <div class="mt-6">
            <button
              @click="showUploadModal = true"
              class="btn btn-primary inline-flex items-center"
            >
              <IconUpload class="h-5 w-5 mr-2" />
              Authentifier un document
            </button>
          </div>
        </div>

        <div v-else-if="documentsStore.loading" class="text-center py-10">
          <IconLoader class="animate-spin h-10 w-10 text-primary-600 mx-auto" />
          <p class="mt-4 text-lg text-gray-600">Chargement des documents...</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du fichier</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="doc in userDocuments" :key="doc.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <IconFileCertificate class="h-5 w-5 text-gray-400 mr-2" />
                    <div class="text-sm font-medium text-gray-900">{{ doc.filename }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ truncateHash(doc.hash) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ formatDateTime(doc.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewDocument(doc)" class="text-primary-600 hover:text-primary-900">
                      Voir
                    </button>
                    <button @click="downloadCertificate(doc.id)" class="text-secondary-600 hover:text-secondary-900">
                      Télécharger
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Informations complémentaires -->
      <aboutDocSentry />
    </div>
    
    <!-- Modal d'upload de document -->
    <div v-if="showUploadModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                <IconUpload class="h-6 w-6 text-primary-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Authentifier un document
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Téléchargez un document pour générer son empreinte cryptographique (hash) et son certificat d'authenticité.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="mt-5">
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <IconFileCertificate class="mx-auto h-12 w-12 text-gray-400" />
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Télécharger un fichier</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" @change="onFileSelected">
                    </label>
                    <p class="pl-1">ou glisser-déposer</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PDF, Word, Excel, PowerPoint (max. 10MB)
                  </p>
                </div>
              </div>
              
              <div v-if="selectedFile" class="mt-4">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div class="flex items-center">
                    <IconFileCertificate class="h-5 w-5 text-gray-400 mr-2" />
                    <span class="text-sm font-medium truncate">{{ selectedFile.name }}</span>
                  </div>
                  <button @click="selectedFile = null" class="text-gray-400 hover:text-gray-500">
                    <IconX class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div v-if="uploadError" class="mt-4 text-sm text-red-600">{{ uploadError }}</div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="authenticateDocument" 
              :disabled="!selectedFile || processing || !!uploadError"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processing">Traitement...</span>
              <span v-else>Authentifier</span>
            </button>
            <button 
              @click="showUploadModal = false; selectedFile = null; uploadError = '';" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de succès -->
    <div v-if="showSuccessModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <IconCheck class="h-6 w-6 text-green-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Document authentifié
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Votre document a été authentifié avec succès. Vous pouvez maintenant télécharger le certificat ou accéder à la page de vérification.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="mt-5" v-if="newDocument">
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700">Informations d'authentification</h4>
                <div class="mt-2 bg-gray-50 p-3 rounded-md">
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Hash:</span> {{ newDocument.hash }}
                  </p>
                  <p class="text-sm text-gray-600 mt-1">
                    <span class="font-medium">Date:</span> {{ formatDateTime(newDocument.createdAt) }}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-700">QR Code de vérification</h4>
                <div class="mt-2 flex items-center justify-center">
                  <img v-if="newDocument.qrCodeUrl" :src="newDocument.qrCodeUrl" alt="QR Code" class="h-32 w-32 object-contain" />
                  <div v-else class="h-32 w-32 bg-gray-100 flex items-center justify-center rounded-md">
                    <span class="text-gray-500 text-sm">QR Code non disponible</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500 text-center">
                  Scannez ce code pour vérifier l'authenticité du document.
                </p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="downloadCertificate(newDocument?.id)" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Télécharger le certificat
            </button>
            <button 
              @click="showSuccessModal = false; newDocument = null;" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Composant de message -->
    <MessageModal
      :show="showMessageModal"
      :type="messageType"
      :title="messageTitle"
      :message="messageText"
      :confirm-text="messageConfirmText"
      :cancel-text="messageCancelText"
      @confirm="handleMessageConfirm"
      @cancel="handleMessageCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useDocumentsStore } from '~/stores/documents';
import aboutDocSentry from '~/components/modAbout/aboutDocSentry.vue'; // Corrected import
import MessageModal from '~/components/ui/MessageModal.vue';
import { IconShieldCheck, IconUpload, IconFileCertificate, IconX, IconCheck, IconLoader } from '@tabler/icons-vue';
import type { Document } from '~/types';

// Stores
const authStore = useAuthStore();
const documentsStore = useDocumentsStore();

// État local
const showUploadModal = ref(false);
const showSuccessModal = ref(false);
const selectedFile = ref<File | null>(null);
const processing = ref(false);
const newDocument = ref<Document | null>(null);
const uploadError = ref('');

// État pour le composant de message
const showMessageModal = ref(false);
const messageType = ref<'success' | 'error' | 'warning' | 'info'>('info');
const messageTitle = ref('');
const messageText = ref('');
const messageConfirmText = ref('');
const messageCancelText = ref('Fermer');

// Récupérer les documents de l'utilisateur
const user = computed(() => authStore.user);
const userDocuments = computed(() => documentsStore.getUserDocuments(user.value?.id || '')); // Corrected default value for id

onMounted(() => {
  if (user.value?.id) {
    documentsStore.fetchUserDocuments();
  }
});

// Gestion de l'upload de fichier
const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    selectedFile.value = null;
    uploadError.value = '';
    return;
  }
  
  // Vérifier le type et la taille du fichier
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    uploadError.value = 'Type de fichier non pris en charge. Seuls les documents PDF, Word, Excel et PowerPoint sont acceptés.';
    selectedFile.value = null;
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB
    uploadError.value = 'Le fichier est trop volumineux. La taille maximale est de 10MB.';
    selectedFile.value = null;
    return;
  }
  
  selectedFile.value = file;
  uploadError.value = '';
};

// Authentifier un document
const authenticateDocument = async () => {
  if (!selectedFile.value || !user.value?.id) return;
  
  processing.value = true;
  uploadError.value = '';
  
  try {
    const metadata = {
      author: user.value.firstName + ' ' + user.value.lastName,
      organization: user.value.company || 'N/A',
      department: user.value.jobTitle || 'N/A',
    };

    const result = await documentsStore.authenticateDocument(selectedFile.value, metadata);
    
    if (result.success && result.document) {
      newDocument.value = result.document;
      showUploadModal.value = false;
      showSuccessModal.value = true;
      selectedFile.value = null;
    } else {
      uploadError.value = result.message || 'Échec de l\'authentification du document.';
      if (result.existingDocument) {
        uploadError.value += ` Ce document a déjà été authentifié le ${formatDateTime(result.existingDocument.createdAt)}.`;
      }
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'authentification du document', error);
    uploadError.value = error.message || 'Une erreur s\'est produite lors de l\'authentification du document. Veuillez réessayer.';
  } finally {
    processing.value = false;
  }
};

// Voir les détails d'un document
const viewDocument = (doc: Document) => {
  newDocument.value = doc;
  showSuccessModal.value = true;
};

// Télécharger le certificat
const downloadCertificate = async (docId?: string) => {
  if (!docId) return;
  
  try {
    const result = await documentsStore.downloadCertificate(docId);
    if (result.success) {
      showMessage('success', 'Téléchargement réussi', result.message || 'Le certificat a été téléchargé avec succès.');
    } else {
      showMessage('error', 'Erreur de téléchargement', result.message || 'Une erreur est survenue lors du téléchargement.');
    }
  } catch (error) {
    showMessage('error', 'Erreur de téléchargement', 'Une erreur inattendue est survenue.');
  }
};

// Fonction pour afficher les messages
const showMessage = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, confirmText?: string) => {
  messageType.value = type;
  messageTitle.value = title;
  messageText.value = message;
  messageConfirmText.value = confirmText || '';
  showMessageModal.value = true;
};

// Gestionnaires pour le composant de message
const handleMessageConfirm = () => {
  showMessageModal.value = false;
};

const handleMessageCancel = () => {
  showMessageModal.value = false;
};

// Formater les dates
const formatDateTime = (dateString: string) => {
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(dateString));
};

// Tronquer le hash pour l'affichage
const truncateHash = (hash: string) => {
  if (!hash) return '';
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
};
</script>
