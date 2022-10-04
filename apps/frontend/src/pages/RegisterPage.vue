<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { AxiosError } from 'axios';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { registerSchema } from '@schemas/register';
import { createUser, CreateUserDto } from '@services/user';
import { useMainStore } from '@store/useMainStore';
import GoogleIcon from '@svg/GoogleIcon.vue';
import { API_URL, TITLE_SUFFIX } from '@utils/constants';

const router = useRouter();

useTitle('Register' + TITLE_SUFFIX);

const mainStore = useMainStore();

const emailAlreadyExistsError = ref(false);
const somethingWentWrongError = ref(false);

async function handleRegister(values: unknown) {
  emailAlreadyExistsError.value = false;
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);

    const { name, email, password } = values as CreateUserDto;
    await createUser({ name, email, password });

    router.replace({ name: 'Login', query: { register: 'success', email } });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 409) {
        emailAlreadyExistsError.value = true;
      } else {
        somethingWentWrongError.value = true;
      }
    }
  } finally {
    mainStore.setLoadingMode(false);
  }
}
</script>

<template>
  <div
    class="max-w-lg p-8 mx-auto bg-white border-t-4 rounded-md shadow-lg dark:bg-slate-700 md:pt-10 min-w-md border-t-sky-400"
  >
    <div>
      <header class="text-3xl font-bold text-sky-500">
        <h1>Register</h1>
      </header>
      <div class="my-6">
        <div
          class="bg-white border-t shadow-md dark:bg-slate-600 border-slate-200 dark:border-slate-500 rounded-xl ring-base focus-within:ring-sky-400"
        >
          <a
            title="Create an account using Google OAuth (Recommended)"
            :href="API_URL + '/auth/google'"
            class="flex flex-wrap items-center justify-center gap-2 py-4 font-semibold transition duration-300 text-slate-500 dark:text-slate-300 hover:scale-110 dark:hover:text-slate-100 dark:focus:text-slate-100 hover:text-slate-600 focus:text-slate-600 focus:scale-110"
          >
            <div class="flex items-center gap-2">
              <GoogleIcon class="w-8" />
              <span>Google OAuth</span>
            </div>
            <span
              class="p-1 px-2 text-green-700 bg-green-100 rounded-lg dark:bg-green-700 dark:text-green-100"
            >
              Recommended
            </span>
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
      :validation-schema="registerSchema"
      @submit="handleRegister"
    >
      <div class="flex flex-col gap-2">
        <label for="name" class="font-semibold label">Name</label>
        <Field
          id="name"
          type="text"
          name="name"
          class="p-3 input"
          placeholder="Enter your name"
        />
        <ErrorMessage name="name" class="error" />
      </div>
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
        <span v-if="emailAlreadyExistsError" class="error">
          Email already exists
        </span>
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
        <Field
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          class="p-3 mt-2 input"
          placeholder="Repeat your password"
        />
        <ErrorMessage name="passwordConfirm" class="error" />
      </div>
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
        Sign Up
      </button>
    </Form>
  </div>
  <p
    class="flex flex-wrap justify-center gap-2 px-6 pt-10 text-slate-600 dark:text-slate-400"
  >
    Do you already have an account?
    <router-link
      :to="{ name: 'Login' }"
      class="font-semibold transition text-sky-500 hover:text-sky-600 focus:text-sky-600"
    >
      Sign in.
    </router-link>
  </p>
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
