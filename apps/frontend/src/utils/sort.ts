import { Gallery, Picture } from '@common/interfaces';

export function alphabetOrderByName(
  items: Gallery[] | Picture[]
): Gallery[] | Picture[] {
  const sortedItems = items.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return sortedItems;
}

export function descendingOrder(
  items: Gallery[] | Picture[]
): Gallery[] | Picture[] {
  const sortedItems = items.sort((a, b) => {
    const date1 = new Date(a.createdAt).getTime();
    const date2 = new Date(b.createdAt).getTime();
    return date1 - date2;
  });

  return sortedItems;
}

export function ascendingOrder(
  items: Gallery[] | Picture[]
): Gallery[] | Picture[] {
  const sortedItems = items.sort((a, b) => {
    const date1 = new Date(a.createdAt).getTime();
    const date2 = new Date(b.createdAt).getTime();
    return date2 - date1;
  });

  return sortedItems;
}
