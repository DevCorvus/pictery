<script setup lang="ts">

import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref, Teleport, Transition, watch } from 'vue';

import { useMainStore } from '@store/useMainStore';
import XIcon from '@svg/XIcon.vue';

const props = defineProps<{
  title: string;
  state: boolean;
  fullscreen?: boolean;
  close: () => void;
  preventDrop?: boolean;
}>();

const modal = ref(null);

const { deactivate } = useFocusTrap(modal, { immediate: true });
onClickOutside(modal, props.close);

function closeOnEsc(e: KeyboardEvent) {
  if (e.code === 'Escape') props.close();
}

watch(props, () => {
  if (props.state) {
    document.addEventListener('keyup', closeOnEsc);
  } else {
    document.removeEventListener('keyup', closeOnEsc);
    deactivate();
  }
});

const mainStore = useMainStore();
</script>

<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div
        v-if="state"
        data-test="modalRoot"
        class="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-70"
        :class="mainStore.darkMode && 'dark'"
      >
        <div
          ref="modal"
          class="flex flex-col w-screen h-screen max-h-screen gap-4 p-6 bg-white rounded-md shadow-md outline-none dark:bg-slate-700 dark:text-slate-100"
          :class="!fullscreen && 'md:h-auto md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4'"
        >
          <header class="flex items-center justify-between">
            <span class="text-xl font-semibold text-sky-500">{{ title }}</span>
            <button
              ref="closeBtn"
              data-test="closeModal"
              title="Close"
              class="bg-sky-100 dark:bg-sky-900 dark:hover:bg-sky-500 dark:focus:bg-sky-500 text-sky-500 hover:text-white focus:text-white hover:bg-sky-500 focus:bg-sky-500 transition p-1.5 rounded-full shadow-md"
              @click="close"
            >
              <XIcon class="w-6" />
            </button>
          </header>
          <hr>
          <div class="relative p-2 overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  opacity: 1;
  transition: all 200ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
