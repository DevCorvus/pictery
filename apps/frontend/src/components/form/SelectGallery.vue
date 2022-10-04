<script setup lang="ts">
import { Gallery } from '@common/interfaces/gallery.interface';
import { onClickOutside } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { inject, ref, Ref, Transition } from 'vue';

import SpinnerCircle from '@components/SpinnerCircle.vue';
import { axiosInstance } from '@lib/axios';
import CheckIcon from '@svg/CheckIcon.vue';
import SelectorIcon from '@svg/SelectorIcon.vue';
import { textLimiter } from '@utils/textLimiter';

defineProps<{
  alternative?: boolean;
}>();

const emit = defineEmits<{
  (e: 'change', galleryId: string): void;
}>();

const thisGallery = inject('gallery') as Ref<Gallery>;

const {
  isLoading,
  data: galleries,
  error,
} = useAxios<{ id: string; name: string }[]>(
  '/galleries?mode=minimal',
  axiosInstance
);

const show = ref(false);
const selected = ref({
  id: thisGallery.value.id,
  name: thisGallery.value.name,
});

function selectGallery(gallery: { id: string; name: string }) {
  selected.value = gallery;
  show.value = false;
  emit('change', gallery.id);
}

const inputRef = ref(null);
onClickOutside(inputRef, () => (show.value = false));
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="!alternative" for="gallery" class="label"> Gallery </label>
    <div ref="inputRef" class="relative">
      <button
        type="button"
        :title="selected.name"
        :disabled="isLoading || !!error"
        class="flex items-center justify-between p-2 group input"
        @click="show = !show"
      >
        <SpinnerCircle v-if="isLoading" class="w-6 h-6 mx-auto" />
        <template v-else>
          <span :title="selected.name">{{
            textLimiter(selected.name, 25)
          }}</span>
          <SelectorIcon
            class="w-6 transition text-slate-500 dark:text-slate-100 group-focus:text-sky-500 dark:group-focus:text-sky-300"
          />
        </template>
      </button>
      <Transition name="select">
        <ul
          v-if="show && galleries"
          class="absolute z-10 w-full overflow-hidden overflow-y-scroll bg-slate-100 dark:bg-slate-500 max-h-40"
          :class="
            alternative
              ? 'bottom-11 rounded-t-md border-2'
              : 'mt-1 rounded-b-md shadow-md'
          "
        >
          <li v-for="gallery in galleries" :key="gallery.id">
            <button
              type="button"
              :title="gallery.name"
              class="flex items-center justify-between w-full p-2 text-left transition"
              :class="
                selected.id === gallery.id
                  ? 'text-sky-600 bg-sky-200 dark:bg-sky-700 dark:text-sky-300'
                  : 'dark:hover:bg-sky-600 dark:hover:text-sky-100 dark:focus:text-sky-100 dark:focus:bg-sky-600 hover:text-sky-500 focus:text-sky-500 hover:bg-sky-100 focus:bg-sky-100'
              "
              @click="
                () => selectGallery({ id: gallery.id, name: gallery.name })
              "
            >
              <span :title="gallery.name">
                {{ textLimiter(gallery.name, 25) }}
              </span>
              <CheckIcon
                v-if="selected.id === gallery.id"
                class="w-6 text-sky-500"
              />
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 100ms ease;
  opacity: 1;
}
.select-enter-from,
.select-leave-to {
  opacity: 0;
}
</style>
