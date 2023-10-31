import { forRecursive } from "unisoft-utils";

/**
 * Finds an object in an array of objects by searching for a specific value in a specified key.
 *
 * @param {T[]} data - The array of objects to search through.
 * @param {any} value - The value to search for.
 * @param {keyof T} key - The key of the object to compare against the value.
 * @param {T} [parent] - The parent object of the found object.
 * @param {keyof T} [nestedKey="children"] - The key of the nested objects within the objects.
 * @returns {Promise<{ object: T, parent?: T, index?: number } | undefined>} - The found object, its parent object (if provided), and its index (if applicable).
 */
export const findObjectByValue = async <T extends Record<string, any>>(
  data: T[],
  value: any,
  key: keyof T,
  parent?: T,
  nestedKey: keyof T = "children",
): Promise<
  | {
      object: T;
      parent?: T;
      index?: number;
    }
  | undefined
> => {
  let foundObject:
    | {
        object: T;
        parent?: T;
        index?: number;
      }
    | undefined;

  await forRecursive(
    data,
    async (item: T, index: number, parent?: T) => {
      if (item[key] === value) {
        foundObject = { object: item, parent, index };
      }
    },
    nestedKey,
  );

  return foundObject;
};
