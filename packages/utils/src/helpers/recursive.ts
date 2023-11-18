import { Nested } from "../../@utils";

/**
 * Recursively maps over an array of nested objects and applies a mapper function to each object.
 *
 * @param {T[]} data - The array of nested objects to map.py over.
 * @param {(value: T, key?: any) => T} mapperFn - The function to apply to each object.
 * @param {string} [nestedKey="children"] - The key used to access the nested objects in each object.
 * @throws {Error} Input must be an array.
 * @return {T[]} The mapped array of nested objects.
 */
export const mapRecursive = <T extends Nested<T>>(
  data: T[],
  mapperFn: (value: T, key?: any) => T,
  nestedKey: string = "children"
): T[] => {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array.");
  }

  return data.map((item, key) => {
    const nestedValue = item[nestedKey];
    if (Array.isArray(nestedValue)) {
      return {
        ...mapperFn(item, key),
        [nestedKey]: mapRecursive(nestedValue, mapperFn, nestedKey),
      };
    }
    return mapperFn(item, key);
  });
};

/**
 * Executes a callback function recursively on each item in an array of objects.
 *
 * @param {T[]} data - The array of objects to iterate over.
 * @param {(item: T, index: number, parent?: T) => Promise<any> | any} callback - The callback function to execute on each item.
 * @param {keyof T} [nestedKey="children"] - The key of the nested array in each item.
 * @param {T} [parent] - The parent object of the current item.
 * @return {void}
 */
export const forRecursive = <T extends Record<string, any>>(
  data: T[],
  callback: (item: T, index: number, parent?: T) => Promise<any> | any,
  nestedKey: keyof T = "children",
  parent?: T
): void => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    callback(item, i, parent);

    if (item[nestedKey] && item[nestedKey].length) {
      forRecursive(item[nestedKey] as T[], callback, nestedKey, item);
    }
  }
};

/**
 * Recursively maps each item in the given data array using the provided mapper function.
 * If an item has a nested array with the specified key, it will be recursively mapped as well.
 *
 * @param {T[]} data - The array of data to be mapped.
 * @param {(component: T) => T} mapperFn - The function used to map.py each item in the data array.
 * @param {string} [nestedKey="children"] - The key used to access the nested array in each item.
 * @return {T[]} The resulting array after mapping each item in the data array.
 */
export const forEachRecursive = <T extends Record<string, any>>(
  data: T[],
  mapperFn: (component: T) => T,
  nestedKey: string = "children"
): T[] => {
  const result: T[] = [];

  data.forEach((item: T) => {
    const nestedValue = item[nestedKey];

    if (Array.isArray(nestedValue)) {
      result.push({
        ...mapperFn(item),
        [nestedKey]: forEachRecursive(nestedValue, mapperFn, nestedKey),
      });
    } else {
      result.push(mapperFn(item));
    }
  });

  return result;
};

/**
 * Maps an array of objects recursively using a mapper function.
 *
 * @param {T[]} data - The array of objects to be mapped.
 * @param {(component: T) => T} mapperFn - The mapper function that maps each object.
 * @param {string} [nestedKey="children"] - The key used to access the nested array in each object.
 * @return {T[]} - The mapped array of objects.
 */
export const forLoopRecursive = <T extends Record<string, any>>(
  data: T[],
  mapperFn: (component: T) => T,
  nestedKey: string = "children"
): T[] => {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const nestedValue = item[nestedKey];

    if (Array.isArray(nestedValue)) {
      result.push({
        ...mapperFn(item),
        [nestedKey]: forLoopRecursive(nestedValue, mapperFn, nestedKey),
      });
    } else {
      result.push(mapperFn(item));
    }
  }

  return result;
};

type AnyObject = { [key: string]: any };

export const transformObject = (
  obj: AnyObject,
  shouldTransformByKey: string,
  copyKeys: string[],
  parent?: AnyObject
) => {
  if (!obj || typeof obj !== "object") return;

  if (
    obj.hasOwnProperty(shouldTransformByKey) &&
    typeof obj[shouldTransformByKey] === "string"
  ) {
    const pathParts = (obj[shouldTransformByKey] as unknown as string).split(
      "."
    );
    let valueToMap: any = parent;

    for (let part of pathParts) {
      if (valueToMap && valueToMap.hasOwnProperty(part)) {
        valueToMap = valueToMap[part];
      } else {
        valueToMap = undefined;
        break;
      }
    }

    if (Array.isArray(valueToMap)) {
      obj.children = valueToMap.map((subItem, index) => {
        let newItem: AnyObject = { ...subItem, index: index };
        for (const key of copyKeys) {
          if (subItem.hasOwnProperty(key)) {
            newItem[key] = subItem[key];
          }
        }
        return newItem;
      });
      // delete obj[shouldTransformByKey]; // Remove the shouldTransformByKey after processing
    }
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      transformObject(obj[key], shouldTransformByKey, copyKeys, obj);
    }
  }
};
