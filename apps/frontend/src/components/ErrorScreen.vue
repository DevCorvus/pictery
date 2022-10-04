<script setup lang="ts">
import { useTitle } from '@vueuse/core';

import { TITLE_SUFFIX } from '@utils/constants';

useTitle('Unexpected error' + TITLE_SUFFIX);
</script>

<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen bg-slate-100 dark:bg-slate-900"
  >
    <div class="flex flex-col items-center justify-center w-full h-full">
      <p class="text-xl font-semibold text-red-400 md:text-3xl">
        Something went wrong .(
      </p>
      <p class="text-red-300">
        reload or try again later
      </p>
    </div>
  </div>
</template>
