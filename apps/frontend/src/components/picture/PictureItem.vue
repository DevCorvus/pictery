<script setup lang="ts">
import { Picture } from '@common/interfaces/picture.interface';
import { computed, inject, onMounted, ref, watch } from 'vue';

import DeleteMark from '@components/DeleteMark.vue';
import GenericModal from '@components/GenericModal.vue';
import MoveMark from '@components/MoveMark.vue';
import { UseIdList } from '@src/types';
import { useMainStore } from '@store/useMainStore';
import CameraSolidIcon from '@svg/CameraSolidIcon.vue';
import { textLimiter } from '@utils/textLimiter';

import PictureDetails from './PictureDetails.vue';
import PictureEditForm from './PictureEditForm.vue';

const props = defineProps<{
  picture: Picture;
}>();

const mainStore = useMainStore();

const isModalOpen = ref(false);
const editMode = ref(false);

const isLoading = ref(true);
const interaction = ref(false);

const picturesToDelete = inject('picturesToDelete') as UseIdList;
const selectedToDelete = ref(false);

const picturesToMove = inject('picturesToMove') as UseIdList;
const selectedToMove = ref(false);

const titleText = computed(() => {
  let action: string;
  if (mainStore.deleteMode || mainStore.movePicturesMode) {
    if (selectedToDelete.value || selectedToMove.value) {
      action = 'Deselect';
    } else {
      action = 'Select';
    }
  } else {
    action = 'Open';
  }
  return action + ' ' + props.picture.name;
});

function toggleSelectToMove() {
  const pictureId = props.picture.id;
  if (!selectedToMove.value) {
    picturesToMove.add(pictureId);
    selectedToMove.value = true;
  } else {
    picturesToMove.remove(pictureId);
    selectedToMove.value = false;
  }
}

function handleSelectToMove() {
  const pictureSelectedToMove = picturesToMove.exists(props.picture.id);
  if (pictureSelectedToMove) {
    selectedToMove.value = true;
  } else {
    selectedToMove.value = false;
  }
}

function toggleSelectToDelete() {
  const pictureId = props.picture.id;
  if (!selectedToDelete.value) {
    picturesToDelete.add(pictureId);
    selectedToDelete.value = true;
  } else {
    picturesToDelete.remove(pictureId);
    selectedToDelete.value = false;
  }
}

function handleSelectToDelete() {
  const pictureSelectedToDelete = picturesToDelete.exists(props.picture.id);
  if (pictureSelectedToDelete) {
    selectedToDelete.value = true;
  } else {
    selectedToDelete.value = false;
  }
}

const clickHandler = computed(() => {
  if (mainStore.movePicturesMode) {
    return toggleSelectToMove;
  } else if (mainStore.deleteMode) {
    return toggleSelectToDelete;
  } else {
    return () => (isModalOpen.value = true);
  }
});

function closeModal() {
  isModalOpen.value = false;
}

watch([props, picturesToMove.data], handleSelectToMove);
watch([props, picturesToDelete.data], handleSelectToDelete);

onMounted(() => {
  handleSelectToMove();
  handleSelectToDelete();
});
</script>

<template>
  <div :data-test="picture.name" :title="titleText" class="relative">
    <DeleteMark :show="selectedToDelete" />
    <MoveMark :show="selectedToMove" />
    <button
      class="relative w-full h-40 overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-700 group ring-base"
      :class="selectedToDelete ? 'focus:ring-red-400' : 'focus:ring-sky-300'"
      @click="clickHandler"
      @focusin="interaction = true"
      @focusout="interaction = false"
      @mouseenter="interaction = true"
      @mouseleave="interaction = false"
    >
      <div v-if="isLoading" class="flex flex-col items-center justify-center">
        <CameraSolidIcon class="w-16 text-slate-300 animate-pulse" />
      </div>
      <img
        v-show="!isLoading"
        :src="picture.url"
        :alt="picture.name"
        class="absolute top-0 left-0 object-cover w-full h-full transition duration-300 rounded-lg group-hover:scale-110 group-focus-within:scale-110"
        crossorigin="anonymous"
        @load="isLoading = false"
      >
      <div
        v-show="
          interaction ||
            mainStore.searchMode ||
            mainStore.movePicturesMode ||
            mainStore.deleteMode
        "
        class="absolute top-0 left-0 flex flex-col items-start justify-end w-full h-full px-4 pb-4"
      >
        <h3 :title="picture.name" class="text-white text-shadow">
          {{ textLimiter(picture.name) }}
        </h3>
      </div>
    </button>
  </div>
  <GenericModal
    :title="editMode ? 'Edit picture' : 'Picture'"
    :state="isModalOpen"
    :close="closeModal"
    :fullscreen="true"
  >
    <PictureDetails
      v-if="!editMode"
      :picture="picture"
      :edit-on="() => (editMode = true)"
      :close="closeModal"
    />
    <PictureEditForm
      v-else
      :picture="picture"
      :edit-off="() => (editMode = false)"
      :close="closeModal"
    />
  </GenericModal>
</template>
