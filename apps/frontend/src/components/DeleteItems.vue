<script setup lang="ts">
import { Transition } from 'vue';

import { useMainStore } from '@store/useMainStore';

import SpinnerCircle from './SpinnerCircle.vue';

const mainStore = useMainStore();

defineProps<{
  name: string;
  count: number;
}>();

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="fixed bottom-0 left-0 z-30 w-full">
    <Transition>
      <div
        v-if="mainStore.deleteMode"
        class="flex flex-wrap items-center justify-around w-full gap-4 p-4 bg-red-200 border-t-2 shadow-md dark:bg-red-800 rounded-t-2xl border-t-red-400"
      >
        <p
          class="flex items-center gap-2 text-lg text-red-700 dark:text-red-300"
        >
          <strong data-test="deleteCount" class="text-xl">
            {{ count }}
          </strong>
          <span> {{ name }} to delete </span>
        </p>
        <div class="flex gap-4">
          <button
            :title="`Delete selected ${name} permanently`"
            :disabled="mainStore.loadingMode"
            class="relative px-4 py-2 text-white transition bg-red-500 rounded-md shadow-md hover:bg-red-400 focus:bg-red-400"
            @click="count > 0 ? emit('confirm') : emit('cancel')"
          >
            <span :class="mainStore.loadingMode && 'invisible'">Confirm</span>
            <div v-if="mainStore.loadingMode" class="absolute-center">
              <SpinnerCircle class="w-6 h-6" color="border-red-300" />
            </div>
          </button>
          <button
            class="text-red-500 transition dark:hover:text-red-400 dark:focus:text-red-400 hover:text-red-600 focus:text-red-600"
            @click="emit('cancel')"
          >
            Cancel
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: margin 200ms ease-in-out;
  margin-bottom: 0;
}

.v-enter-from,
.v-leave-to {
  margin-bottom: -100vh;
}
</style>
