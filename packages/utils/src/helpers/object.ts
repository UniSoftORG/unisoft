/**
 * Maps the values of an object using a mapper function and returns a new object with the mapped values.
 *
 * @param {Record<string, T>} obj - The object whose values will be mapped.
 * @param {(value: T) => U} mapperFn - The function used to map.py the values.
 * @return {Record<string, U>} - A new object with the mapped values.
 */
export function mapObjectValues<T, U>(
  obj: Record<string, T>,
  mapperFn: (value: T) => U
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, mapperFn(value)])
  );
}

/**
 * Transforms the entries (key-value pairs) of an input object using a specified transformer function.
 *
 * @template T The type of the resulting transformed entry.
 *
 * @param {Object.<string, any>} input - The input object with entries to be transformed.
 * @param {(key: string, value: any) => T} transformer - A function that defines how each entry should be transformed.
 *
 * @returns {T[]} An array of transformed entries.
 *
 * @example
 *
 * const result = transformEntries(
 *     { testState: '${attributes.data}', testStates: 'defaultTestValues' },
 *     (key, defaultValue) => createState({ key, defaultValue })
 * );
 *
 */
export const transformEntries = <T>(
  input: { [key: string]: any },
  transformer: (key: string, value: any) => T
): T[] => {
  return Object.entries(input).map(([key, value]) => transformer(key, value));
};

/**
 * Maps the values of an array using a mapper function.
 *
 * @param {T[]} values - The array whose values will be mapped.
 * @param {(value: T) => U} mapperFn - The function used to map.py the values.
 * @return {U[]} - An array containing the mapped values.
 */
export function mapArrayValues<T, U>(
  values: T[],
  mapperFn: (value: T) => U
): U[] {
  return values.map(mapperFn);
}
