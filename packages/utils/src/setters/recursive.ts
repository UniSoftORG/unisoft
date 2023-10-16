/**
 * Sets a nested key-value pair in an object.
 *
 * @param {T} obj - The object in which to set the key-value pair.
 * @param {(string | number)[]} keyPath - An array representing the path to the nested key.
 * @param {any} value - The value to set for the nested key.
 * @return {T} - The modified object with the nested key-value pair set.
 */
export const setNestedValue = <T>(
  obj: T,
  keyPath: (string | number)[],
  value: any,
): T => {
  let currentObj: any = obj;
  for (let i = 0; i < keyPath.length - 1; i++) {
    const key = keyPath[i];
    if (!(key in currentObj)) {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }
  currentObj[keyPath[keyPath.length - 1]] = value;
  return obj;
};

/**
 * Sets a nested key-value pair in an object based on a dot-separated string path.
 *
 * @param {T} obj - The object in which to set the key-value pair.
 * @param {string} path - A dot-separated string representing the path to the nested key.
 * @param {K} value - The value to set for the nested key.
 */
export const setByDotNotation = <T, K extends keyof any = keyof any>(obj: T, path: string, value: K): void => {
  const parts = path.split(".");
  parts.reduce((acc: any, part, index) => {
    if (index === parts.length - 1) {
      acc[part] = value;
    }
    return acc[part];
  }, obj);
};