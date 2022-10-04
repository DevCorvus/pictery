<script setup lang="ts">
import XCircleSolidIcon from '@svg/XCircleSolidIcon.vue';

import FloatingDialog from './FloatingDialog.vue';

defineProps<{
  show: boolean;
  name: string;
}>();
</script>

<template>
  <FloatingDialog
    :show="show"
    :expires="3000"
    position="bottom-left"
    class="text-red-400 border-l-4 border-red-400"
  >
    <p class="flex gap-1">
      <XCircleSolidIcon class="w-6" /><span>
        Limit of {{ name }} reached .(
      </span>
    </p>
  </FloatingDialog>
</template>
