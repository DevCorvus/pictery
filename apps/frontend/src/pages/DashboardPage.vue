<script setup lang="ts">
import { Gallery } from '@common/interfaces';
import { useTitle } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed, onUnmounted, provide, ref, watch } from 'vue';

import DeleteItems from '@components/DeleteItems.vue';
import ErrorScreen from '@components/ErrorScreen.vue';
import GalleryList from '@components/gallery/GalleryList.vue';
import DashboardWelcome from '@components/hints/DashboardWelcome.vue';
import DeleteModeFirstTime from '@components/hints/DeleteModeFirstTime.vue';
import LoadingScreen from '@components/LoadingScreen.vue';
import SearchItems from '@components/SearchItems.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import ToggleDeleteMode from '@components/ToggleDeleteMode.vue';
import ToggleSortOrder from '@components/ToggleSortOrder.vue';
import { useIdList } from '@hooks/useIdList';
import { useSortOrder } from '@hooks/useSortOrder';
import { axiosInstance } from '@lib/axios';
import { deleteManyGalleries } from '@services/gallery';
import { useMainStore } from '@store/useMainStore';
import { TITLE_SUFFIX } from '@utils/constants';

const title = useTitle();

const mainStore = useMainStore();

const galleries = ref<Gallery[]>([]);

const { isLoading, data, error } = useAxios<Gallery[]>(
  '/galleries?mode=preview',
  axiosInstance
);

watch(data, () => {
  if (data.value) {
    galleries.value = data.value;
    title.value = 'Dashboard' + TITLE_SUFFIX;
  }
});

provide('addGallery', (newGallery: Gallery) => {
  galleries.value = [...galleries.value, newGallery];
});

provide('deleteGallery', (id: string) => {
  galleries.value = galleries.value.filter((gallery) => gallery.id !== id);
});

const filteredGalleries = ref<Gallery[]>([]);

watch(galleries, () => {
  filteredGalleries.value = galleries.value;
});

const { currentSortOrder, switchSortOrder } = useSortOrder(filteredGalleries);

function handleFilteredItems(data: unknown) {
  filteredGalleries.value = data as Gallery[];
}

const galleriesToDelete = useIdList();
provide('galleriesToDelete', galleriesToDelete);

const galleriesToDeleteCount = computed(
  () => galleriesToDelete.data.value.length
);

function toggleDeleteMode() {
  if (!mainStore.deleteMode) {
    mainStore.setDeleteMode(true);
  } else {
    mainStore.setDeleteMode(false);
    galleriesToDelete.reset();
  }
}

const somethingWentWrongError = ref(false);

async function deleteGalleries() {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);

    await deleteManyGalleries({
      galleryIds: galleriesToDelete.data.value as string[],
    });

    galleries.value = galleries.value.filter((gallery) => {
      return galleriesToDelete.data.value.indexOf(gallery.id) === -1;
    });

    galleriesToDelete.reset();
    mainStore.setDeleteMode(false);
    mainStore.setLoadingMode(false);
  } catch (error) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}

onUnmounted(() => {
  mainStore.setSearchMode(false);
  mainStore.setDeleteMode(false);
});
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  <ErrorScreen v-else-if="error" />
  <template v-else>
    <div class="flex flex-col gap-6 pb-20 mx-4 md:mx-10">
      <header class="flex flex-wrap items-center justify-between">
        <div class="text-2xl text-slate-500 dark:text-slate-400">
          <h1>Dashboard</h1>
        </div>
        <div class="flex items-center gap-4">
          <ToggleSortOrder
            :sort-order="currentSortOrder"
            @click="switchSortOrder"
          />
          <ToggleDeleteMode @click="toggleDeleteMode" />
        </div>
      </header>
      <DashboardWelcome />
      <DeleteModeFirstTime />
      <SearchItems
        :items="galleries"
        name="galleries"
        @filtered-items="handleFilteredItems"
      />
      <GalleryList
        :galleries="filteredGalleries"
        :galleries-count="galleries.length"
      />
      <DeleteItems
        name="galleries"
        :count="galleriesToDeleteCount"
        @confirm="deleteGalleries"
        @cancel="toggleDeleteMode"
      />
    </div>
    <SomethingWentWrong :show="somethingWentWrongError" />
  </template>
</template>
