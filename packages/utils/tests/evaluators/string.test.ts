import { evaluateReplacement } from '../../src/evaluators';
import { addAfter, addBefore } from '../../src/setters';
import {ValueReplacement} from "@types";

describe('evaluateReplacement function', () => {
  const values = {
    oldValue: 'old',
    newValue: 'new'
  };

  test('should return newValue if condition is All', () => {
    expect(evaluateReplacement(values, ValueReplacement.All)).toBe('new');
  });

  test('should add newValue after oldValue if condition is After', () => {
    expect(evaluateReplacement(values, ValueReplacement.After)).toBe(addAfter(values.oldValue, values.newValue));
  });

  test('should add newValue before oldValue if condition is Before', () => {
    expect(evaluateReplacement(values, ValueReplacement.Before)).toBe(addBefore(values.oldValue, values.newValue));
  });

  test('should add newValue after oldValue if condition is undefined', () => {
    expect(evaluateReplacement(values)).toBe(addAfter(values.oldValue, values.newValue));
  });

  test('should handle noSpaceBetween flag correctly', () => {
    expect(evaluateReplacement(values, ValueReplacement.After, true)).toBe(addAfter(values.oldValue, values.newValue, undefined, true));
    expect(evaluateReplacement(values, ValueReplacement.Before, true)).toBe(addBefore(values.oldValue, values.newValue, undefined, true));
    expect(evaluateReplacement(values, undefined, true)).toBe(addAfter(values.oldValue, values.newValue, undefined, true));
  });
});
