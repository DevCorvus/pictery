<script setup lang="ts">

import { Gallery } from '@common/interfaces/gallery.interface';
import { AxiosError } from 'axios';
import { Form } from 'vee-validate';
import { inject, ref } from 'vue';

import AllowedUsers from '@components/form/AllowedUsers.vue';
import FormControls from '@components/form/FormControls.vue';
import NameAndDescription from '@components/form/NameAndDescription.vue';
import SwitchVisibility from '@components/form/SwitchVisibility.vue';
import LimitReached from '@components/LimitReached.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { nameAndDescriptionSchema } from '@schemas/nameAndDescription';
import { createGallery, GalleryDto } from '@services/gallery';
import { useMainStore } from '@store/useMainStore';

const props = defineProps<{
  close: () => void;
}>();

const mainStore = useMainStore();

const initialValues = { name: '', description: '' };
const isPublic = ref(true);
const allowedUsers = ref<string[]>([]);

const addGallery = inject('addGallery') as (newGallery: Gallery) => void;

const limitReachedError = ref(false);
const somethingWentWrongError = ref(false);

async function handleSubmit(values: unknown) {
  limitReachedError.value = false;
  somethingWentWrongError.value = false;

  if (mainStore.loadingMode) return;

  try {
    mainStore.setLoadingMode(true);

    const newGallery = await createGallery({
      ...(values as object),
      public: isPublic.value,
      allowedUsers: allowedUsers.value,
    } as GalleryDto);
    addGallery(newGallery);

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
  <Form
    class="flex flex-col gap-6"
    :validation-schema="nameAndDescriptionSchema"
    :initial-values="initialValues"
    @submit="handleSubmit"
  >
    <SwitchVisibility
      :state="isPublic"
      @change="(newState) => (isPublic = newState)"
    />
    <NameAndDescription name="Gallery" />
    <AllowedUsers
      v-if="!isPublic"
      @change="(data) => (allowedUsers = data)"
    />
    <FormControls @cancel="close">
      Create
    </FormControls>
  </Form>
  <LimitReached
    :show="limitReachedError"
    name="galleries"
  />
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
