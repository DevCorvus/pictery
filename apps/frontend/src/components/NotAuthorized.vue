<script setup lang="ts">
import { useTitle } from '@vueuse/core';

import { TITLE_SUFFIX } from '@utils/constants';

useTitle('Not authorized' + TITLE_SUFFIX);
</script>

<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen bg-slate-100 dark:bg-slate-900"
  >
    <div class="flex flex-col items-center justify-center w-full h-full gap-1">
      <p class="text-xl font-semibold md:text-3xl text-slate-500">
        Not authorized
      </p>
      <router-link
        :to="{ name: 'Home' }"
        class="text-lg transition text-sky-500 hover:text-sky-400 focus:text-sky-400"
      >
        Go back to Home
      </router-link>
    </div>
  </div>
</template>
