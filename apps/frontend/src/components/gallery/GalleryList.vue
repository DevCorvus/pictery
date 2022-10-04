<script setup lang="ts">
import { Gallery } from '@common/interfaces/gallery.interface';
import { ref } from 'vue';

import AddItem from '@components/AddItem.vue';
import GenericModal from '@components/GenericModal.vue';
import PictureIcon from '@svg/PictureIcon.vue';
import PlusIcon from '@svg/PlusIcon.vue';

import GalleryForm from './GalleryForm.vue';
import GalleryItem from './GalleryItem.vue';

defineProps<{
  galleries: Gallery[];
  galleriesCount: number;
}>();

const isModalOpen = ref(false);
</script>

<template>
  <template v-if="galleriesCount > 0">
    <p class="text-slate-400">
      {{ galleriesCount }} galleries
    </p>
    <section class="grid-base">
      <AddItem name="gallery" @click="isModalOpen = true" />
      <template v-if="galleries.length > 0">
        <GalleryItem
          v-for="gallery in galleries"
          :key="gallery.id"
          :gallery="gallery"
        />
      </template>
    </section>
  </template>
  <template v-else>
    <div
      class="flex flex-col items-center justify-center gap-4 p-10 text-center bg-white rounded-md shadow-inner dark:bg-slate-700 dark:shadow-slate-900 text-slate-300 shadow-slate-300"
    >
      <PictureIcon class="w-20" />
      <p class="text-2xl font-semibold">
        There are no galleries to show
      </p>
      <button
        title="Add a new gallery"
        class="flex items-center gap-1 btn-form-primary"
        @click="isModalOpen = true"
      >
        <PlusIcon class="w-6" />
        <span>New</span>
      </button>
    </div>
  </template>
  <GenericModal
    title="New gallery"
    :state="isModalOpen"
    :close="() => (isModalOpen = false)"
  >
    <GalleryForm :close="() => (isModalOpen = false)" />
  </GenericModal>
</template>
