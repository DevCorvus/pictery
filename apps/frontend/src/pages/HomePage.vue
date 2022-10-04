<script setup lang="ts">
import { useTitle } from '@vueuse/core';

import HeroImage from '@components/HeroImage.vue';
import LockIcon from '@components/svg/LockIcon.vue';
import OpenBookIcon from '@components/svg/OpenBookIcon.vue';
import PeopleIcon from '@components/svg/PeopleIcon.vue';
import { TITLE_SUFFIX } from '@utils/constants';

useTitle('Home' + TITLE_SUFFIX);
</script>

<template>
  <HeroImage />
  <div class="flex justify-center w-screen">
    <div class="container flex flex-col gap-20 p-10 mt-16 md:mt-8">
      <div>
        <h2 class="mb-6 text-2xl font-semibold text-sky-500">
          About
        </h2>
        <p class="max-w-xl">
          Pictery is an application project developed by
          <a
            title="Go to my GitHub"
            href="https://github.com/DevCorvus"
            target="_blank"
            class="font-semibold transition text-sky-500 hover:text-sky-500 focus:text-sky-500"
          >
            DevCorvus
          </a>
          where you can create your own picture galleries either public in order
          to share with others or private to store your pictures safely.
        </p>
      </div>
      <div>
        <h2 class="mb-6 text-2xl font-semibold text-sky-500">
          Features
        </h2>
        <div class="flex flex-col gap-6 lg:gap-10p md:flex-row text-center">
          <div
            class="flex-1 p-4 bg-white border-t-2 shadow-md dark:bg-slate-700 rounded-2xl border-sky-600"
          >
            <div class="flex flex-col items-center gap-2 text-sky-600">
              <div class="p-4 rounded-full shadow-md bg-sky-100">
                <PeopleIcon class="w-10 h-auto" />
              </div>
              <strong class="text-lg">Freedom</strong>
            </div>
            <p class="mt-4">
              You can upload whatever you want for free and you have complete
              control of your content.
            </p>
          </div>
          <div
            class="flex-1 p-4 bg-white border-t-2 shadow-md dark:bg-slate-700 rounded-2xl border-sky-600"
          >
            <div class="flex flex-col items-center gap-2 text-sky-600">
              <div class="p-4 rounded-full shadow-md bg-sky-100">
                <LockIcon class="w-10 h-auto" />
              </div>
              <strong class="text-lg">Privacy</strong>
            </div>
            <p class="mt-4">
              Your privacy and security is a priority, no tricks under the
              table. The rest is up to you.
            </p>
          </div>
          <div
            class="flex-1 p-4 bg-white border-t-2 shadow-md dark:bg-slate-700 rounded-2xl border-sky-600"
          >
            <div class="flex flex-col items-center gap-2 text-sky-600">
              <div class="p-4 rounded-full shadow-md bg-sky-100">
                <OpenBookIcon class="w-10 h-auto" />
              </div>
              <strong class="text-lg">Open source</strong>
            </div>
            <p class="mt-4">
              The project is open source, everyone can see it and even get to
              contribute.
            </p>
          </div>
        </div>
      </div>
      <div class="my-10">
        <p class="mb-4 text-2xl text-slate-400">
          What are you waiting for?
        </p>
        <router-link
          :to="{ name: 'Register' }"
          class="inline-block w-full p-4 text-2xl font-semibold text-center transition rounded-md shadow-md md:w-auto bg-sky-100 text-sky-600 focus:text-sky-500 hover:text-sky-500"
        >
          Get started
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
  html, body {
    overflow-x: hidden;
  }
</style>