<script setup lang="ts">
import { computed } from 'vue';

import { useUserStore } from '@store/useUserStore';
import UserIcon from '@svg/UserIcon.vue';
import { textLimiter } from '@utils/textLimiter';

const userStore = useUserStore();

const profileFirstName = computed(() =>
  textLimiter(userStore.profile?.name.split(' ')[0] || '', 7)
);
</script>

<template>
  <router-link
    :to="{ name: 'MyProfile' }"
    title="Go to your profile"
    class="flex items-center gap-1 transition md:gap-2 hover:text-sky-500 focus:text-sky-500"
  >
    <span
      :title="userStore.profile ? userStore.profile.name : ''"
      class="md:text-lg"
    >
      {{ profileFirstName }}
    </span>
    <UserIcon class="w-8 md:w-10" />
  </router-link>
</template>
