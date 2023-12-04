import { getValue } from "../getters";
import { setByDotNotation } from "../setters";
import { resolveTemplateString } from "./string";

/**
 * Replaces specified targeted strings within an object using a provided list.
 *
 * @template T - The type of the object containing strings to replace.
 * @param {T} obj - The object containing targeted strings.
 * @param {string[]} targets - List of imports pointing to strings to be replaced within the object.
 * @returns {T} - The modified object with targeted strings replaced.
 */
export const replaceDynamicTargets = <T>(
  obj: T,
  targets: string[]
): T | undefined => {
  targets?.map((target) => {
    const targetStr = getValue(obj, target);
    const replaced = resolveTemplateString(targetStr as string, obj);
    setByDotNotation(obj, target, replaced);
  });
  // for (let path of targets) {
  //   const targetStr = getValue(obj, path);
  //   const replaced = resolveTemplateString(targetStr as string, obj);
  //   setByDotNotation(obj, path, replaced);
  // }

  return targets ? obj : undefined;
};

/**
 * Merge two objects
 *
 * @param oldProps
 * @param newProps
 */
export const mergeObjects = (oldProps: any, newProps: any) => {
  return {
    ...oldProps,
    ...newProps,
  };
};

/**
 * Deep merge two objects
 *
 * @param {T} target - Target object.
 * @param sources
 * @return {T & U} - Merged object.
 */
export const deepMerge = (
  target: Record<string, any>,
  ...sources: Record<string, any>[]
): Record<string, any> =>
  sources.reduce((target, source) => {
    if (source == null) return target;

    Object.keys(source).forEach((key) => {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (targetValue instanceof Date && sourceValue instanceof Date) {
        target[key] = new Date(
          Math.max(targetValue.getTime(), sourceValue.getTime())
        );
      } else if (
        typeof targetValue === "object" &&
        targetValue &&
        typeof sourceValue === "object" &&
        sourceValue
      ) {
        target[key] = deepMerge({ ...targetValue }, sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });

    return target;
  }, target);

/**
 * Converts an object into an array of values.
 *
 * @param {Record<string, T>} obj - The object to convert into an array.
 * @param {string[]} [keys] - An optional array of keys to select specific values from the object.
 * @return {T[]} An array of values from the object.
 */
export const objectToArray = <T>(
  obj: Record<string, T>,
  keys?: string[]
): T[] => {
  return keys
    ? keys.map((key) => obj[key]).filter((val) => val !== undefined)
    : Object.values(obj);
};

/**
 * Exclude specified properties from an object.
 *
 * @param {T} obj - The object from which to exclude properties.
 * @param {K[]} keysToExclude - An array of keys to exclude.
 * @return {Omit<T, K>} - The object with the specified properties excluded.
 */
export const excludeKeys = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keysToExclude: K[]
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj as Record<string, any>).filter(
      ([key]) => !keysToExclude.includes(key as K)
    )
  ) as Omit<T, K>;
};
