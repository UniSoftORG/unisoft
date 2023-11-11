import { Conditional, ValueReplacement } from '../../@utils';
import { createCondition, mapObjectValues } from '../helpers';
import { evaluateReplacement } from './string';
import { getValue } from '../getters';
import { setNestedValue } from '../setters';

/**
 * Transforms a condition from string to into actionable logic.
 * Definition example 'variable1 === variable2' - returns boolean or define
 * @param {string} conditionStr - The condition string to evaluate.
 * @param {T} mainObj - The main object to use for evaluation.
 * @returns {boolean} - The result of the evaluation.
 */
export const evaluateCondition = <T>(
  conditionStr: string,
  mainObj: T
): boolean => {
  const [leftPath, operator, rightPath] = conditionStr.split(' ');

  const leftValue = getValue(mainObj, leftPath);
  const rightValue = getValue(mainObj, rightPath);

  return createCondition(leftValue, operator, rightValue);
};

/**
 * Evaluates conditions and returns a value based on the given options.
 * Object definition example {condition: 'variable1 === variable2', value: 'class1'}
 * @param {Array<Object>} conditions - An array of objects representing conditions.
 * @param {Object} objOptions - An object containing options for evaluation.
 * @param {Object} objOptions.mainObj - The main object to evaluate conditions against.
 * @param {string} [objOptions.valueKey] - The key to retrieve the value from the main object.
 * @param {boolean} [objOptions.returnValueKeyOnly] - Whether to return only the value key in the result.
 * @param {boolean} [objOptions.forceMostFrequentKey] - Whether to force the most frequent key in the result.
 * @param {ValueReplacement} [replaceValue] - The type of replacement for the value.
 * @return {Object|undefined} - The evaluated value or undefined.
 */
export const evaluateConditions = <
  ObjectType extends object = object,
  ReturnType = object,
>(
  conditions: { [key: string]: Conditional[] }[] | Conditional[],
  objOptions: {
    mainObj: ObjectType;
    valueKey?: string;
    returnValueKeyOnly?: boolean;
    forceMostFrequentKey?: boolean;
  },
  replaceValue: ValueReplacement = ValueReplacement.Before
) => {
  const { mainObj, valueKey, returnValueKeyOnly } = objOptions;
  let conditional = '';

  if (conditions) {
    Array.isArray(conditions) &&
      conditions.forEach((attribute: any) => {
        if (valueKey && typeof attribute === 'object' && mainObj) {
          mapObjectValues(attribute, (conditions: any) => {
            conditions.forEach((condition: any) => {
              if (evaluateCondition(condition.condition, mainObj ?? {}))
                conditional += ` ${condition.value}`;
            });
          });
        } else {
          if (evaluateCondition(attribute.condition, mainObj ?? {})) {
            conditional += ` ${attribute.value}`;
          }
        }
      });
  }

  const finalValue = evaluateReplacement(
    {
      oldValue: getValue(mainObj, valueKey ?? '') || '',
      newValue: conditional.trim(),
    },
    replaceValue
  ).trim();

  if (returnValueKeyOnly && valueKey) {
    return { [valueKey.split('.').pop() as string]: finalValue };
  } else if (valueKey) {
    return setNestedValue<ObjectType>(mainObj, valueKey.split('.'), finalValue);
  } else {
    return finalValue as ReturnType;
  }
};
