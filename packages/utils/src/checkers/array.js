"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAnyKey = exports.hasKey = exports.isAccessible = void 0;
/**
 * Checks if the given input is an accessible array or object.
 *
 * @param {unknown} arr - The input to be checked.
 * @return {boolean} Returns true if the input is an accessible array or object, otherwise false.
 */
var isAccessible = function (arr) {
    return (Array.isArray(arr) || typeof arr === "object") && arr !== null;
};
exports.isAccessible = isAccessible;
/**
 * Checks if a given key exists in an array.
 *
 * @param {Record<string, unknown> | null | undefined} arr - The array to check.
 * @param {string} key - The key to search for.
 * @return {boolean} True if the key exists in the array, false otherwise.
 */
var hasKey = function (arr, key) {
    return !!(arr && Object.prototype.hasOwnProperty.call(arr, key));
};
exports.hasKey = hasKey;
/**
 * Check if any of the specified keys exist in the given array.
 *
 * @param {Record<string, unknown> | null | undefined} arr - The array to check.
 * @param {string[]} keys - The keys to search for.
 * @return {boolean} True if any of the keys exist in the array, false otherwise.
 */
var hasAnyKey = function (arr, keys) {
    return keys.some(function (key) { return arr && Object.prototype.hasOwnProperty.call(arr, key); });
};
exports.hasAnyKey = hasAnyKey;
