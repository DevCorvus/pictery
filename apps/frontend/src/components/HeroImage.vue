<!-- eslint-disable security/detect-object-injection -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import catImage from '@assets/cat.webp';
import peopleImage from '@assets/people.webp';
import seaImage from '@assets/sea.webp';
import spaceImage from '@assets/space.webp';
import sunsetImage from '@assets/sunset.webp';

import ProjectNature from './hints/ProjectNature.vue';

interface Image {
  src: string;
  text: string;
  color: string;
}

const images: Image[] = [
  {
    src: sunsetImage,
    text: 'creativity',
    color: 'text-yellow-400',
  },
  {
    src: catImage,
    text: 'happiness',
    color: 'text-red-500',
  },
  {
    src: seaImage,
    text: 'travels',
    color: 'text-lime-500',
  },
  {
    src: spaceImage,
    text: 'dreams',
    color: 'text-indigo-500',
  },
  {
    src: peopleImage,
    text: 'moments',
    color: 'text-sky-500',
  },
];
const imagesIndexes = images.length - 1;

let currentImageIndex = 0;
const currentImage = ref(images[currentImageIndex]);

let intervalId: number;

onMounted(() => {
  intervalId = window.setInterval(() => {
    if (currentImageIndex === imagesIndexes) {
      currentImageIndex = 0;
    } else {
      currentImageIndex += 1;
    }

    currentImage.value = images[currentImageIndex];
  }, 10000);
});

onUnmounted(() => {
  window.clearInterval(intervalId);
});
</script>

<template>
  <div
    class="relative z-10 flex flex-col justify-center w-screen h-screen"
    style="max-height: 768px"
  >
    <Transition name="hero-cover">
      <img
        :key="currentImage.src"
        :src="currentImage.src"
        alt="landscape"
        class="absolute top-0 left-0 object-cover w-full h-full rounded-b-lg -z-10 shadow-md shadow-sky-300"
      >
    </Transition>
    <div class="flex justify-center">
      <div class="container text-center text-white md:text-left md:m-20">
        <header class="text-4xl">
          <h1 class="font-black text-shadow-light">
            Upload and share your
            <span :class="currentImage.color">{{ currentImage.text }}</span>
            .
          </h1>
        </header>
        <div class="mt-10">
          <router-link
            :to="{ name: 'Register' }"
            class="p-4 font-semibold transition rounded-lg shadow-md bg-sky-500 hover:bg-sky-400 focus:bg-sky-400"
          >
            Get started
          </router-link>
        </div>
      </div>
    </div>
    <ProjectNature />
  </div>
</template>

<style scoped>
.hero-cover-enter-active,
.hero-cover-leave-active {
  transition: all 500ms ease-in-out;
  opacity: 1;
}
.hero-cover-enter-from,
.hero-cover-leave-to {
  opacity: 0.5;
}
</style>
