<template>
  <div class="mt-2 space-y-1 text-sm">
    <p class="font-medium text-gray-700">Le mot de passe doit contenir :</p>
    <ul class="list-none p-0 m-0">
      <li :class="{'text-green-600': hasMinLength, 'text-red-600': !hasMinLength}" class="flex items-center">
        <IconCheck v-if="hasMinLength" class="h-4 w-4 mr-2" />
        <IconX v-else class="h-4 w-4 mr-2" />
        Au moins 8 caractères
      </li>
      <li :class="{'text-green-600': hasUppercase, 'text-red-600': !hasUppercase}" class="flex items-center">
        <IconCheck v-if="hasUppercase" class="h-4 w-4 mr-2" />
        <IconX v-else class="h-4 w-4 mr-2" />
        Au moins une lettre majuscule
      </li>
      <li :class="{'text-green-600': hasLowercase, 'text-red-600': !hasLowercase}" class="flex items-center">
        <IconCheck v-if="hasLowercase" class="h-4 w-4 mr-2" />
        <IconX v-else class="h-4 w-4 mr-2" />
        Au moins une lettre minuscule
      </li>
      <li :class="{'text-green-600': hasDigit, 'text-red-600': !hasDigit}" class="flex items-center">
        <IconCheck v-if="hasDigit" class="h-4 w-4 mr-2" />
        <IconX v-else class="h-4 w-4 mr-2" />
        Au moins un chiffre
      </li>
      <li :class="{'text-green-600': hasSpecialChar, 'text-red-600': !hasSpecialChar}" class="flex items-center">
        <IconCheck v-if="hasSpecialChar" class="h-4 w-4 mr-2" />
        <IconX v-else class="h-4 w-4 mr-2" />
        Au moins un caractère spécial (@$!%*?&)
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IconCheck, IconX } from '@tabler/icons-vue';

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
});

const hasMinLength = computed(() => props.password.length >= 8);
const hasUppercase = computed(() => /[A-Z]/.test(props.password));
const hasLowercase = computed(() => /[a-z]/.test(props.password));
const hasDigit = computed(() => /\d/.test(props.password));
const hasSpecialChar = computed(() => /[@$!%*?&]/.test(props.password));
</script>
