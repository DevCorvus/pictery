<script setup lang="ts">
import { Gallery } from '@common/interfaces/gallery.interface';
import { useDateFormat, useTimeAgo } from '@vueuse/core';
import { ComputedRef, inject, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import ConfirmDelete from '@components/ConfirmDelete.vue';
import GenericModal from '@components/GenericModal.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { deleteGallery } from '@services/gallery';
import { useMainStore } from '@store/useMainStore';
import DocumentIcon from '@svg/DocumentIcon.vue';
import PencilSquareIcon from '@svg/PencilSquareIcon.vue';

import GalleryEditForm from './GalleryEditForm.vue';

const props = defineProps<{ gallery: Gallery }>();
const createdAtFormatted = useDateFormat(props.gallery.createdAt, 'YYYY-MM-DD');
const updatedAtFormatted = useTimeAgo(props.gallery.updatedAt);

const router = useRouter();
const mainStore = useMainStore();

const isModalOpen = ref(false);
const editMode = ref(false);

const confirmDelete = ref(false);
const somethingWentWrongError = ref(false);

const sameUser = inject('sameUser') as ComputedRef<boolean>;

function handleOpen() {
  mainStore.setMovePicturesMode(false);
  mainStore.setDeleteMode(false);
  isModalOpen.value = true;
}

async function handleDelete() {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);
    await deleteGallery(props.gallery.id);
    router.replace({ name: 'Dashboard' });
  } catch (err) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}

function handleEditMode() {
  confirmDelete.value = false;
  editMode.value = true;
}

watch(isModalOpen, () => {
  if (!isModalOpen.value) {
    confirmDelete.value = false;
    editMode.value = false;
  }
});
</script>

<template>
  <button
    data-test="openGalleryDetails"
    title="Open gallery details"
    class="btn-panel-primary"
    @click="handleOpen"
  >
    <DocumentIcon class="w-6" />
  </button>
  <GenericModal
    :title="editMode ? 'Edit gallery' : 'Gallery'"
    :state="isModalOpen"
    :close="() => (isModalOpen = false)"
  >
    <section v-if="!editMode" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <span class="label">Visibility</span>
        <div>
          <span
            class="inline-block w-full py-2 text-center text-white rounded-md shadow-md"
            :class="gallery.public ? 'bg-rose-500' : 'bg-green-500'"
          >
            {{ gallery.public ? 'Public' : 'Private' }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-1 break-words">
        <span class="label">Name</span>
        <p>{{ gallery.name }}</p>
      </div>
      <div class="flex flex-col gap-1 break-words whitespace-pre-line">
        <span class="label">Description</span>
        <div>
          <p v-if="gallery.description">
            {{ gallery.description }}
          </p>
          <p v-else class="italic">
            No description
          </p>
        </div>
      </div>
      <div class="text-slate-400">
        <p>Created at {{ createdAtFormatted }}</p>
        <p>Last update {{ updatedAtFormatted }}</p>
      </div>
      <router-link
        :to="{ name: 'Profile', params: { id: gallery.userId } }"
        class="transition text-sky-500 hover:text-sky-400 focus:text-sky-400"
      >
        Go to author's profile
      </router-link>
      <template v-if="sameUser">
        <hr>
        <div class="flex gap-4">
          <button
            title="Edit this gallery"
            class="flex items-center gap-1 btn-form-primary"
            @click="handleEditMode"
          >
            <PencilSquareIcon class="w-5" />
            <span>Edit</span>
          </button>
          <button
            title="Delete this gallery with all their pictures permantently"
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
    </section>
    <GalleryEditForm
      v-else
      :gallery="gallery"
      :edit-off="() => (editMode = false)"
    />
  </GenericModal>
</template>
