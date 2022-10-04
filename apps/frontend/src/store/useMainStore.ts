import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useMainStore = defineStore('main', () => {
  const darkModeLocalStorage = useLocalStorage('darkMode', false);

  const darkMode = ref(darkModeLocalStorage.value);
  const initialized = ref(false);
  const loadingMode = ref(false);
  const errorMode = ref(false);
  const searchMode = ref(false);
  const deleteMode = ref(false);
  const movePicturesMode = ref(false);

  function setInitialized(newState: boolean): void {
    initialized.value = newState;
  }

  function toggleDarkMode() {
    const newState = !darkMode.value;

    darkMode.value = newState;
    darkModeLocalStorage.value = newState;
  }

  function setLoadingMode(newState: boolean): void {
    loadingMode.value = newState;
  }

  function setErrorMode(newState: boolean): void {
    errorMode.value = newState;
  }

  function setSearchMode(newState: boolean): void {
    searchMode.value = newState;
  }

  function setDeleteMode(newState: boolean): void {
    deleteMode.value = newState;
  }

  function setMovePicturesMode(newState: boolean): void {
    movePicturesMode.value = newState;
  }

  return {
    darkMode,
    initialized,
    loadingMode,
    errorMode,
    searchMode,
    deleteMode,
    movePicturesMode,
    toggleDarkMode,
    setInitialized,
    setLoadingMode,
    setErrorMode,
    setSearchMode,
    setDeleteMode,
    setMovePicturesMode,
  };
});
