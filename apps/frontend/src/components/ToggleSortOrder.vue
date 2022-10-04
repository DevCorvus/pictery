<script setup lang="ts">
import { SortType } from '@src/types';
import SortAscendingIcon from '@svg/SortAscendingIcon.vue';
import SortDescendingIcon from '@svg/SortDescendingIcon.vue';

defineProps<{
  sortOrder: SortType;
}>();
</script>

<template>
  <button
    :data-test="sortOrder"
    :title="`Toggle sort order (${sortOrder})`"
    class="btn-panel-primary"
    style="max-width: 40px; max-height: 40px"
  >
    <span
      v-if="sortOrder === 'alphabet'"
      class="p-1 text-2xl font-semibold"
    >
      A
    </span>
    <SortAscendingIcon
      v-if="sortOrder === 'ascending'"
      class="w-6"
    />
    <SortDescendingIcon
      v-if="sortOrder === 'descending'"
      class="w-6"
    />
  </button>
</template>
