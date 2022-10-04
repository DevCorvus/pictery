<script setup lang="ts">

import { Gallery } from '@common/interfaces/gallery.interface';
import { Form } from 'vee-validate';
import { inject, ref } from 'vue';

import AllowedUsers from '@components/form/AllowedUsers.vue';
import FormControls from '@components/form/FormControls.vue';
import NameAndDescription from '@components/form/NameAndDescription.vue';
import SwitchVisibility from '@components/form/SwitchVisibility.vue';
import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import { nameAndDescriptionSchema } from '@schemas/nameAndDescription';
import { updateGallery, GalleryDto } from '@services/gallery';
import { useMainStore } from '@store/useMainStore';

const props = defineProps<{
  gallery: Gallery;
  editOff: () => void;
}>();

const mainStore = useMainStore();

const initialValues = {
  name: props.gallery.name,
  description: props.gallery.description,
};
const originalAllowedUsers = ref<string[]>([]);

const newVisibility = ref(props.gallery.public);
const newAllowedUsers = ref<string[]>([]);

const somethingWentWrongError = ref(false);
const loadingAllowedUsersError = ref(false);

const updateGalleryFromUI = inject('updateGallery') as (
  updatedGallery: Gallery
) => void;

async function handleEdit(values: unknown) {
  if (loadingAllowedUsersError.value) return;

  somethingWentWrongError.value = false;

  const {
    name: oldName,
    description: oldDescription,
    public: oldVisibility,
  } = props.gallery;

  const { name: newName, description: newDescription } = values as {
    name: string;
    description: string;
  };

  const allowedUsersAreTheSame =
    originalAllowedUsers.value.length === newAllowedUsers.value.length &&
    newAllowedUsers.value.every((newAllowedUser) => {
      return originalAllowedUsers.value.includes(newAllowedUser);
    });

  if (
    (newVisibility.value || (!newVisibility.value && allowedUsersAreTheSame)) &&
    newName === oldName &&
    newDescription === oldDescription &&
    newVisibility.value === oldVisibility
  ) {
    props.editOff();
    return;
  }

  try {
    mainStore.setLoadingMode(true);

    const updatedGallery = await updateGallery(props.gallery.id, {
      ...(values as object),
      public: newVisibility.value,
      allowedUsers: newAllowedUsers.value,
    } as GalleryDto);
    updateGalleryFromUI(updatedGallery);

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
</script>

<template>
  <Form
    class="flex flex-col gap-6"
    :initial-values="initialValues"
    :validation-schema="nameAndDescriptionSchema"
    @submit="handleEdit"
  >
    <SwitchVisibility
      :state="newVisibility"
      @change="(newState) => (newVisibility = newState)"
    />
    <NameAndDescription name="Gallery" />
    <AllowedUsers
      v-if="!newVisibility"
      :gallery-id="gallery.id"
      @load="(data) => (originalAllowedUsers = data)"
      @change="(data) => (newAllowedUsers = data)"
      @error="loadingAllowedUsersError = true"
    />
    <FormControls @cancel="handleCancel">
      Save
    </FormControls>
  </Form>
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
