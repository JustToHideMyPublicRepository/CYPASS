<template>
  <li class="p-6">
    <div class="relative focus-within:ring-2 focus-within:ring-primary-500">
      <div class="flex items-center space-x-4">
        <!-- Icône -->
        <div class="flex-shrink-0">
          <div :class="iconClasses" class="h-10 w-10 rounded-full flex items-center justify-center">
            <IconFileCertificate v-if="activityType === 'document'" class="h-6 w-6" />
            <IconShieldSearch v-else-if="activityType === 'scan'" class="h-6 w-6" />
          </div>
        </div>

        <!-- Contenu -->
        <div class="min-w-0 flex-1">
          <div class="text-sm font-medium text-gray-900">
            <NuxtLink :to="link" class="hover:underline focus:outline-none">
              {{ title }}
            </NuxtLink>
          </div>
          <p class="text-sm text-gray-500">{{ description }}</p>

          <!-- Métadonnées -->
          <div class="mt-2 flex items-center space-x-4">
            <div class="flex items-center text-sm text-gray-500">
              <IconClock class="h-4 w-4 mr-1.5" />
              {{ formatDateTime(date) }}
            </div>
            <div v-if="activityType === 'scan' && score" class="flex items-center">
              <div :class="[
                score >= 80 ? 'bg-green-100 text-green-800' :
                  score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
              ]" class="px-2.5 py-0.5 rounded-full text-xs font-medium">
                Score: {{ score }}/100
              </div>
            </div>
          </div>
        </div>

        <!-- Action -->
        <div class="flex-shrink-0">
          <button @click="handleDetailsClick" class="text-sm font-medium text-primary-600 hover:text-primary-900">
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { IconShieldSearch, IconFileCertificate, IconClock } from '@tabler/icons-vue'

const props = defineProps({
  activityType: {
    type: String,
    required: true,
    validator: (value) => ['document', 'scan'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  scanId: {
    type: Number,
    default: null
  },
  score: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['show-details']);

const iconClasses = computed(() => ({
  'bg-primary-100 text-primary-600': props.activityType === 'document',
  'bg-secondary-100 text-secondary-600': props.activityType === 'scan'
}));

const handleDetailsClick = () => {
  if (props.activityType === 'scan' && props.scanId) {
    emit('show-details', props.scanId);
  } else {
    navigateTo(props.link);
  }
};

// Formater les dates
const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(date));
};
</script>