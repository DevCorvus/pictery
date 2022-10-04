<script setup lang="ts">
import { Picture } from '@common/interfaces/picture.interface';
import { useDateFormat, useTimeAgo } from '@vueuse/core';
import axios from 'axios';
import { ComputedRef, inject, ref } from 'vue';


import ConfirmDelete from '@components/ConfirmDelete.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { deletePicture } from '@services/picture';
import { useMainStore } from '@store/useMainStore';
import DownloadIcon from '@svg/DownloadIcon.vue';
import PencilSquareIcon from '@svg/PencilSquareIcon.vue';

const props = defineProps<{
  picture: Picture;
  editOn: () => void;
  close: () => void;
}>();

const createdAtFormatted = useDateFormat(props.picture.createdAt, 'YYYY-MM-DD');
const updatedAtFormatted = useTimeAgo(props.picture.updatedAt);

const sameUser = inject('sameUser') as ComputedRef<boolean>;

const mainStore = useMainStore();

const downloadLinkRef = ref<HTMLAnchorElement | null>(null);
const downloadAlready = ref(false);

async function downloadPicture() {
  if (downloadLinkRef.value) {
    if (downloadAlready.value) {
      downloadLinkRef.value.click();
    } else {
      try {
        const { data } = await axios.get(props.picture.url, {
          responseType: 'arraybuffer',
        });

        const url = URL.createObjectURL(new Blob([data]));
        const { name } = props.picture;

        downloadLinkRef.value.href = url;
        downloadLinkRef.value.download = `${name}.jpg`;
        downloadLinkRef.value.click();

        downloadAlready.value = true;
      } catch (error) {
        // ...
      }
    }
  }
}

const confirmDelete = ref(false);
const somethingWentWrongError = ref(false);

const deletePictureFromUI = inject('deletePicture') as (id: string) => void;

async function handleDelete() {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);
    const pictureId = props.picture.id;
    await deletePicture(pictureId);
    deletePictureFromUI(pictureId);
    props.close();
  } catch (err) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}

function handleEditMode() {
  confirmDelete.value = false;
  props.editOn();
}
</script>

<template>
  <div class="flex flex-col gap-6 md:flex-row md:justify-evenly">
    <div class="relative md:max-w-md lg:max-w-xl xl:max-w-3xl">
      <img
        :title="picture.name"
        :src="picture.url"
        :alt="picture.name"
        class="rounded-2xl md-max-h-75-screen"
        crossorigin="anonymous"
      >
      <a
        ref="downloadLinkRef"
        class="absolute invisible"
        href=""
        download=""
      />
      <button
        data-test="downloadBtn"
        title="Download this picture"
        class="absolute p-2 text-white transition bg-white rounded-full shadow-sm hover:text-black focus:text-black left-4 bottom-4 bg-opacity-30 hover:bg-opacity-70 focus:bg-opacity-70"
        @click="downloadPicture"
      >
        <DownloadIcon class="w-6" />
      </button>
    </div>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <span class="text-xl font-semibold break-words">
          {{ picture.name }}
        </span>
        <div class="break-words whitespace-pre-line">
          <p v-if="picture.description">
            {{ picture.description }}
          </p>
          <p
            v-else
            class="italic"
          >
            No description
          </p>
        </div>
      </div>
      <div class="text-slate-400">
        <p>Created at {{ createdAtFormatted }}</p>
        <p>Last update {{ updatedAtFormatted }}</p>
      </div>
      <template v-if="sameUser">
        <hr>
        <div class="flex gap-4">
          <button
            title="Edit this picture"
            class="flex items-center gap-1 btn-form-primary"
            @click="handleEditMode"
          >
            <PencilSquareIcon class="w-5" />
            <span>Edit</span>
          </button>
          <button
            title="Delete this picture permanently"
            :disabled="mainStore.loadingMode"
            class="btn-form-danger"
            @click="confirmDelete = true"
          >
            Delete
          </button>
        </div>
        <ConfirmDelete
          :show="confirmDelete"
          @confirm="handleDelete"
          @cancel="confirmDelete = false"
        />
        <SomethingWentWrong :show="somethingWentWrongError" />
      </template>
    </div>
  </div>
</template>
