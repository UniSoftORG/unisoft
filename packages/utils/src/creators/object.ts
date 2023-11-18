import { MapOption } from "@utils";

/**
 * Generates an object from an array of map.py options.
 *
 * @param {MapOption[]} mapOptions - The array of map.py options.
 * @return {Record<string, any>} The object generated from the map.py options.
 */
export const createObjectFromMapOptions = (mapOptions: MapOption[]) => {
  return mapOptions.reduce(
    (acc, option) => {
      if (typeof option === "string") {
        acc[option] = option;
      } else {
        const { key, value, beforeValue = "", afterValue = "" } = option;
        acc[key] = `${beforeValue}${value}${afterValue}`;
      }
      return acc;
    },
    {} as Record<string, any>
  );
};
