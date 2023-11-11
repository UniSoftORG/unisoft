import { setValueAtPathInObject } from '../setters';

/**
 * Converts an array to an object using a key extractor function.
 *
 * @param {T[]} arr - The array to convert.
 * @param {(item: T) => string} keyExtractor - The function used to extract the key from each item in the array.
 * @return {Record<string, T>} - The resulting object with keys extracted from the array elements and values set to the corresponding array elements.
 */
export const arrayToObject = <T>(
  arr: T[],
  keyExtractor: (item: T) => string
): Record<string, T> => {
  return arr.reduce(
    (acc: Record<string, T>, item: T) => {
      acc[keyExtractor(item)] = item;
      return acc;
    },
    {} as Record<string, T>
  );
};

/**
 * Collapses a 2D array into a 1D array.
 *
 * @param {T[][]} arr - The 2D array to be collapsed.
 * @return {T[]} - The collapsed 1D array.
 */
export const collapse = <T>(arr: T[][]): T[] => {
  return arr.flat();
};

/**
 * This function takes an object and returns an array of its keys and an array of its values.
 *
 * @return {[string[], T[]]} - An array consisting of two arrays: the keys of the object and the values of the object.
 * @param obj
 */
export const separateKeysAndValues = <T>(
  obj: Record<string, T>
): [string[], T[]] => {
  const keys = Object.keys(obj);
  const values = keys.map((key) => obj[key]);
  return [keys, values];
};

/**
 * Generates a query string from an object.
 *
 * @throws {Error} Input must be an object.
 * @return {string} The generated query string.
 * @param params
 */
export const createQueryString = (
  params: Record<string, string | number | boolean>
): string => {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
};

/**
 * Joins an array of strings with spaces to create a CSS class string.
 *
 * @param {string[]} arr - The array of strings to be joined.
 * @return {string} - The CSS class string.
 */
export const convertArrayToClassString = (arr: string[]): string => {
  return arr.filter(Boolean).join(' ');
};
/**
 * Converts an object to a string of CSS styles.
 *
 * @return {string} The CSS styles as a string.
 * @param styles
 */
export const convertObjectToCssString = (styles: {
  [key: string]: string | number;
}): string => {
  return Object.entries(styles)
    .filter(([key, value]) => Boolean(key) && Boolean(value))
    .map(([key, value]) => `${key}:${value};`)
    .join(' ');
};

/**
 * Copies the input object and removes all dots from the keys.
 *
 * @param {object} arr - The input object.
 * @return {object} - The object with dots removed from the keys.
 */
export const undot = (arr: { [key: string]: any }): any => {
  const result = {};
  for (const [key, value] of Object.entries(arr)) {
    setValueAtPathInObject(result, key, value);
  }
  return result;
};

/**
 * Wraps a value or array of values into an array.
 *
 * @param {T | T[]} value - The value or array of values to be wrapped.
 * @return {T[]} The wrapped array.
 */
export const ensureArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};
