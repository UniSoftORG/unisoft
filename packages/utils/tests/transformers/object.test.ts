import {
    objectToArray,
    excludeKeys, deepMerge
} from "../../src/transformers";

describe('Object Transformer Module', () => {
    describe('merge', () => {
        it('merges two objects into a single object', () => {
            const obj1 = {key1: 'value1'};
            const obj2 = {key2: 'value2'};

            const merged = deepMerge(obj1, obj2);

            expect(merged).toEqual({key1: 'value1', key2: 'value2'});
        });

        it('returns the second object when the first object is empty', () => {
            const obj1 = {};
            const obj2 = {key: 'value'};

            const merged = deepMerge(obj1, obj2);

            expect(merged).toEqual(obj2);
        });

        it('returns the first object when the second object is empty', () => {
            const obj1 = {key: 'value'};
            const obj2 = {};

            const merged = deepMerge(obj1, obj2);

            expect(merged).toEqual(obj1);
        });

        it('merges nested objects into a single object', () => {
            const obj1 = {key1: 'value1', nested: {key2: 'value2'}};
            const obj2 = {key3: 'value3', nested: {key4: 'value4'}};

            const merged = deepMerge(obj1, obj2);

            expect(merged).toEqual({key1: 'value1', key3: 'value3', nested: {key2: 'value2', key4: 'value4'}});
        });
    });

    describe('objectToArray', () => {
        it('converts an object into an array of values', () => {
            const obj = {key1: 'value1', key2: 'value2', key3: 'value3'};
            const keys = ['key1', 'key3'];

            const result = objectToArray(obj, keys);

            expect(result).toEqual(['value1', 'value3']);
        });

        it('returns an empty array when keys are not found in the input object', () => {
            const obj = {key1: 'value1', key2: 'value2'};
            const keys: string[] = ['key3', 'key4'];

            const result = objectToArray(obj, keys);

            expect(result).toEqual([]);
        });
    });

    describe('excludeKeys', () => {
        it('excludes specified keys from an object', () => {
            const obj = {key1: 'value1', key2: 'value2', key3: 'value3'};
            const keysToExclude: ('key1' | 'key3')[] = ['key1', 'key3'];

            const result = excludeKeys(obj, keysToExclude);

            expect(result).toEqual({key2: 'value2'});
        });

        it('handles an empty keysToExclude array', () => {
            const obj = {key1: 'value1', key2: 'value2', key3: 'value3'};
            const keysToExclude: ('key1' | 'key3')[] = [];

            const result = excludeKeys(obj, keysToExclude);

            expect(result).toEqual(obj);
        });
    });
});
