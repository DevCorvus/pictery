<script setup lang="ts">
import { Picture } from '@common/interfaces';
import { ComputedRef, inject, ref, watch } from 'vue';

import AddItem from '@components/AddItem.vue';
import GenericModal from '@components/GenericModal.vue';
import CameraIcon from '@components/svg/CameraIcon.vue';
import PlusIcon from '@components/svg/PlusIcon.vue';

import PictureForm from './PictureForm.vue';
import PictureItem from './PictureItem.vue';

const props = defineProps<{
  pictures: Picture[];
  picturesCount: number;
  draggingOverPage: boolean;
}>();

const sameUser = inject('sameUser') as ComputedRef<boolean>;

const isModalOpen = ref(false);

watch(props, () => {
  if (props.draggingOverPage) {
    isModalOpen.value = true;
  }
});
</script>

<template>
  <template v-if="picturesCount > 0">
    <p class="text-slate-400">
      {{ picturesCount }} pictures
    </p>
    <section class="grid-base">
      <AddItem v-if="sameUser" name="picture" @click="isModalOpen = true" />
      <template v-if="pictures.length">
        <PictureItem
          v-for="picture in pictures"
          :key="picture.id"
          :picture="picture"
        />
      </template>
    </section>
  </template>
  <template v-else>
    <div
      class="flex flex-col items-center justify-center gap-4 p-10 text-center bg-white rounded-md shadow-inner dark:bg-slate-700 text-slate-300 shadow-slate-300 dark:shadow-slate-900"
    >
      <CameraIcon class="w-20" />
      <p class="text-2xl font-semibold">
        There are no pictures to show
      </p>
      <button
        v-if="sameUser"
        title="Add a new picture"
        class="flex items-center gap-1 btn-form-primary"
        @click="isModalOpen = true"
      >
        <PlusIcon class="w-6" />
        <span>New</span>
      </button>
    </div>
  </template>
  <GenericModal
    title="New picture"
    :state="isModalOpen"
    :close="() => (isModalOpen = false)"
  >
    <PictureForm :close="() => (isModalOpen = false)" />
  </GenericModal>
</template>
