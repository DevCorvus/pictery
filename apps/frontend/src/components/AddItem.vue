<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';
import PlusIcon from '@svg/PlusIcon.vue';

defineProps<{ name: string }>();

const mainStore = useMainStore();
</script>

<template>
  <button
    v-if="!mainStore.deleteMode && !mainStore.movePicturesMode"
    data-test="addItem"
    :title="`Add a new ${name}`"
    class="flex flex-col items-center justify-center h-40 bg-white rounded-lg shadow-md dark:bg-slate-700 group ring-base focus:ring-sky-300"
  >
    <PlusIcon
      class="w-16 transition duration-300 text-slate-300 group-hover:text-sky-300 group-focus:text-sky-300 group-hover:scale-110 group-focus:scale-110"
    />
  </button>
</template>
