<script setup lang="ts">
import { Profile } from '@common/interfaces';
import { useTitle } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import ErrorScreen from '@components/ErrorScreen.vue';
import LoadingScreen from '@components/LoadingScreen.vue';
import ProfileDetails from '@components/ProfileDetails.vue';
import { axiosInstance } from '@lib/axios';
import { TITLE_SUFFIX } from '@utils/constants';

import NotFoundPage from './NotFoundPage.vue';

const route = useRoute();

const title = useTitle();

const {
  data: profile,
  isLoading,
  error,
} = useAxios<Profile>(`/profile/${route.params.id}`, axiosInstance);

watch(profile, () => {
  if (profile.value) {
    title.value = profile.value.name + TITLE_SUFFIX;
  }
});
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  <NotFoundPage v-else-if="error?.response?.status === 404" />
  <ErrorScreen v-else-if="error" />
  <ProfileDetails v-else-if="profile" :profile="profile" />
</template>
