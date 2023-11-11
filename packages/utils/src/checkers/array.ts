/**
 * Checks if the given input is an accessible array or object.
 *
 * @param {unknown} arr - The input to be checked.
 * @return {boolean} Returns true if the input is an accessible array or object, otherwise false.
 */
export const isAccessible = (arr: unknown): boolean =>
  (Array.isArray(arr) || typeof arr === 'object') && arr !== null;

/**
 * Checks if a given key exists in an array.
 *
 * @param {Record<string, unknown> | null | undefined} arr - The array to check.
 * @param {string} key - The key to search for.
 * @return {boolean} True if the key exists in the array, false otherwise.
 */
export const hasKey = (
  arr: Record<string, unknown> | null | undefined,
  key: string
): boolean =>
  <boolean>!!(arr && Object.prototype.hasOwnProperty.call(arr, key));

/**
 * Check if any of the specified keys exist in the given array.
 *
 * @param {Record<string, unknown> | null | undefined} arr - The array to check.
 * @param {string[]} keys - The keys to search for.
 * @return {boolean} True if any of the keys exist in the array, false otherwise.
 */
export const hasAnyKey = (
  arr: Record<string, unknown> | null | undefined,
  keys: string[]
): boolean =>
  keys.some((key) => arr && Object.prototype.hasOwnProperty.call(arr, key));
