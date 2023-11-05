"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isAssoc = exports.doesKeyExist = void 0;
/**
 * Checks if a given key exists in the provided object.
 *
 * @param obj
 * @param {string} key - The key to check for in the object.
 * @return {boolean} Returns true if the key exists in the object, otherwise returns false.
 */
var doesKeyExist = function (obj, key) { return key in obj; };
exports.doesKeyExist = doesKeyExist;
/**
 * Checks if the given input is an associative array.
 *
 * @param {object | null} arr - The input to be checked.
 * @return {boolean} - True if the input is an associative array, false otherwise.
 */
var isAssoc = function (arr) {
    return Array.isArray(arr)
        ? false
        : arr !== null && arr.constructor === Object;
};
exports.isAssoc = isAssoc;
/**
 * Checks if the given parameter is an array and all its elements have integer indices.
 *
 * @param {T[]} arr - The array to be checked.
 * @return {boolean} Returns true if the given parameter is an array and all its elements have integer indices, otherwise returns false.
 */
var isArray = function (arr) { return Array.isArray(arr); };
exports.isArray = isArray;
