<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { onBeforeMount, ref } from 'vue';


import ProfileDetails from '@components/ProfileDetails.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { useMainStore } from '@store/useMainStore';
import { useUserStore } from '@store/useUserStore';
import { TITLE_SUFFIX } from '@utils/constants';

useTitle('Profile' + TITLE_SUFFIX);

const mainStore = useMainStore();
const userStore = useUserStore();

const somethingWentWrongError = ref(false);

onBeforeMount(async () => {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);
    await userStore.setProfile();
  } catch (err) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
});
</script>

<template>
  <ProfileDetails
    v-if="userStore.profile"
    :profile="userStore.profile"
  />
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
