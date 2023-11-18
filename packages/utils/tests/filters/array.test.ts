import {
    mapToKeys,
    filterByKeys,
    removeValue,
    random,
    shuffleArray,
    sortArrayDesc,
    sortRecursiveDesc,
    filterArray,
    filterNotNull, omitByKeys, sortArray, sortRecursiveAsc
} from '../../src/filters';

describe('Array and Object utilities', () => {
    describe('mapToKeys', () => {
        it('should map.py an array to an object', () => {
            expect(mapToKeys([1, 2], (n) => ({[n]: n * 2}))).toEqual({1: 2, 2: 4});
        });
    });

    describe('filterByKeys', () => {
        it('should filter keys in an object', () => {
            expect(filterByKeys({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({a: 1, c: 3});
        });
    });

    describe('omitByKeys', () => {
        it('should exclude keys in an object', () => {
            expect(omitByKeys({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({b: 2});
        });
    });

    describe('removeValue', () => {
        it('should remove values from an array', () => {
            expect(removeValue([1, 2, 2, 3, 4], 2)).toEqual([1, 3, 4]);
        });
    });

    describe('random', () => {
        it('should throw error for an empty array', () => {
            expect(() => random([])).toThrow('Array must not be empty.');
        });

        it('should return a random value', () => {
            expect([1, 2, 3]).toContain(random([1, 2, 3]));
        });
    });

    describe('shuffleArray', () => {
        it('should shuffle the array', () => {
            const arr = [1, 2, 3];
            let different = false;
            for (let i = 0; i < 100; i++) {
                if (JSON.stringify(shuffleArray([...arr])) !== JSON.stringify(arr)) {
                    different = true;
                    break;
                }
            }
            expect(different).toBe(true);
        });

    });

    describe('sortArray', () => {
        it('should sort array in ascending order', () => {
            expect(sortArray([3, 2, 1])).toEqual([1, 2, 3]);
        });
    });

    describe('sortArrayDesc', () => {
        it('should sort array in descending order', () => {
            expect(sortArrayDesc([1, 2, 3])).toEqual([3, 2, 1]);
        });
    });

    describe('sortRecursiveAsc', () => {
        it('should recursively sort arrays and objects', () => {
            const arr = [2, 1, {b: 2, a: 1}];
            expect(sortRecursiveAsc(arr)).toEqual([1, 2, {a: 1, b: 2}]);
        });
    });

    describe('sortRecursiveDesc', () => {
        it('should recursively sort arrays in descending order', () => {
            const arr = [1, 2];
            const result = sortRecursiveDesc(arr);
            expect(result).toEqual([2, 1]);
        });

        it('should recursively sort object keys in descending order', () => {
            const obj = {a: 1, b: 2};
            const result = sortRecursiveDesc(obj);
            expect(result).toEqual({b: 2, a: 1});
        });
    });

    describe('where', () => {
        it('should filter array based on a predicate function', () => {
            expect(filterArray([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4]);
        });
    });

    describe('whereNotNull', () => {
        it('should remove null and undefined values', () => {
            expect(filterNotNull([null, 1, undefined, 2])).toEqual([1, 2]);
        });
    });
});
