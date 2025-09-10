<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
   <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ModalsContainer />
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal';
</script>