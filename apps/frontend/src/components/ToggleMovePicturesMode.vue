<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';
import HandIcon from '@svg/HandIcon.vue';
import XCircleIcon from '@svg/XCircleIcon.vue';

const mainStore = useMainStore();
</script>

<template>
  <button
    data-test="toggleMovePicturesMode"
    title="Toggle move pictures mode"
    class="btn-panel-primary"
  >
    <HandIcon
      v-if="!mainStore.movePicturesMode"
      class="w-6"
    />
    <XCircleIcon
      v-else
      class="w-6 text-sky-500"
    />
  </button>
</template>
