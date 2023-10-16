import { findMostFrequent } from '../../src/evaluators';

describe('findMostFrequent function', () => {

    test('should return the most frequent number in an array of numbers', () => {
      expect(findMostFrequent([1, 2, 2, 3])).toBe(2);
    });

    test('should return the most frequent string in an array of strings', () => {
      expect(findMostFrequent(['apple', 'banana', 'apple'])).toBe('apple');
    });

    test('should handle mixed types and return the most frequent', () => {
      expect(findMostFrequent(['apple', 1, 'apple', 1, 1])).toBe(1);
    });

    test('should return undefined for an empty array', () => {
      expect(findMostFrequent([])).toBe(undefined);
    });

    test('should handle a single-item array', () => {
      expect(findMostFrequent([1])).toBe(1);
      expect(findMostFrequent(['apple'])).toBe('apple');
    });

    test('should return the first item when there is a tie for most frequent', () => {
      expect(findMostFrequent([1, 1, 2, 2])).toBe(1);
      expect(findMostFrequent(['apple', 'banana', 'apple', 'banana'])).toBe('apple');
    });
  });
