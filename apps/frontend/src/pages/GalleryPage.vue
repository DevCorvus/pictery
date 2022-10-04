<script setup lang="ts">
import { Gallery, Picture } from '@common/interfaces';
import { useTitle } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed, onUnmounted, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import CopyUrl from '@components/CopyUrl.vue';
import DeleteItems from '@components/DeleteItems.vue';
import ErrorScreen from '@components/ErrorScreen.vue';
import GalleryDetails from '@components/gallery/GalleryDetails.vue';
import DeleteModeFirstTime from '@components/hints/DeleteModeFirstTime.vue';
import GalleryWelcome from '@components/hints/GalleryWelcome.vue';
import MovePicturesModeFirstTime from '@components/hints/MovePicturesModeFirstTime.vue';
import PrivacyWarning from '@components/hints/PrivacyWarning.vue';
import LoadingScreen from '@components/LoadingScreen.vue';
import MovePictures from '@components/MovePictures.vue';
import NotAuthorized from '@components/NotAuthorized.vue';
import PictureList from '@components/picture/PictureList.vue';
import QRCode from '@components/QRCode.vue';
import SearchItems from '@components/SearchItems.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import ArrowUturnLeftIcon from '@components/svg/ArrowUturnLeftIcon.vue';
import ToggleDeleteMode from '@components/ToggleDeleteMode.vue';
import ToggleMovePicturesMode from '@components/ToggleMovePicturesMode.vue';
import ToggleSortOrder from '@components/ToggleSortOrder.vue';
import { useIdList } from '@hooks/useIdList';
import { useSortOrder } from '@hooks/useSortOrder';
import { axiosInstance } from '@lib/axios';
import { deleteManyPictures, moveManyPictures } from '@services/picture';
import { useMainStore } from '@store/useMainStore';
import { useUserStore } from '@store/useUserStore';
import { TITLE_SUFFIX } from '@utils/constants';
import { textLimiter } from '@utils/textLimiter';

import NotFoundPage from './NotFoundPage.vue';

const route = useRoute();

const title = useTitle();

const mainStore = useMainStore();
const userStore = useUserStore();

const gallery = ref<Gallery>();
const pictures = ref<Picture[]>([]);

const sameUser = computed(
  () => gallery.value?.userId === userStore.profile?.userId
);

const galleryVisibilityTag = computed(() =>
  gallery.value?.public ? 'Public' : 'Private'
);

const draggingOver = ref(false);

provide('sameUser', sameUser);

provide('gallery', gallery);

provide('updateGallery', (updatedGallery: Gallery) => {
  gallery.value = updatedGallery;

  title.value = gallery.value.name + TITLE_SUFFIX;
});

provide('addPicture', (newPicture: Picture) => {
  pictures.value = [...pictures.value, newPicture];
});

provide('updatePicture', (updatedPicture: Picture) => {
  pictures.value = pictures.value.map((picture) => {
    if (picture.id === updatedPicture.id) {
      picture = updatedPicture;
    }
    return picture;
  });
});

provide('deletePicture', (id: string) => {
  pictures.value = pictures.value.filter((picture) => picture.id !== id);
});

const { isLoading, data, error } = useAxios<{
  gallery: Gallery;
  pictures: Picture[];
}>(`/galleries/${route.params.id as string}`, axiosInstance);

watch(data, () => {
  if (data.value) {
    gallery.value = data.value.gallery;
    pictures.value = data.value.pictures;

    title.value = gallery.value.name + TITLE_SUFFIX;
  }
});

const filteredPictures = ref<Picture[]>([]);

watch(pictures, () => {
  filteredPictures.value = pictures.value;
});

const { currentSortOrder, switchSortOrder } = useSortOrder(filteredPictures);

function handleFilteredItems(data: unknown) {
  filteredPictures.value = data as Picture[];
}

const picturesToMove = useIdList();
const picturesToMoveCount = computed(() => picturesToMove.data.value.length);

const picturesToDelete = useIdList();
const picturesToDeleteCount = computed(
  () => picturesToDelete.data.value.length
);

provide('picturesToMove', picturesToMove);
provide('picturesToDelete', picturesToDelete);

function toggleMovePicturesMode() {
  if (!mainStore.movePicturesMode) {
    mainStore.setMovePicturesMode(true);
    if (mainStore.deleteMode) {
      mainStore.setDeleteMode(false);
      picturesToDelete.reset();
    }
  } else {
    mainStore.setMovePicturesMode(false);
    picturesToMove.reset();
  }
}

function toggleDeleteMode() {
  if (!mainStore.deleteMode) {
    mainStore.setDeleteMode(true);
    if (mainStore.movePicturesMode) {
      mainStore.setMovePicturesMode(false);
      picturesToMove.reset();
    }
  } else {
    mainStore.setDeleteMode(false);
    picturesToDelete.reset();
  }
}

const somethingWentWrongError = ref(false);

async function movePictures(galleryId: string) {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);

    await moveManyPictures({
      galleryId,
      pictureIds: picturesToMove.data.value as string[],
    });

    pictures.value = pictures.value.filter((picture) => {
      return picturesToMove.data.value.indexOf(picture.id) === -1;
    });

    picturesToMove.reset();
    mainStore.setMovePicturesMode(false);
  } catch (error) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}

async function deletePictures() {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);

    await deleteManyPictures({
      pictureIds: picturesToDelete.data.value as string[],
    });

    pictures.value = pictures.value.filter((picture) => {
      return picturesToDelete.data.value.indexOf(picture.id) === -1;
    });

    picturesToDelete.reset();
    mainStore.setDeleteMode(false);
  } catch (error) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}

onUnmounted(() => {
  mainStore.setSearchMode(false);
  mainStore.setDeleteMode(false);
  mainStore.setMovePicturesMode(false);
});
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  <NotFoundPage v-else-if="error?.response?.status === 404" />
  <NotAuthorized v-else-if="error?.response?.status === 403" />
  <ErrorScreen v-else-if="error" />
  <template v-else-if="gallery && pictures">
    <div
      class="flex flex-col gap-6 pb-20 mx-4 md:mx-10"
      @dragenter="draggingOver = true"
      @dragleave="draggingOver = false"
    >
      <header
        class="flex flex-wrap items-center justify-center gap-4 sm:justify-between"
      >
        <div class="flex items-center gap-2 md:gap-4">
          <router-link
            v-if="userStore.isAuthenticated"
            data-test="goBack"
            :to="{ name: 'Dashboard' }"
            title="Go back to the Dashboard"
            class="transition hover:text-sky-500 focus:text-sky-500"
          >
            <ArrowUturnLeftIcon class="w-5 md:w-6" />
          </router-link>
          <div class="flex items-center gap-2">
            <h1
              :title="gallery.name"
              class="text-xl md:text-2xl text-slate-500 dark:text-slate-400"
            >
              {{ textLimiter(gallery.name, 10) }}
            </h1>
            <span
              :title="`This gallery is ${galleryVisibilityTag}`"
              class="py-0.5 px-1 rounded-md select-none"
              :class="
                gallery.public
                  ? 'bg-rose-100 text-rose-500 dark:bg-rose-500 dark:text-rose-100'
                  : 'bg-green-100 text-green-500 dark:bg-green-500 dark:text-green-100'
              "
            >
              {{ galleryVisibilityTag }}
            </span>
            <QRCode :name="gallery.name" />
            <CopyUrl />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <GalleryDetails :gallery="gallery" />
          <ToggleSortOrder
            :sort-order="currentSortOrder"
            @click="switchSortOrder"
          />
          <template v-if="sameUser">
            <ToggleMovePicturesMode @click="toggleMovePicturesMode" />
            <ToggleDeleteMode @click="toggleDeleteMode" />
          </template>
        </div>
      </header>
      <GalleryWelcome v-if="sameUser" />
      <PrivacyWarning v-if="!gallery.public" />
      <DeleteModeFirstTime />
      <MovePicturesModeFirstTime />
      <SearchItems
        :items="pictures"
        name="pictures"
        @filtered-items="handleFilteredItems"
      />
      <PictureList
        :pictures="filteredPictures"
        :pictures-count="pictures.length"
        :dragging-over-page="draggingOver"
      />
      <MovePictures
        :gallery-id="gallery.id"
        :count="picturesToMoveCount"
        @confirm="(newGalleryId) => movePictures(newGalleryId)"
        @cancel="toggleMovePicturesMode"
      />
      <DeleteItems
        name="pictures"
        :count="picturesToDeleteCount"
        @confirm="deletePictures"
        @cancel="toggleDeleteMode"
      />
    </div>
    <SomethingWentWrong :show="somethingWentWrongError" />
  </template>
</template>
