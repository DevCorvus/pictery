<script setup lang="ts">
import { useMainStore } from '@store/useMainStore';

import HintMessage from './HintMessage.vue';

const mainStore = useMainStore();
</script>
<template>
  <HintMessage
    v-if="mainStore.movePicturesMode"
    name="movePicturesModeFirstTime"
  >
    When using the move pictures mode, you can select them by clicking as well
    as the gallery you want to move them to after confirmation.
  </HintMessage>
</template>
