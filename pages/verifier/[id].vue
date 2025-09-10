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
        <h1 class="mt-6 text-3xl font-extrabold text-gray-900">Statut de vérification</h1>
        <p class="mt-2 text-gray-600">
          Vérification de l'authenticité d'un document
        </p>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="border-b border-gray-200">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Résultat de vérification
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Informations sur l'authenticité du document
              </p>
            </div>
            <div v-if="document">
              <div v-if="verification.verified"
                class="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-flex items-center">
                <IconCircleCheck class="text-green-800 mr-2 inline-flex items-center" />
                <span>Document authentique</span>
              </div>
              <div v-else class="bg-red-100 text-red-800 px-4 py-2 rounded-full inline-flex items-center">
                <IconAlertTriangle class="bg-red-100 text-red-800 px-4 py-2 rounded-full inline-flex items-center" />
                <span>Document non authentifié</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="p-12 text-center">
          <IconLoader class="animate-spin h-10 w-10 text-primary-600 mx-auto" />
          <p class="mt-4 text-lg text-gray-600">Vérification en cours...</p>
        </div>

        <div v-else-if="!document" class="p-12 text-center">
          <IconNotesOff class="h-12 w-12 text-red-500 mx-auto" />
          <h2 class="mt-4 text-xl font-medium text-gray-900">Document non trouvé</h2>
          <p class="mt-2 text-gray-600">
            Le document que vous cherchez n'existe pas ou n'a pas été authentifié par CYPASS.
          </p>
          <div class="mt-6">
            <NuxtLink to="/verifier" class="btn btn-primary">
              Vérifier un autre document
            </NuxtLink>
          </div>
        </div>

        <div v-else class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Nom du fichier
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ document.filename }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Type de fichier
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ document.type }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Taille
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ document.size }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Empreinte (hash)
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all">
                {{ document.hash }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Date d'authentification
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formatDateTime(document.createdAt) }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Dernière modification
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formatDateTime(document.lastModified) }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Métadonnées
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div class="space-y-2">
                  <p><span class="font-medium">Auteur:</span> {{ document.metadata.author }}</p>
                  <p><span class="font-medium">Organisation:</span> {{ document.metadata.organization }}</p>
                  <p><span class="font-medium">Département:</span> {{ document.metadata.department }}</p>
                </div>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Statut
              </dt>
              <dd class="mt-1 sm:mt-0 sm:col-span-2">
                <span v-if="verification.verified"
                  class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Authentique
                </span>
                <span v-else class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                  Non authentifié
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div v-if="document" class="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200">
          <div class="sm:flex sm:justify-end sm:items-center">
            <div>
              <NuxtLink to="/verifier" class="btn btn-primary">
                Vérifier un autre document
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentsStore } from '~/stores/documents';
import { IconArrowLeft, IconLoader, IconCircleCheck, IconAlertTriangle, IconNotesOff } from '@tabler/icons-vue'

const route = useRoute();
const router = useRouter();
const documentsStore = useDocumentsStore();

const loading = ref(true);
const document = ref(null);
const verification = ref({ verified: false });

onMounted(async () => {
  // Simulation
  await new Promise(resolve => setTimeout(resolve, 1500));

  const id = route.params.id;
  const result = documentsStore.verifyDocument(id);

  if (result.verified) {
    document.value = result.document;
    verification.value = { verified: true };
  }

  loading.value = false;
});

// Dates
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