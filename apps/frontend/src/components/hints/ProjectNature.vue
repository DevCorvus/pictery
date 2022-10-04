<script setup lang="ts">
import ExclamationIcon from '@svg/ExclamationIcon.vue';
</script>

<template>
  <div
    class="absolute bottom-0 flex items-center justify-center w-4/5 gap-2 p-4 text-yellow-600 -translate-x-1/2 border-b-4 border-yellow-600 rounded-lg shadow-md dark:text-yellow-100 bg-yellow-50 dark:bg-yellow-900 left-1/2 -mb-14 md:-mb-8 md:w-auto"
  >
    <ExclamationIcon class="w-8 h-8 min-w-fit" />
    <p class="text-sm">
      This is a demo of a personal project that is not intended for the general
      public. Use with caution.
    </p>
  </div>
</template>
