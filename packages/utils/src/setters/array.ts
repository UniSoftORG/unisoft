/**
 * Adds a value to an array at the specified index.
 */
export const addValueToArrayAtIndex = <T>(
  arr: T[],
  value: T,
  index: number
): T[] => {
  if (index < 0 || index > arr.length) {
    throw new Error('Index out of bounds');
  }

  return [...arr.slice(0, index), value, ...arr.slice(index)];
};

/**
 * Removes an element at the specified index from an array and returns the resulting array.
 */
export const removeValueFromArrayAtIndex = <T>(
  arr: T[],
  index: number
): T[] => {
  if (index < 0 || index >= arr.length) {
    throw new Error('Index out of bounds');
  }

  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

/**
 * Prepends a value to an array.
 */
export const prependValueToArray = <T>(arr: T[], value: T): T[] => [
  value,
  ...arr,
];

/**
 * Prepends keys of an object with a given prefix.
 */
export const prependObjectKeysWith = <T>(
  object: Record<string, T>,
  prefix: string
): Record<string, T> =>
  Object.entries(object).reduce(
    (result, [key, value]) => ({ ...result, [`${prefix}${key}`]: value }),
    {}
  );

/**
 * Sets a value at a specified path in an object.
 */
export const setValueAtPathInObject = <T>(
  object: T,
  path: string,
  value: unknown
): T => {
  if (!object || typeof object !== 'object') {
    throw new Error('Input must be an object.');
  }

  const keys = path.split('.');
  keys.reduce(
    (obj: any, key: string, index: number) =>
      index === keys.length - 1
        ? (obj[key] = value)
        : obj[key] || (obj[key] = {}),
    object
  );

  return object;
};

/**
 * Joins the elements of an array into a string using a specified separator.
 */
export const joinArrayElements = <T>(arr: T[], separator: string): string =>
  arr.join(separator);
