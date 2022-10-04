<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';
import MoonIcon from '@svg/MoonIcon.vue';
import SunIcon from '@svg/SunIcon.vue';

const mainStore = useMainStore();
</script>

<template>
  <button
    data-test="toggleDarkMode"
    :title="`Toggle ${mainStore.darkMode ? 'dark' : 'light'} mode`"
    class="flex items-center transition hover:text-sky-400 focus:text-sky-400"
    @click="mainStore.toggleDarkMode"
  >
    <MoonIcon
      v-if="mainStore.darkMode"
      class="w-6"
    />
    <SunIcon
      v-else
      class="w-6"
    />
  </button>
</template>
