<script setup lang="ts">
import ErrorScreen from '@components/ErrorScreen.vue';
import FooterMessage from '@components/FooterMessage.vue';
import NavBar from '@components/navbar/NavBar.vue';
import { useActivity } from '@hooks/useActivity';
import { useMainStore } from '@store/useMainStore';

const mainStore = useMainStore();

useActivity();
</script>

<template>
  <div data-test="appRoot" :class="mainStore.darkMode && 'dark'">
    <div
      class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-100"
    >
      <ErrorScreen v-if="mainStore.errorMode" />
      <template v-else>
        <div class="min-h-screen">
          <NavBar v-if="mainStore.initialized" />
          <main
            class="container"
            :class="$route.name !== 'Home' && 'pt-20 xl:pt-28 mx-auto'"
          >
            <router-view />
          </main>
        </div>
        <FooterMessage />
      </template>
    </div>
  </div>
</template>
