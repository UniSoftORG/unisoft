/**
 * Flattens a nested array into a single-level array.
 *
 * @param {any[]} arr - The array to be flattened.
 * @return {T[]} The flattened array.
 */
export const flatten = <T>(arr: any[]): T[] => {
  return arr.reduce((flat: T[], toFlatten): T[] => {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten,
    );
  }, []);
};

/**
 * Creates a deep clone of an object.
 *
 * @param {T} obj - The object to be cloned.
 * @return {T} - The cloned object.
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  return Array.isArray(obj)
    ? (obj.map((item) => deepClone(item)) as T)
    : (Object.entries(obj).reduce<{ [key: string]: any }>(
        (clone, [key, value]) => ({ ...clone, [key]: deepClone(value) }),
        {},
      ) as T);
};

/**
 * Creates a simple deep clone of an object.
 *
 * @param {T} obj - The object to be cloned.
 * @return {T} - The cloned object.
 */
export const simpleDeepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
