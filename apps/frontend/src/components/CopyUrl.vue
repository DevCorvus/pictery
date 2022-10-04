<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

import ClipboardCheckedIcon from '@svg/ClipboardCheckedIcon.vue';
import ClipboardCopyIcon from '@svg/ClipboardCopyIcon.vue';

const { copy, copied } = useClipboard({ source: window.location.href });
</script>

<template>
  <button
    data-test="clipboard"
    :title="copied ? 'Copied!' : 'Copy URL'"
    class="btn-panel-secondary"
    @click="copy()"
  >
    <ClipboardCopyIcon
      v-if="!copied"
      class="w-6"
    />
    <ClipboardCheckedIcon
      v-else
      class="w-6"
    />
  </button>
</template>
