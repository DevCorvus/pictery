<script setup lang="ts">
import { ref, watch } from 'vue';

import { useMainStore } from '@store/useMainStore';
import { useUserStore } from '@store/useUserStore';
import CameraSolidIcon from '@svg/CameraSolidIcon.vue';

const mainStore = useMainStore();
const userStore = useUserStore();

const showAnimation = ref(true);

function handleAnimationEnd() {
  showAnimation.value = false;
  setTimeout(() => {
    if (mainStore.loadingMode) {
      showAnimation.value = true;
    }
  }, 200);
}

watch(mainStore, () => {
  if (mainStore.loadingMode) showAnimation.value = true;
});
</script>

<template>
  <router-link
    data-test="headerLink"
    :to="{ name: userStore.isAuthenticated ? 'Dashboard' : 'Home' }"
    :title="
      userStore.isAuthenticated ? 'Go to your Dashboard' : 'Go to the Home page'
    "
    class="flex items-center gap-1 text-lg font-semibold transition md:gap-2 md:text-xl text-sky-500 hover:text-sky-400 focus:text-sky-400"
  >
    <CameraSolidIcon
      class="w-5 md:w-6"
      :class="showAnimation && 'spin'"
      @animationend="handleAnimationEnd"
    />
    <span>
      {{ userStore.isAuthenticated ? 'Dashboard' : 'Pictery' }}
    </span>
  </router-link>
</template>

<style scoped>
.spin {
  animation: spin 1.5s;
}

@keyframes spin {
  from {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(360deg) scale(1.3);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
}
</style>
