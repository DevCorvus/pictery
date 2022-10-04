<script setup lang="ts">
defineProps<{ state: boolean }>();
const emit = defineEmits(['change']);
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="label">Visibility</span>
    <div class="flex gap-2">
      <button
        data-test="selectPrivate"
        type="button"
        :disabled="!state"
        class="flex-1 py-2 transition rounded-md shadow-md"
        :class="
          !state
            ? 'bg-green-500 text-white'
            : 'bg-green-100 dark:bg-green-900 dark:hover:text-green-400 dark:focus:text-green-400 dark:text-green-500 text-green-400 hover:text-green-500 focus:text-green-500'
        "
        @click="emit('change', false)"
      >
        Private
      </button>
      <button
        data-test="selectPublic"
        type="button"
        :disabled="state"
        class="flex-1 py-2 transition rounded-md shadow-md"
        :class="
          state
            ? 'bg-rose-500 text-white'
            : 'bg-rose-100 dark:bg-rose-800 dark:text-rose-400 dark:hover:text-rose-300 dark:focus:text-rose-300 text-rose-400 hover:text-rose-500 focus:text-rose-500'
        "
        @click="emit('change', true)"
      >
        Public
      </button>
    </div>
  </div>
</template>
