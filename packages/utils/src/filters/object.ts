/**
 * Filters the given object by the specified keys.
 *
 * @param {Record<T, K>} object - The source object to filter.
 * @param {T[]} keys - The keys to filter the object by.
 * @return {Partial<Record<T, K>>} - The filtered object.
 */
export const filterObjectByKey = <T extends string, K>(
  object: Record<T, K>,
  keys: T[]
): Partial<Record<T, K>> => {
  return keys.reduce(
    (acc, key) => {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        acc[key] = object[key];
      }
      return acc;
    },
    {} as Partial<Record<T, K>>
  );
};
