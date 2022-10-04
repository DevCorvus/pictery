<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useMainStore } from '@store/useMainStore';
import SearchIcon from '@svg/SearchIcon.vue';

interface ItemInterface {
  name: string;
}

const props = defineProps<{
  items: ItemInterface[];
  name: string;
}>();

const emit = defineEmits<{
  (e: 'filteredItems', data: ItemInterface[]): void;
}>();

const store = useMainStore();

const input = ref('');

let timeoutId: number;

function handleInputChange() {
  const filteredItems = props.items.filter((item) => {
    const itemParam = item.name.toLowerCase();
    const searchParam = input.value.toLowerCase();
    return itemParam.includes(searchParam);
  });

  if (timeoutId) window.clearTimeout(timeoutId);

  timeoutId = window.setTimeout(() => {
    emit('filteredItems', filteredItems);
    input.value === '' ? store.setSearchMode(false) : store.setSearchMode(true);
  }, 500);
}

watch([props, input], handleInputChange);
onMounted(handleInputChange);
</script>

<template>
  <div
    class="flex items-center gap-2 p-3 bg-white shadow-inner dark:bg-slate-700 group rounded-xl shadow-slate-400 dark:shadow-slate-800 ring-base focus-within:ring-sky-400"
  >
    <label for="search">
      <SearchIcon
        class="w-6 transition text-slate-400 group-focus-within:text-sky-500"
      />
    </label>
    <input
      id="search"
      v-model="input"
      class="w-full dark:bg-slate-700"
      type="text"
      :placeholder="`Search some ${name}...`"
    >
  </div>
</template>
