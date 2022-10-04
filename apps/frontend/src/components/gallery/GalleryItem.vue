<script setup lang="ts">
import { Gallery } from '@common/interfaces/gallery.interface';
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import DeleteMark from '@components/DeleteMark.vue';
import { UseIdList } from '@src/types';
import { useMainStore } from '@store/useMainStore';
import PictureIcon from '@svg/PictureIcon.vue';
import { textLimiter } from '@utils/textLimiter';

const props = defineProps<{
  gallery: Gallery;
}>();

const havePictures = computed(
  () => !!props.gallery.pictures && props.gallery.pictures.length > 0
);

const previewStyling = computed(() => {
  switch (props.gallery.pictures?.length) {
    case 2:
      return 'grid grid-cols-2';

    case 3:
      return 'grid grid-cols-3';

    default:
      return 'flex';
  }
});

const router = useRouter();
const mainStore = useMainStore();

const galleriesToDelete = inject('galleriesToDelete') as UseIdList;
const selectedToDelete = ref(false);

const titleText = computed(() => {
  let action: string;
  if (mainStore.deleteMode) {
    if (selectedToDelete.value) {
      action = 'Deselect';
    } else {
      action = 'Select';
    }
  } else {
    action = 'Open';
  }
  return action + ' ' + props.gallery.name;
});

const clickHandler = computed(() =>
  mainStore.deleteMode ? toggleSelectToDelete : goToGallery
);

function goToGallery() {
  router.push({ name: 'Gallery', params: { id: props.gallery.id } });
}

function toggleSelectToDelete() {
  const galleryId = props.gallery.id;
  if (!selectedToDelete.value) {
    galleriesToDelete.add(galleryId);
    selectedToDelete.value = true;
  } else {
    galleriesToDelete.remove(galleryId);
    selectedToDelete.value = false;
  }
}

function handleSelectToDelete() {
  const gallerySelectedToDelete = galleriesToDelete.exists(props.gallery.id);
  if (gallerySelectedToDelete) {
    selectedToDelete.value = true;
  } else {
    selectedToDelete.value = false;
  }
}

watch([props, galleriesToDelete.data], handleSelectToDelete);
onMounted(handleSelectToDelete);
</script>

<template>
  <div
    :data-test="gallery.name"
    :title="titleText"
    class="relative h-40 bg-white rounded-lg shadow-md dark:bg-slate-700 group ring-base"
    :class="
      selectedToDelete
        ? 'focus-within:ring-red-400'
        : 'focus-within:ring-sky-300'
    "
  >
    <button
      class="w-full h-full overflow-hidden rounded-lg"
      @click="clickHandler"
    >
      <DeleteMark :show="selectedToDelete" />
      <div
        class="flex flex-col items-center justify-center w-full h-full transition duration-300 group-hover:scale-110 group-focus-within:scale-110 text-slate-300"
        :class="
          selectedToDelete
            ? 'group-hover:text-red-300 group-focus-within:text-red-300'
            : 'group-hover:text-sky-300 group-focus-within:text-sky-300'
        "
      >
        <div v-if="havePictures" class="w-full h-full" :class="previewStyling">
          <img
            v-for="picture, i in gallery.pictures"
            :key="picture.url"
            :src="picture.url"
            :alt="`Gallery preview #${i + 1}`"
            class="flex-1 object-cover w-full h-full"
            crossorigin="anonymous"
          >
        </div>
        <PictureIcon v-else class="w-16" />
      </div>
      <div
        class="absolute top-0 left-0 flex flex-col justify-end w-full h-full px-4 pb-4"
      >
        <div class="flex justify-between">
          <h2
            :title="gallery.name"
            :class="havePictures && 'text-white text-shadow'"
          >
            {{ textLimiter(gallery.name) }}
          </h2>
          <span
            class="rounded-md py-0.5 px-1 text-sm shadow-md"
            :class="
              gallery.public
                ? 'bg-rose-100 text-rose-500 dark:bg-rose-500 dark:text-rose-100'
                : 'bg-green-100 text-green-500 dark:bg-green-500 dark:text-green-100'
            "
          >
            {{ gallery.public ? 'Public' : 'Private' }}
          </span>
        </div>
      </div>
    </button>
  </div>
</template>
