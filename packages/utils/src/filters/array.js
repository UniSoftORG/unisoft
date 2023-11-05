"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNotNull = exports.filterArray = exports.sortRecursiveDesc = exports.sortRecursiveAsc = exports.sortArrayDesc = exports.sortArray = exports.shuffleArray = exports.random = exports.removeValue = exports.omitByKeys = exports.filterByKeys = exports.mapToKeys = void 0;
/**
 * Maps an array of values to a single object by applying a function to each value.
 *
 * @param {T[]} arr - The array of values to be mapped.
 * @param {(value: T) => Record<string, U>} fn - The function to apply to each value.
 * @return {Record<string, U>} - The resulting object with keys mapped from the array values.
 */
var mapToKeys = function (arr, fn) {
    return arr.reduce(function (acc, curr) { return (__assign(__assign({}, acc), fn(curr))); }, {});
};
exports.mapToKeys = mapToKeys;
/**
 * Returns a new object that contains only the properties from the input object
 * whose keys are included in the specified array.
 *
 * @param obj
 * @param {string[]} keys - The keys to include in the new object.
 * @return {Record<string, T>} - A new object with only the specified properties.
 */
var filterByKeys = function (obj, keys) {
    return Object.fromEntries(Object.entries(obj).filter(function (_a) {
        var key = _a[0];
        return keys.includes(key);
    }));
};
exports.filterByKeys = filterByKeys;
/**
 * Deletes the specified keys from the given object and returns a new object.
 *
 * @param {Record<string, T>} arr - The object from which keys should be deleted.
 * @param {string[]} keys - The keys to be deleted from the object.
 * @return {Record<string, T>} - A new object without the specified keys.
 */
var omitByKeys = function (obj, keys) {
    return Object.fromEntries(Object.entries(obj).filter(function (_a) {
        var key = _a[0];
        return !keys.includes(key);
    }));
};
exports.omitByKeys = omitByKeys;
/**
 * Removes all occurrences of a specific value from an array.
 *
 * @param {T[]} arr - The array to remove values from.
 * @param {T} value - The value to remove from the array.
 * @return {T[]} The updated array with all occurrences of the value removed.
 */
var removeValue = function (arr, value) {
    return arr.filter(function (item) { return item !== value; });
};
exports.removeValue = removeValue;
/**
 * Generates a random element from the given array.
 *
 * @param {T[]} arr - The array to generate a random element from.
 * @return {T} - The randomly selected element from the array.
 */
var random = function (arr) {
    if (!arr.length) {
        throw new Error("Array must not be empty.");
    }
    return arr[Math.floor(Math.random() * arr.length)];
};
exports.random = random;
/**
 * Shuffles an array in place.
 *
 * @param {T[]} arr - The array to be shuffled.
 * @return {T[]} - The shuffled array.
 */
var shuffleArray = function (arr) {
    return arr.sort(function () { return 0.5 - Math.random(); });
};
exports.shuffleArray = shuffleArray;
/**
 * Sorts an array in ascending order.
 *
 * @param {T[]} arr - The array to be sorted.
 * @return {T[]} The sorted array.
 */
var sortArray = function (arr) {
    return __spreadArray([], arr, true).sort();
};
exports.sortArray = sortArray;
/**
 * Sorts the array in descending order.
 *
 * @param {T[]} arr - The array to be sorted.
 * @return {T[]} The sorted array in descending order.
 */
var sortArrayDesc = function (arr) {
    return __spreadArray([], arr, true).sort(function (a, b) { return (a < b ? 1 : -1); });
};
exports.sortArrayDesc = sortArrayDesc;
/**
 * Recursively sorts an array or object in ascending order.
 *
 * @param {any} arr - The array or object to be sorted.
 * @return {any} The sorted array or object.
 */
var sortRecursiveAsc = function (arr) {
    if (Array.isArray(arr)) {
        return __spreadArray([], arr, true).sort().map(exports.sortRecursiveAsc);
    }
    else if (typeof arr === "object" && arr !== null) {
        return Object.fromEntries(Object.entries(arr)
            .sort()
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, (0, exports.sortRecursiveAsc)(value)];
        }));
    }
    else {
        return arr;
    }
};
exports.sortRecursiveAsc = sortRecursiveAsc;
/**
 * Sorts an array or object recursively in descending order.
 *
 * @param {any} arr - the array or object to be sorted
 * @return {any} the sorted array or object
 */
var sortRecursiveDesc = function (arr) {
    if (Array.isArray(arr)) {
        return __spreadArray([], arr, true).sort(function (a, b) { return (a < b ? 1 : -1); }).map(exports.sortRecursiveDesc);
    }
    else if (typeof arr === "object" && arr !== null) {
        return Object.fromEntries(Object.entries(arr)
            .sort(function (a, b) { return (a < b ? 1 : -1); })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, (0, exports.sortRecursiveDesc)(value)];
        }));
    }
    else {
        return arr;
    }
};
exports.sortRecursiveDesc = sortRecursiveDesc;
/**
 * Filters an array based on a provided function.
 *
 * @param {T[]} arr - The array to filter.
 * @param {Function} fn - The function to use for filtering.
 * @return {T[]} The filtered array.
 */
var filterArray = function (arr, fn) {
    return arr.filter(fn);
};
exports.filterArray = filterArray;
/**
 * Filters the given array and returns a new array with all values that are not null or undefined.
 *
 * @param {T[]} arr - The array to be filtered.
 * @return {T[]} - The new array with non-null and non-undefined values.
 */
var filterNotNull = function (arr) {
    return arr.filter(Boolean);
};
exports.filterNotNull = filterNotNull;
