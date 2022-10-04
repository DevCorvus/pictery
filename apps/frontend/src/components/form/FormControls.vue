<script setup lang="ts">
import SpinnerCircle from '@components/SpinnerCircle.vue';
import { useMainStore } from '@store/useMainStore';

defineProps<{ title?: string }>();
const emit = defineEmits(['cancel']);

const mainStore = useMainStore();
</script>

<template>
  <hr>
  <div class="flex gap-4">
    <button
      :title="title"
      type="submit"
      :disabled="mainStore.loadingMode"
      class="btn-form-primary"
    >
      <span :class="mainStore.loadingMode && 'invisible'">
        <slot />
      </span>
      <div v-if="mainStore.loadingMode" class="absolute-center">
        <SpinnerCircle class="w-6 h-6" />
      </div>
    </button>
    <button type="button" class="btn-form-cancel" @click="emit('cancel')">
      Cancel
    </button>
  </div>
</template>
