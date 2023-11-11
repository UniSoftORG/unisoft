import { MapOption } from '@utils';

/**
 * Generates an object from an array of map options.
 *
 * @param {MapOption[]} mapOptions - The array of map options.
 * @return {Record<string, any>} The object generated from the map options.
 */
export const createObjectFromMapOptions = (mapOptions: MapOption[]) => {
  return mapOptions.reduce(
    (acc, option) => {
      if (typeof option === 'string') {
        acc[option] = option;
      } else {
        const { key, value, beforeValue = '', afterValue = '' } = option;
        acc[key] = `${beforeValue}${value}${afterValue}`;
      }
      return acc;
    },
    {} as Record<string, any>
  );
};
