export function allValuesInArrayAreUnique<T>(arr: T[]): boolean {
  const arrayLength = arr.length;
  const setLength = new Set(arr).size;

  return arrayLength === setLength;
}
