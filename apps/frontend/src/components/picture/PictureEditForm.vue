<script setup lang="ts">
import { Picture } from '@common/interfaces/picture.interface';
import { Form } from 'vee-validate';
import { inject, onUnmounted, ref } from 'vue';

import FormControls from '@components/form/FormControls.vue';
import NameAndDescription from '@components/form/NameAndDescription.vue';
import SelectGallery from '@components/form/SelectGallery.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { nameAndDescriptionSchema } from '@schemas/nameAndDescription';
import { updatePicture, UpdatePictureDto } from '@services/picture';
import { useMainStore } from '@store/useMainStore';

const props = defineProps<{
  picture: Picture;
  editOff: () => void;
}>();

const mainStore = useMainStore();

const initialValues = {
  name: props.picture.name,
  description: props.picture.description,
};
const galleryId = ref(props.picture.galleryId);

const somethingWentWrongError = ref(false);

const updatePictureFromUI = inject('updatePicture') as (
  updatedPicture: Picture
) => void;

const deletePictureFromUI = inject('deletePicture') as (id: string) => void;

async function handleEdit(values: unknown) {
  somethingWentWrongError.value = false;

  try {
    mainStore.setLoadingMode(true);

    const updatedPicture = await updatePicture(props.picture.id, {
      ...(values as object),
      galleryId: galleryId.value,
    } as UpdatePictureDto);

    const currentGalleryId = props.picture.galleryId;

    if (updatedPicture.galleryId === currentGalleryId) {
      updatePictureFromUI(updatedPicture);
    } else {
      deletePictureFromUI(updatedPicture.id);
    }

    props.editOff();
  } catch (err) {
    somethingWentWrongError.value = true;
  } finally {
    mainStore.setLoadingMode(false);
  }
}

function handleCancel() {
  somethingWentWrongError.value = false;
  props.editOff();
}

onUnmounted(handleCancel);
</script>

<template>
  <div class="flex flex-col gap-6 md:flex-row md:justify-evenly">
    <div class="md:max-w-md lg:max-w-xl xl:max-w-3xl">
      <img
        :title="picture.name"
        :src="picture.url"
        :alt="picture.name"
        class="rounded-2xl md-max-h-75-screen"
        crossorigin="anonymous"
      >
    </div>
    <Form
      class="flex flex-col gap-6"
      :validation-schema="nameAndDescriptionSchema"
      :initial-values="initialValues"
      @submit="handleEdit"
    >
      <SelectGallery @change="(newGalleryId) => (galleryId = newGalleryId)" />
      <NameAndDescription name="Picture" />
      <FormControls @cancel="handleCancel">
        Save
      </FormControls>
    </Form>
  </div>
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
