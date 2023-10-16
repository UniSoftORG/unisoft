/**
 * A function that retrieves a value from an object based on a given path.
 *
 * @param {T} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired value, using dot notation.
 * @return {any} The value found at the specified path.
 */
export const getValue = <T>(obj: T, path: string): any => {
  return path.split(".").reduce((acc, part) => {
    return acc && typeof acc === 'object' ? (acc as any)[part] : undefined;
  }, obj);
};