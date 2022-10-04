<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';

import HintMessage from './HintMessage.vue';

const mainStore = useMainStore();
</script>
<template>
  <HintMessage v-if="mainStore.deleteMode" name="deleteModeFirstTime">
    When using delete mode, you can select items by clicking on them to be
    deleted after confirmation.
  </HintMessage>
</template>
