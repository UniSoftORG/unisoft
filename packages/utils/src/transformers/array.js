"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureArray = exports.undot = exports.convertObjectToCssString = exports.convertArrayToClassString = exports.createQueryString = exports.separateKeysAndValues = exports.collapse = exports.arrayToObject = void 0;
var setters_1 = require("../setters");
/**
 * Converts an array to an object using a key extractor function.
 *
 * @param {T[]} arr - The array to convert.
 * @param {(item: T) => string} keyExtractor - The function used to extract the key from each item in the array.
 * @return {Record<string, T>} - The resulting object with keys extracted from the array elements and values set to the corresponding array elements.
 */
var arrayToObject = function (arr, keyExtractor) {
    return arr.reduce(function (acc, item) {
        acc[keyExtractor(item)] = item;
        return acc;
    }, {});
};
exports.arrayToObject = arrayToObject;
/**
 * Collapses a 2D array into a 1D array.
 *
 * @param {T[][]} arr - The 2D array to be collapsed.
 * @return {T[]} - The collapsed 1D array.
 */
var collapse = function (arr) {
    return arr.flat();
};
exports.collapse = collapse;
/**
 * This function takes an object and returns an array of its keys and an array of its values.
 *
 * @return {[string[], T[]]} - An array consisting of two arrays: the keys of the object and the values of the object.
 * @param obj
 */
var separateKeysAndValues = function (obj) {
    var keys = Object.keys(obj);
    var values = keys.map(function (key) { return obj[key]; });
    return [keys, values];
};
exports.separateKeysAndValues = separateKeysAndValues;
/**
 * Generates a query string from an object.
 *
 * @throws {Error} Input must be an object.
 * @return {string} The uni-imports query string.
 * @param params
 */
var createQueryString = function (params) {
    return Object.keys(params)
        .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); })
        .join("&");
};
exports.createQueryString = createQueryString;
/**
 * Joins an array of strings with spaces to create a CSS class string.
 *
 * @param {string[]} arr - The array of strings to be joined.
 * @return {string} - The CSS class string.
 */
var convertArrayToClassString = function (arr) {
    return arr.filter(Boolean).join(" ");
};
exports.convertArrayToClassString = convertArrayToClassString;
/**
 * Converts an object to a string of CSS styles.
 *
 * @return {string} The CSS styles as a string.
 * @param styles
 */
var convertObjectToCssString = function (styles) {
    return Object.entries(styles)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return Boolean(key) && Boolean(value);
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, ":").concat(value, ";");
    })
        .join(" ");
};
exports.convertObjectToCssString = convertObjectToCssString;
/**
 * Copies the input object and removes all dots from the keys.
 *
 * @param {object} arr - The input object.
 * @return {object} - The object with dots removed from the keys.
 */
var undot = function (arr) {
    var result = {};
    for (var _i = 0, _a = Object.entries(arr); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        (0, setters_1.setValueAtPathInObject)(result, key, value);
    }
    return result;
};
exports.undot = undot;
/**
 * Wraps a value or array of values into an array.
 *
 * @param {T | T[]} value - The value or array of values to be wrapped.
 * @return {T[]} The wrapped array.
 */
var ensureArray = function (value) {
    return Array.isArray(value) ? value : [value];
};
exports.ensureArray = ensureArray;
