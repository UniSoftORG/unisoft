"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluck = exports.keyBy = exports.last = exports.get = exports.first = void 0;
/**
 * Finds the first element in the array that satisfies the provided testing function.
 *
 * @param {T[]} arr - The array to search.
 * @param {(value: T) => boolean} fn - The testing function.
 * @return {T | undefined} The first element in the array that satisfies the testing function, or undefined if no such element is found.
 */
var first = function (arr, fn) {
    return arr.find(fn);
};
exports.first = first;
/**
 * Retrieves the value at a given path from an object.
 *
 * @param {Record<K, T>} obj - The object to retrieve the value from.
 * @param {string} path - The path to the value in dot notation.
 * @param {T | undefined} defaultValue - The value to return if the path is not found.
 * @return {T | undefined} - The value at the given path, or the default value if not found.
 */
var get = function (obj, path, defaultValue) {
    var _a;
    var keys = path.split(".");
    return ((_a = keys.reduce(function (acc, key) { return acc === null || acc === void 0 ? void 0 : acc[key]; }, obj)) !== null && _a !== void 0 ? _a : defaultValue);
};
exports.get = get;
/**
 * Returns the last element in an array that matches the given condition.
 *
 * @param {T[]} arr - The array to search.
 * @param {(value: T) => boolean} fn - The condition function.
 * @returns {T | undefined} The last element that matches the condition, or undefined if no element is found.
 */
var last = function (arr, fn) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (fn(arr[i]))
            return arr[i];
    }
    return undefined;
};
exports.last = last;
/**
 * Returns an object where the keys are the values of the provided key in the array elements,
 * and the values are the corresponding array elements.
 *
 * @param {T[]} arr - The array of elements to be keyed.
 * @param {keyof T} key - The key to use for creating the object keys.
 * @throws {Error} If the array is empty or if the key is not present in the array elements.
 * @return {Record<string, T>} An object with the keys and values based on the provided key and array elements.
 */
var keyBy = function (arr, key) {
    if (!arr.length || typeof arr[0][key] === "undefined") {
        throw new Error("Invalid key provided.");
    }
    return arr.reduce(function (acc, curr) {
        acc[String(curr[key])] = curr;
        return acc;
    }, {});
};
exports.keyBy = keyBy;
/**
 * Returns an array of values from the specified key in each object of the input array.
 *
 * @param {T[]} arr - The input array of objects.
 * @param {K} key - The key to pluck values from.
 * @return {T[K][]} - An array of values from the specified key in each object of the input array.
 */
var pluck = function (arr, key) {
    return arr.map(function (item) { return item[key]; });
};
exports.pluck = pluck;
