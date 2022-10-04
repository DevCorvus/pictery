<script setup lang="ts">
import { Transition } from 'vue';

import TrashSolidIcon from '@svg/TrashSolidIcon.vue';

defineProps<{ show?: boolean }>();
</script>

<template>
  <Transition name="mark">
    <div
      v-if="show"
      class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-red-400 bg-opacity-50 rounded-md pointer-events-none"
    >
      <TrashSolidIcon class="w-16 text-white" />
    </div>
  </Transition>
</template>

<style scoped>
.mark-enter-active,
.mark-leave-active {
  opacity: 1;
  transition: all 150ms ease;
}
.mark-enter-from,
.mark-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
