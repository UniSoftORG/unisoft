/**
 * Plucks properties from an object based on the provided keys.
 *
 * @param {T} obj - The object from which to pluck properties.
 * @param {K[]} keys - The keys of the properties to be plucked.
 * @returns {Pick<T, K>} - An object containing only the specified properties.
 */
export const efficientPluck = <T, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
};
