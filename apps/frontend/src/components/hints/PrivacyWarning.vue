<script setup lang="ts">
import HintMessage from './HintMessage.vue';
</script>
<template>
  <HintMessage name="privacyWarning" warning>
    Pictures are not completely private as they can be accessed from outside the
    app with a direct URL. But these links will remain hidden within the app as
    long as you don't share them.
  </HintMessage>
</template>
