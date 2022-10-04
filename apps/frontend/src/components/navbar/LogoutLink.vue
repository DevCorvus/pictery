<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { useMainStore } from '@store/useMainStore';
import { useUserStore } from '@store/useUserStore';
import LogoutIcon from '@svg/LogoutIcon.vue';

const router = useRouter();
const mainStore = useMainStore();
const userStore = useUserStore();

const somethingWentWrongError = ref(false);

async function handleLogout() {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);
    await userStore.logout();
    router.replace({ name: 'Home' });
  } catch (err) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}
</script>

<template>
  <button
    data-test="logout"
    title="Logout"
    class="flex items-center transition hover:text-sky-500 focus:text-sky-500"
    @click="handleLogout"
  >
    <LogoutIcon class="w-5 md:w-6" />
  </button>
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
