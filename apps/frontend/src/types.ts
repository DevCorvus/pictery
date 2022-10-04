import { Ref } from 'vue';

export type SortType = 'alphabet' | 'ascending' | 'descending';

export interface UseIdList {
  data: Readonly<Ref<readonly string[]>>;
  add(newId: string): void;
  remove(idToRemove: string): void;
  exists(id: string): boolean;
  reset(): void;
}
