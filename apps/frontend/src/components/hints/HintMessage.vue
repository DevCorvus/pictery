<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

import ExclamationIcon from '@svg/ExclamationIcon.vue';
import ExclamationTriangleIcon from '@svg/ExclamationTriangleIcon.vue';
import XIcon from '@svg/XIcon.vue';

const props = defineProps<{
  name: string;
  warning?: boolean;
}>();

const active = useLocalStorage(props.name, true);
</script>

<template>
  <div
    v-if="active"
    class="relative flex items-center justify-between gap-2 p-4 border-l-4 rounded-md shadow-md"
    :class="
      !warning
        ? 'bg-sky-50 dark:bg-sky-900 dark:text-sky-300 text-sky-600 border-sky-600'
        : 'bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-300 text-yellow-600 border-yellow-600'
    "
  >
    <ExclamationIcon
      v-if="!warning"
      class="w-8 h-8 min-w-fit"
    />
    <ExclamationTriangleIcon
      v-else
      class="w-8 h-8 min-w-fit"
    />
    <p class="text-xs lg:text-sm xl:text-base">
      <slot />
    </p>
    <button
      :data-test="name"
      title="Close"
      class="transition"
      :class="
        !warning
          ? 'text-sky-500 hover:text-sky-400 focus:text-sky-400'
          : 'text-yellow-500 hover:text-yellow-400 focus:text-yellow-400'
      "
      @click="active = false"
    >
      <XIcon class="w-5" />
    </button>
  </div>
</template>
