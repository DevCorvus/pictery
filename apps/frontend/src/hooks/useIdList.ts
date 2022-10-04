import { readonly, ref } from 'vue';

import { UseIdList } from '@src/types';

export function useIdList(): UseIdList {
  const ids = ref<string[]>([]);

  return {
    data: readonly(ids),
    add(newId: string) {
      ids.value = [...ids.value, newId];
    },
    remove(idToRemove: string) {
      ids.value = ids.value.filter((id) => {
        return id !== idToRemove;
      });
    },
    exists(id: string) {
      return ids.value.includes(id);
    },
    reset() {
      ids.value = [];
    },
  };
}
