<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';

import FloatingDialog from './FloatingDialog.vue';
import SpinnerCircle from './SpinnerCircle.vue';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['confirm', 'cancel']);

const mainStore = useMainStore();
</script>

<template>
  <FloatingDialog
    :show="show"
    position="center"
    class="border-t-4 border-red-500"
  >
    <div class="flex flex-col gap-2">
      <p class="text-center">
        Are you sure?
      </p>
      <SpinnerCircle
        v-if="mainStore.loadingMode"
        class="w-6 h-6 mx-auto"
        color="border-red-300"
      />
      <div v-else class="flex gap-2 font-normal">
        <button class="btn-form-danger" @click="emit('confirm')">
          Confirm
        </button>
        <button class="btn-form-cancel" @click="emit('cancel')">
          Cancel
        </button>
      </div>
    </div>
  </FloatingDialog>
</template>
