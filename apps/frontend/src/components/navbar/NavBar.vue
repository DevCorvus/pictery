<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import ToggleDarkMode from '@components/ToggleDarkMode.vue';
import { useUserStore } from '@store/useUserStore';

import HeaderLink from './HeaderLink.vue';
import LogoutLink from './LogoutLink.vue';
import MyProfileLink from './MyProfileLink.vue';

const route = useRoute();
const userStore = useUserStore();

const scrollY = ref<number>(0);
const isScrolledDown = computed(() => scrollY.value > 0);

function onScroll() {
  scrollY.value = window.scrollY;
}

watch(route, () => {
  if (route.name === 'Home') {
    window.addEventListener('scroll', onScroll);
  } else {
    window.removeEventListener('scroll', onScroll);
  }
});
</script>

<template>
  <nav
    class="fixed top-0 left-0 z-30 w-full transition duration-500"
    :class="
      $route.name === 'Home'
        ? isScrolledDown
          ? 'bg-white dark:bg-slate-700 shadow-md'
          : 'bg-transparent'
        : 'bg-white dark:bg-slate-700 shadow-md'
    "
  >
    <div
      class="container flex justify-between px-4 mx-auto md:px-6"
      :class="userStore.isAuthenticated ? 'py-2' : 'py-4'"
    >
      <ul class="flex items-center gap-2 md:gap-4">
        <li>
          <HeaderLink />
        </li>
      </ul>
      <ul class="flex items-center gap-2 md:gap-4">
        <template v-if="userStore.isAuthenticated">
          <li>
            <MyProfileLink />
          </li>
          <li>
            <ToggleDarkMode />
          </li>
          <li>
            <LogoutLink />
          </li>
        </template>
        <template v-else>
          <li>
            <router-link
              v-if="$route.name !== 'Login'"
              data-test="loginLink"
              :to="{ name: 'Login' }"
              class="px-4 py-2 text-white transition rounded-md shadow-md bg-sky-500 hover:bg-sky-400 focus:bg-sky-400"
            >
              Login
            </router-link>
          </li>
          <li>
            <router-link
              v-if="$route.name !== 'Register'"
              data-test="registerLink"
              :to="{ name: 'Register' }"
              class="transition text-sky-500 hover:text-sky-400 focus:text-sky-400"
            >
              Register
            </router-link>
          </li>
          <li>
            <ToggleDarkMode />
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
