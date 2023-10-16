import { FilterOptions } from "@utils";
import { mapRecursive } from "../helpers";
import { assignProp } from "../setters";

/**
 * Filters properties from the given object based on the received properties and options.
 *
 * @param {Record<any, any>} allKeys - The object containing all properties.
 * @param {any[]} receiveKeys - An array of properties to be filtered.
 * @param {FilterOptions} [options] - (Optional) Options for filtering.
 * @returns {any} - The filtered properties.
 */
export const sanitizeObjectKeysRecursive = <T extends Record<any, any>>(
  allKeys: T,
  receiveKeys: any,
  options?: FilterOptions,
): any => {
  const result: Partial<T> = {};

  receiveKeys.forEach((prop: any) => {
    if (options?.parentKey && prop[options?.parentKey as string]) {
      mapRecursive(prop[options?.parentKey as string], (p: any) => {
        assignProp(result, p, allKeys);
        if (prop[options?.parentKey as string]) {
          assignProp(result, p, prop[options?.parentKey as string]);
        }
      });
    } else {
      assignProp(result, prop, allKeys);
    }
  });

  return result;
};
