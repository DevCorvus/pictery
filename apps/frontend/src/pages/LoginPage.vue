<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { AxiosError } from 'axios';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import FloatingDialog from '@components/FloatingDialog.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { loginSchema } from '@schemas/login';
import { login, LoginDto } from '@services/auth';
import { useMainStore } from '@store/useMainStore';
import { useUserStore } from '@store/useUserStore';
import CheckSolidIcon from '@svg/CheckSolidIcon.vue';
import GoogleIcon from '@svg/GoogleIcon.vue';
import { API_URL, TITLE_SUFFIX } from '@utils/constants';

const router = useRouter();

useTitle('Login' + TITLE_SUFFIX);

const mainStore = useMainStore();
const userStore = useUserStore();

const wrongEmailOrPasswordError = ref(false);
const tooManyLoginAttemptsError = ref(false);
const somethingWentWrongError = ref(false);

async function handleLogin(values: unknown) {
  wrongEmailOrPasswordError.value = false;
  tooManyLoginAttemptsError.value = false;
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);
    await login(values as LoginDto);
    await userStore.setAuth();
    await userStore.setProfile();
    router.replace({ name: 'Dashboard' });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 500 || err.response?.status === 0) {
        somethingWentWrongError.value = true;
      } else if (err.response?.status === 429) {
        tooManyLoginAttemptsError.value = true;
      } else {
        wrongEmailOrPasswordError.value = true;
      }
    }
  } finally {
    mainStore.setLoadingMode(false);
  }
}
</script>

<template>
  <div
    class="max-w-lg p-8 mx-auto bg-white border-t-4 rounded-md shadow-lg dark:bg-slate-700 min-w-md border-t-sky-400"
  >
    <div>
      <header class="text-3xl font-bold text-sky-500">
        <h1>Login</h1>
      </header>
      <div class="my-6">
        <div
          class="bg-white border-t shadow-md dark:bg-slate-600 border-slate-200 dark:border-slate-500 rounded-xl ring-base focus-within:ring-sky-400"
        >
          <a
            title="Login using Google OAuth"
            :href="API_URL + '/auth/google'"
            class="flex items-center justify-center gap-2 py-4 font-semibold transition duration-300 text-slate-500 dark:text-slate-300 hover:scale-110 dark:hover:text-slate-100 dark:focus:text-slate-100 hover:text-slate-600 focus:text-slate-600 focus:scale-110"
          >
            <GoogleIcon class="w-8" />
            <span>Google OAuth</span>
          </a>
        </div>
      </div>
      <div class="flex items-center gap-2 my-6 text-slate-400">
        <hr class="flex-1">
        <span>or</span>
        <hr class="flex-1">
      </div>
    </div>
    <Form
      class="flex flex-col gap-6 mt-6"
      :validation-schema="loginSchema"
      :initial-values="{ email: $route.query.email }"
      @submit="handleLogin"
    >
      <div class="flex flex-col gap-2">
        <label for="email" class="font-semibold label">Email</label>
        <Field
          id="email"
          type="text"
          name="email"
          class="p-3 input"
          placeholder="Enter your email"
        />
        <ErrorMessage name="email" class="error" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-semibold label">Password</label>
        <Field
          id="password"
          type="password"
          name="password"
          class="p-3 input"
          placeholder="Enter your password"
        />
        <ErrorMessage name="password" class="error" />
      </div>
      <span v-if="wrongEmailOrPasswordError" class="error">
        Wrong email or password
      </span>
      <span v-if="tooManyLoginAttemptsError" class="error">
        Too many login attempts
      </span>
      <button
        type="submit"
        class="w-full p-4 mt-4 font-bold tracking-wider text-white uppercase transition rounded-lg shadow-md"
        :disabled="mainStore.loadingMode"
        :class="
          mainStore.loadingMode
            ? 'bg-slate-500 dark:bg-slate-600'
            : 'bg-sky-500 hover:bg-sky-600 focus:bg-sky-600'
        "
      >
        Sign In
      </button>
    </Form>
  </div>
  <p class="flex justify-center gap-2 pt-10 text-slate-600 dark:text-slate-400">
    Don't have an account?
    <router-link
      :to="{ name: 'Register' }"
      class="font-semibold transition text-sky-500 hover:text-sky-600 focus:text-sky-600"
    >
      Sign up.
    </router-link>
  </p>
  <FloatingDialog
    :show="$route.query.register === 'success'"
    :expires="3000"
    position="bottom-left"
    class="text-green-500 border-l-4 border-green-500"
  >
    <p class="flex gap-1">
      <CheckSolidIcon class="w-6" /><span>Account created successfully</span>
    </p>
  </FloatingDialog>
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
