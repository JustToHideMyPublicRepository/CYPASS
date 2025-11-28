<template>
  <li class="py-5">
    <div class="relative focus-within:ring-2 focus-within:ring-primary-500">
      <div class="flex items-center space-x-4">
        <!-- Icône -->
        <div :class="[activity.bg, 'h-8 w-8 rounded-full flex items-center justify-center']">
          <component :is="activity.icon" class="h-5 w-5" />
        </div>

        <!-- Contenu -->
        <div class="min-w-0 flex-1">
          <div class="text-sm font-medium text-gray-900">
            <NuxtLink :to="activity.linkTo" class="hover:underline focus:outline-none">
              {{ activity.title }}
            </NuxtLink>
          </div>
          <p class="text-sm text-gray-500">{{ activity.description }}</p>
        </div>

         <!-- Métadonnées -->
        <div class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
          {{ formatDate(activity.date) }}
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  activity: {
    type: Object,
    required: true
  },
  formatDate: {
    type: Function,
    required: true
  }
});
</script>
