/**
 * Checks if a given key exists in the provided object.
 *
 * @param obj
 * @param {string} key - The key to check for in the object.
 * @return {boolean} Returns true if the key exists in the object, otherwise returns false.
 */
export const doesKeyExist = (
  obj: Record<string, unknown>,
  key: string,
): boolean => key in obj;

/**
 * Checks if the given input is an associative array.
 *
 * @param {object | null} arr - The input to be checked.
 * @return {boolean} - True if the input is an associative array, false otherwise.
 */
export const isAssoc = (arr: object | null): boolean => {
  return Array.isArray(arr)
    ? false
    : arr !== null && arr.constructor === Object;
};

/**
 * Checks if the given parameter is an array and all its elements have integer indices.
 *
 * @param {T[]} arr - The array to be checked.
 * @return {boolean} Returns true if the given parameter is an array and all its elements have integer indices, otherwise returns false.
 */
export const isArray = (arr: unknown[]): boolean => Array.isArray(arr);
