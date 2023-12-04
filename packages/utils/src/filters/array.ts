/**
 * Maps an array of values to a single object by applying a function to each value.
 *
 * @param {T[]} arr - The array of values to be mapped.
 * @param {(value: T) => Record<string, U>} fn - The function to apply to each value.
 * @return {Record<string, U>} - The resulting object with keys mapped from the array values.
 */
export const mapToKeys = <T, U>(
  arr: T[],
  fn: (value: T) => Record<string, U>
): Record<string, U> => {
  return arr.reduce((acc, curr) => ({ ...acc, ...fn(curr) }), {});
};

/**
 * Returns a new object that contains only the properties from the input object
 * whose keys are included in the specified array.
 *
 * @param obj
 * @param {string[]} keys - The keys to include in the new object.
 * @return {Record<string, T>} - A new object with only the specified properties.
 */
export const filterByKeys = <T>(
  obj: Record<string, T>,
  keys: string[]
): Record<string, T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
};

/**
 * Deletes the specified keys from the given object and returns a new object.
 *
 * @param {Record<string, T>} arr - The object from which keys should be deleted.
 * @param {string[]} keys - The keys to be deleted from the object.
 * @return {Record<string, T>} - A new object without the specified keys.
 */
export const omitByKeys = <T>(
  obj: Record<string, T>,
  keys: string[]
): Record<string, T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
};

/**
 * Removes all occurrences of a specific value from an array.
 *
 * @param {T[]} arr - The array to remove values from.
 * @param {T} value - The value to remove from the array.
 * @return {T[]} The updated array with all occurrences of the value removed.
 */
export const removeValue = <T>(arr: T[], value: T): T[] => {
  return arr.filter((item) => item !== value);
};

/**
 * Generates a random element from the given array.
 *
 * @param {T[]} arr - The array to generate a random element from.
 * @return {T} - The randomly selected element from the array.
 */
export const random = <T>(arr: T[]): T => {
  if (!arr.length) {
    throw new Error("Array must not be empty.");
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Shuffles an array in place.
 *
 * @param {T[]} arr - The array to be shuffled.
 * @return {T[]} - The shuffled array.
 */
export const shuffleArray = <T>(arr: T[]): T[] => {
  return arr.sort(() => 0.5 - Math.random());
};

/**
 * Sorts an array in ascending order.
 *
 * @param {T[]} arr - The array to be sorted.
 * @return {T[]} The sorted array.
 */
export const sortArray = <T>(arr: T[]): T[] => {
  return [...arr].sort();
};

/**
 * Sorts the array in descending order.
 *
 * @param {T[]} arr - The array to be sorted.
 * @return {T[]} The sorted array in descending order.
 */
export const sortArrayDesc = <T>(arr: T[]): T[] => {
  return [...arr].sort((a, b) => (a < b ? 1 : -1));
};

/**
 * Recursively sorts an array or object in ascending order.
 *
 * @param {any} arr - The array or object to be sorted.
 * @return {any} The sorted array or object.
 */
export const sortRecursiveAsc = (arr: any): any => {
  if (Array.isArray(arr)) {
    return [...arr].sort().map(sortRecursiveAsc);
  } else if (typeof arr === "object" && arr !== null) {
    return Object.fromEntries(
      Object.entries(arr)
        .sort()
        .map(([key, value]) => [key, sortRecursiveAsc(value)])
    );
  } else {
    return arr;
  }
};

/**
 * Sorts an array or object recursively in descending order.
 *
 * @param {any} arr - the array or object to be sorted
 * @return {any} the sorted array or object
 */
export const sortRecursiveDesc = (arr: any): any => {
  if (Array.isArray(arr)) {
    return [...arr].sort((a, b) => (a < b ? 1 : -1)).map(sortRecursiveDesc);
  } else if (typeof arr === "object" && arr !== null) {
    return Object.fromEntries(
      Object.entries(arr)
        .sort((a, b) => (a < b ? 1 : -1))
        .map(([key, value]) => [key, sortRecursiveDesc(value)])
    );
  } else {
    return arr;
  }
};

/**
 * Filters an array based on a provided function.
 *
 * @param {T[]} arr - The array to filter.
 * @param {Function} fn - The function to use for filtering.
 * @return {T[]} The filtered array.
 */
export const filterArray = <T>(arr: T[], fn: (value: T) => boolean): T[] => {
  return arr.filter(fn);
};

/**
 * Filters the given array and returns a new array with all values that are not null or undefined.
 *
 * @param {T[]} arr - The array to be filtered.
 * @return {T[]} - The new array with non-null and non-undefined values.
 */
export const filterNotNull = <T>(arr: T[]) => {
  return arr.filter(Boolean);
};

/**
 * Sorts an array based on a specified order.
 *
 * @param {Array} arr - The array to be sorted.
 * @param {Array} order - The order to sort the array by.
 * @return {Array} - The sorted array.
 */
export function sortArrayByOrder<T extends string | number>(
  arr: T[],
  order: T[]
): T[] {
  const orderMap = new Map<T, number>(
    order.map((item, index) => [item, index])
  );

  return arr.sort((a, b) => {
    const aIndex = orderMap.has(a) ? orderMap.get(a) : Infinity;
    const bIndex = orderMap.has(b) ? orderMap.get(b) : Infinity;

    if (aIndex !== bIndex) {
      return (aIndex ?? Infinity) - (bIndex ?? Infinity);
    }

    if (aIndex === Infinity && bIndex === Infinity) {
      if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
      }
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
    }

    return 0;
  });
}
