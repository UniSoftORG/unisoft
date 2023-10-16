/**
 * Assigns a property from a source object to a target object if the property is not undefined.
 *
 * @param {Record<KeyType, T | undefined>} target - The target object.
 * @param {KeyType} propName - The name of the property to assign.
 * @param {Record<KeyType, T>} source - The source object.
 */
export const assignProp = <T, KeyType extends string>(
  target: Record<KeyType, T | undefined>,
  propName: KeyType,
  source: Record<KeyType, T>,
) => {
  if (source[propName] !== undefined) {
    target[propName] = source[propName];
  }
};
