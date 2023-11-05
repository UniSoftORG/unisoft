"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapArrayValues = exports.transformEntries = exports.mapObjectValues = void 0;
/**
 * Maps the values of an object using a mapper function and returns a new object with the mapped values.
 *
 * @param {Record<string, T>} obj - The object whose values will be mapped.
 * @param {(value: T) => U} mapperFn - The function used to map the values.
 * @return {Record<string, U>} - A new object with the mapped values.
 */
function mapObjectValues(obj, mapperFn) {
    return Object.fromEntries(Object.entries(obj).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [key, mapperFn(value)];
    }));
}
exports.mapObjectValues = mapObjectValues;
/**
 * Transforms the entries (key-value pairs) of an input object using a specified transformer function.
 *
 * @template T The type of the resulting transformed entry.
 *
 * @param {Object.<string, any>} input - The input object with entries to be transformed.
 * @param {(key: string, value: any) => T} transformer - A function that defines how each entry should be transformed.
 *
 * @returns {T[]} An array of transformed entries.
 *
 * @example
 *
 * const result = transformEntries(
 *     { testState: '${attributes.data}', testStates: 'defaultTestValues' },
 *     (key, defaultValue) => createState({ key, defaultValue })
 * );
 *
 */
var transformEntries = function (input, transformer) {
    return Object.entries(input).map(function (_a) {
        var key = _a[0], value = _a[1];
        return transformer(key, value);
    });
};
exports.transformEntries = transformEntries;
/**
 * Maps the values of an array using a mapper function.
 *
 * @param {T[]} values - The array whose values will be mapped.
 * @param {(value: T) => U} mapperFn - The function used to map the values.
 * @return {U[]} - An array containing the mapped values.
 */
function mapArrayValues(values, mapperFn) {
    return values.map(mapperFn);
}
exports.mapArrayValues = mapArrayValues;
