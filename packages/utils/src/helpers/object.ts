/**
 * Maps the values of an object using a mapper function and returns a new object with the mapped values.
 *
 * @param {Record<string, T>} obj - The object whose values will be mapped.
 * @param {(value: T) => U} mapperFn - The function used to map the values.
 * @return {Record<string, U>} - A new object with the mapped values.
 */
export function mapObjectValues<T, U>(
  obj: Record<string, T>,
  mapperFn: (value: T) => U,
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, mapperFn(value)]),
  );
}

/**
 * Maps the values of an array using a mapper function.
 *
 * @param {T[]} values - The array whose values will be mapped.
 * @param {(value: T) => U} mapperFn - The function used to map the values.
 * @return {U[]} - An array containing the mapped values.
 */
export function mapArrayValues<T, U>(
  values: T[],
  mapperFn: (value: T) => U,
): U[] {
  return values.map(mapperFn);
}
