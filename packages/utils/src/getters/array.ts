/**
 * Finds the first element in the array that satisfies the provided testing function.
 *
 * @param {T[]} arr - The array to search.
 * @param {(value: T) => boolean} fn - The testing function.
 * @return {T | undefined} The first element in the array that satisfies the testing function, or undefined if no such element is found.
 */
export const first = <T>(
  arr: T[],
  fn: (value: T) => boolean,
): T | undefined => {
  return arr.find(fn);
};

/**
 * Retrieves the value at a given path from an object.
 *
 * @param {Record<K, T>} obj - The object to retrieve the value from.
 * @param {string} path - The path to the value in dot notation.
 * @param {T | undefined} defaultValue - The value to return if the path is not found.
 * @return {T | undefined} - The value at the given path, or the default value if not found.
 */
export const get = <T, K extends string | number | symbol>(
  obj: Record<K, T>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  const keys = path.split(".");
  return (
    keys.reduce((acc: any, key: string) => acc?.[key], obj) ?? defaultValue
  );
};

/**
 * Returns the last element in an array that matches the given condition.
 *
 * @param {T[]} arr - The array to search.
 * @param {(value: T) => boolean} fn - The condition function.
 * @returns {T | undefined} The last element that matches the condition, or undefined if no element is found.
 */
export const last = <T>(arr: T[], fn: (value: T) => boolean): T | undefined => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (fn(arr[i])) return arr[i];
  }
  return undefined;
};

/**
 * Returns an object where the keys are the values of the provided key in the array elements,
 * and the values are the corresponding array elements.
 *
 * @param {T[]} arr - The array of elements to be keyed.
 * @param {keyof T} key - The key to use for creating the object keys.
 * @throws {Error} If the array is empty or if the key is not present in the array elements.
 * @return {Record<string, T>} An object with the keys and values based on the provided key and array elements.
 */
export const keyBy = <T>(arr: T[], key: keyof T): Record<string, T> => {
  if (!arr.length || typeof arr[0][key] === "undefined") {
    throw new Error("Invalid key provided.");
  }
  return arr.reduce((acc: Record<string, T>, curr: T) => {
    acc[String(curr[key])] = curr;
    return acc;
  }, {});
};

/**
 * Returns an array of values from the specified key in each object of the input array.
 *
 * @param {T[]} arr - The input array of objects.
 * @param {K} key - The key to pluck values from.
 * @return {T[K][]} - An array of values from the specified key in each object of the input array.
 */
export const pluck = <T, K extends keyof T>(arr: T[], key: K): T[K][] => {
  return arr.map((item) => item[key]);
};
