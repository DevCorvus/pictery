<script setup lang="ts">
import { computed, ref, Transition, watchEffect } from 'vue';

const props = defineProps<{
  show: boolean;
  position:
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  expires?: number;
}>();

const positionClasses = computed(() => {
  switch (props.position) {
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';

    case 'left':
      return 'top-1/2 left-6 -translate-y-1/2';

    case 'right':
      return 'top-1/2 right-6 -translate-y-1/2';

    case 'top':
      return 'mt-20 top-0 left-1/2 -translate-x-1/2';

    case 'top-left':
      return 'mt-20 top-0 left-6';

    case 'top-right':
      return 'mt-20 top-0 right-6';

    case 'bottom':
      return 'mb-6 bottom-0 left-1/2 -translate-x-1/2';

    case 'bottom-left':
      return 'bottom-6 left-6';

    case 'bottom-right':
      return 'bottom-6 right-6';

    default:
      return '';
  }
});

const closed = ref(false);

let timeoutId: number | null;

watchEffect(() => {
  if (props.show && props.expires) {
    timeoutId = window.setTimeout(() => {
      closed.value = true;
    }, props.expires);
  } else {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    closed.value = false;
  }
});
</script>

<template>
  <Transition :name="position.split('-')[0]">
    <div
      v-if="!closed && show"
      class="fixed z-50 p-4 font-semibold bg-white rounded-md shadow-md dark:bg-slate-700"
      :class="positionClasses"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.center-enter-active,
.center-leave-active {
  transition: all 500ms ease;
  opacity: 1;
}
.center-enter-from,
.center-leave-to {
  opacity: 0;
}

.top-enter-active,
.top-leave-active {
  transition: all 1s ease;
}
.top-enter-from,
.top-leave-to {
  margin-top: -100vh;
}

.bottom-enter-active,
.bottom-leave-active {
  transition: all 1s ease;
}
.bottom-enter-from,
.bottom-leave-to {
  margin-bottom: -100vh;
}

.left-enter-active,
.left-leave-active {
  transition: all 1s ease;
}
.left-enter-from,
.left-leave-to {
  margin-left: -100vw;
}

.right-enter-active,
.right-leave-active {
  transition: all 1s ease;
}
.right-enter-from,
.right-leave-to {
  margin-right: -100vw;
}
</style>
