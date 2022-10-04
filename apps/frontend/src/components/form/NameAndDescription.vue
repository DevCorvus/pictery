<script setup lang="ts">
import { useFocus } from '@vueuse/core';
import { ErrorMessage, Field } from 'vee-validate';
import { ref } from 'vue';


defineProps<{ name: string }>();

const firstInputRef = ref<HTMLInputElement | null>(null);
useFocus(firstInputRef, { initialValue: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      for="name"
      class="label"
    >Name</label>
    <Field
      id="name"
      ref="firstInputRef"
      class="p-2 input"
      :placeholder="`${name} name`"
      type="text"
      name="name"
    />
    <ErrorMessage
      name="name"
      class="error"
    />
  </div>
  <div class="flex flex-col gap-2">
    <label
      for="description"
      class="label"
    >
      Description <span class="text-sm">(optional)</span>
    </label>
    <Field
      id="description"
      as="textarea"
      class="p-2 input"
      :placeholder="`${name} description`"
      name="description"
      rows="3"
    />
    <ErrorMessage
      name="description"
      class="error"
    />
  </div>
</template>
