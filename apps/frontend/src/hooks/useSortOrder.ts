import { Gallery, Picture } from '@common/interfaces';
import { useLocalStorage } from '@vueuse/core';
import { readonly, Ref, watch } from 'vue';

import { SortType } from '@src/types';
import {
  alphabetOrderByName,
  ascendingOrder,
  descendingOrder,
} from '@utils/sort';


export function useSortOrder(items: Ref<Gallery[]> | Ref<Picture[]>) {
  const sortOrder = useLocalStorage<SortType>('sort', 'ascending');

  watch(items, () => {
    switch (sortOrder.value) {
      case 'alphabet':
        items.value = alphabetOrderByName(items.value);
        break;
      case 'ascending':
        items.value = ascendingOrder(items.value);
        break;
      case 'descending':
        items.value = descendingOrder(items.value);
        break;
      default:
        break;
    }
  });

  return {
    currentSortOrder: readonly(sortOrder),
    switchSortOrder() {
      switch (sortOrder.value) {
        case 'alphabet':
          items.value = ascendingOrder(items.value);
          sortOrder.value = 'ascending';
          break;
        case 'ascending':
          items.value = descendingOrder(items.value);
          sortOrder.value = 'descending';
          break;
        case 'descending':
          items.value = alphabetOrderByName(items.value);
          sortOrder.value = 'alphabet';
          break;
        default:
          break;
      }
    },
  };
}
