<script setup lang="ts">
defineProps<{ color?: string }>();
</script>

<template>
  <span
    class="inline-block border-4 rounded-full border-r-transparent animate-spin"
    :class="color ? color : 'border-sky-300'"
  />
</template>
