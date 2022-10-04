<script setup lang="ts">
import { useTitle } from '@vueuse/core';

import { TITLE_SUFFIX } from '@utils/constants';

import SpinnerCircle from './SpinnerCircle.vue';

useTitle('Loading...' + TITLE_SUFFIX);
</script>

<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen bg-slate-100 dark:bg-slate-900"
  >
    <div class="flex flex-col items-center justify-center w-full h-full">
      <SpinnerCircle class="w-16 h-16" />
    </div>
  </div>
</template>
