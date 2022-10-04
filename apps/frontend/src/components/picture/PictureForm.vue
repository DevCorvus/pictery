<script setup lang="ts">
import { Picture } from '@common/interfaces/picture.interface';
import { AxiosError } from 'axios';
import { Form } from 'vee-validate';
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';

import FormControls from '@components/form/FormControls.vue';
import ImageUpload from '@components/form/ImageUpload.vue';
import NameAndDescription from '@components/form/NameAndDescription.vue';
import LimitReached from '@components/LimitReached.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { nameAndDescriptionSchema } from '@schemas/nameAndDescription';
import { createPicture, CreatePictureDto } from '@services/picture';
import { useMainStore } from '@store/useMainStore';

const props = defineProps<{
  close: () => void;
}>();

const mainStore = useMainStore();
const route = useRoute();

const initialValues = { name: '', description: '' };

const file = ref<File | null>(null);
const fileError = ref(false);

const addPicture = inject('addPicture') as (newPicture: Picture) => void;

const limitReachedError = ref(false);
const somethingWentWrongError = ref(false);

async function handleSubmit(values: unknown) {
  somethingWentWrongError.value = false;

  if (mainStore.loadingMode) return;

  if (!file.value) {
    fileError.value = true;
    return;
  }

  try {
    mainStore.setLoadingMode(true);
    const newPicture = await createPicture({
      galleryId: route.params.id as string,
      ...(values as object),
      image: file.value,
    } as CreatePictureDto);
    addPicture(newPicture);
    props.close();
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.data.status === 409) {
        limitReachedError.value = true;
      } else {
        somethingWentWrongError.value = true;
      }
    }
  } finally {
    mainStore.setLoadingMode(false);
  }
}
</script>

<template>
  <div
    @dragover.prevent
    @drop.prevent
  >
    <Form
      class="flex flex-col gap-6"
      :validation-schema="nameAndDescriptionSchema"
      :initial-values="initialValues"
      @submit="handleSubmit"
    >
      <ImageUpload
        :file="file"
        :error="fileError"
        @change="(newFile) => (file = newFile)"
        @error="(newState) => (fileError = newState)"
      />
      <NameAndDescription name="Picture" />
      <FormControls @cancel="close">
        Create
      </FormControls>
    </Form>
  </div>
  <LimitReached
    :show="limitReachedError"
    name="pictures"
  />
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
