import { ValueReplacement } from '../../@utils';
import { addAfter, addBefore } from '../setters';

/**
 * Evaluates the replacement value based on the given condition.
 *
 * @param {object} values - An object containing the old and new values.
 * @param {ValueReplacement} condition - The condition to evaluate.
 * @param {boolean} noSpaceBetween - Whether to include a space between the old and new values.
 * @return {string} The evaluated replacement value.
 */
export const evaluateReplacement = (
  values: {
    oldValue: string;
    newValue: string;
  },
  condition?: ValueReplacement,
  noSpaceBetween?: boolean
) => {
  switch (condition) {
    case ValueReplacement.All:
      return values.newValue;
    case ValueReplacement.Before:
      return addBefore(
        values.oldValue,
        values.newValue,
        undefined,
        noSpaceBetween
      );
    default:
      return addAfter(
        values.oldValue,
        values.newValue,
        undefined,
        noSpaceBetween
      );
  }
};
