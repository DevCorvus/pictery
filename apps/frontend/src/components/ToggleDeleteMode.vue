<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';
import TrashIcon from '@svg/TrashIcon.vue';
import XCircleIcon from '@svg/XCircleIcon.vue';

const mainStore = useMainStore();
</script>

<template>
  <button
    data-test="toggleDeleteMode"
    title="Toggle delete mode"
    class="btn-panel-danger"
  >
    <TrashIcon
      v-if="!mainStore.deleteMode"
      class="w-6"
    />
    <XCircleIcon
      v-else
      class="w-6 text-red-500"
    />
  </button>
</template>
