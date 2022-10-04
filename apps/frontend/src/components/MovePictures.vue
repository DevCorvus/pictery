<script setup lang="ts">
import { computed, ref, Transition } from 'vue';

import { useMainStore } from '@store/useMainStore';

import SelectGallery from './form/SelectGallery.vue';
import SpinnerCircle from './SpinnerCircle.vue';

const props = defineProps<{
  galleryId: string;
  count: number;
}>();

const emit = defineEmits<{
  (e: 'confirm', galleryId: string): void;
  (e: 'cancel'): void;
}>();

const mainStore = useMainStore();

const galleryId = ref(props.galleryId);

const handler = computed(() => {
  if (props.count > 0 && galleryId.value !== props.galleryId) {
    return () => emit('confirm', galleryId.value);
  } else {
    return () => emit('cancel');
  }
});
</script>

<template>
  <div class="fixed bottom-0 left-0 z-30 w-full">
    <Transition>
      <div
        v-if="mainStore.movePicturesMode"
        class="flex flex-wrap items-center justify-around w-full gap-4 p-4 border-t-2 shadow-md bg-sky-200 dark:bg-sky-800 rounded-t-2xl border-t-sky-400"
      >
        <p
          class="flex items-center gap-2 text-lg text-sky-700 dark:text-sky-300"
        >
          <strong data-test="movePicturesCount" class="text-xl">{{
            count
          }}</strong>
          <span> pictures to move </span>
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <SelectGallery
            alternative
            @change="(newGalleryId) => (galleryId = newGalleryId)"
          />
          <button
            title="Move selected pictures"
            :disabled="mainStore.loadingMode"
            class="btn-form-primary"
            @click="handler"
          >
            <span :class="mainStore.loadingMode && 'invisible'">Confirm</span>
            <div v-if="mainStore.loadingMode" class="absolute-center">
              <SpinnerCircle class="w-6 h-6" color="border-sky-300" />
            </div>
          </button>
          <button
            class="transition text-sky-500 dark:hover:text-sky-400 dark:focus:text-sky-400 hover:text-sky-600 focus:text-sky-600"
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
