<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { ref } from 'vue';

import QRCodeIcon from '@svg/QRCodeIcon.vue';
import { textLimiter } from '@utils/textLimiter';

import GenericModal from './GenericModal.vue';

defineProps<{ name: string }>();

const isModalOpen = ref(false);

const qrcode = useQRCode(window.location.href);
</script>

<template>
  <button
    data-test="openQr"
    title="QR Code to URL"
    class="btn-panel-secondary"
    @click="isModalOpen = true"
  >
    <QRCodeIcon class="w-6" />
  </button>
  <GenericModal
    title="QR Code"
    :state="isModalOpen"
    :close="() => (isModalOpen = false)"
  >
    <div class="flex flex-col items-center justify-center gap-2">
      <img data-test="qr" :src="qrcode" alt="QR Code">
      <p :title="name" class="text-xl">
        {{ textLimiter(name) }}
      </p>
    </div>
  </GenericModal>
</template>
