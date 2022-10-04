<script setup lang="ts">
import { ONE_MEGABYTE } from '@common/constants';
import { ref, watch } from 'vue';

import SpinnerCircle from '@components/SpinnerCircle.vue';
import CameraIcon from '@svg/CameraIcon.vue';

const props = defineProps<{
  file: File | null;
  error: boolean;
}>();

const emit = defineEmits<{
  (e: 'change', file: File): void;
  (e: 'error', error: boolean): void;
}>();

watch(props, () => {
  emit('error', false);

  if (props.file) {
    const { size, type } = props.file;
    if (!type.startsWith('image') || size > ONE_MEGABYTE) {
      emit('error', true);
    } else {
      showImagePreview(props.file);
    }
  }
});

function showImagePreview(file: File) {
  isImagePreviewLoading.value = true;

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.onload = () => {
    imagePreview.value = fileReader.result as string;
    isImagePreviewLoading.value = false;
  };
}

const imagePreview = ref<string | null>(null);
const isImagePreviewLoading = ref(false);

const fileInputRef = ref<HTMLInputElement | null>(null);

function handleImageInputClick() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function handleFileInputChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files && (input.files[0] as File);
  if (file) {
    emit('change', file);
  }
}

const draggingOver = ref(false);

function handleFileDrop(e: DragEvent) {
  const file = e.dataTransfer?.files[0];
  if (file) {
    emit('change', file);
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="image" class="label">Image</label>
    <input
      id="image"
      ref="fileInputRef"
      class="hidden"
      type="file"
      name="image"
      accept="image/*"
      @change="handleFileInputChange"
    >
    <button
      data-test="fileInput"
      type="button"
      class="object-cover w-full h-32 transition rounded-lg shadow-inner hover:text-blue-400 dark:hover:text-blue-400 dark:focus:text-blue-400 focus:text-blue-400 bg-slate-100 dark:bg-slate-500 drop-shadow-sm shadow-slate-300 dark:shadow-slate-800"
      :class="
        draggingOver
          ? 'text-blue-400 dark:text-blue-400'
          : 'text-blue-300 dark:text-blue-300'
      "
      @click="handleImageInputClick"
      @dragover="draggingOver = true"
      @dragleave="draggingOver = false"
      @drop="handleFileDrop"
    >
      <div
        v-if="isImagePreviewLoading"
        class="flex flex-col items-center justify-center w-full h-full"
      >
        <SpinnerCircle class="w-12 h-12" />
      </div>
      <template v-else>
        <img
          v-if="imagePreview"
          :src="imagePreview"
          class="object-cover w-full h-full rounded-lg"
          alt="Image upload preview"
        >
        <div v-else class="flex flex-col items-center justify-center">
          <CameraIcon class="w-12" />
          <span>Select file or Drop it like it's hot</span>
        </div>
      </template>
    </button>
    <span v-if="error" class="error">
      Must be an image and not exceed 1 MB
    </span>
  </div>
</template>
