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
exports.joinArrayElements = exports.setValueAtPathInObject = exports.prependObjectKeysWith = exports.prependValueToArray = exports.removeValueFromArrayAtIndex = exports.addValueToArrayAtIndex = void 0;
/**
 * Adds a value to an array at the specified index.
 */
var addValueToArrayAtIndex = function (arr, value, index) {
    if (index < 0 || index > arr.length) {
        throw new Error("Index out of bounds");
    }
    return __spreadArray(__spreadArray(__spreadArray([], arr.slice(0, index), true), [value], false), arr.slice(index), true);
};
exports.addValueToArrayAtIndex = addValueToArrayAtIndex;
/**
 * Removes an element at the specified index from an array and returns the resulting array.
 */
var removeValueFromArrayAtIndex = function (arr, index) {
    if (index < 0 || index >= arr.length) {
        throw new Error("Index out of bounds");
    }
    return __spreadArray(__spreadArray([], arr.slice(0, index), true), arr.slice(index + 1), true);
};
exports.removeValueFromArrayAtIndex = removeValueFromArrayAtIndex;
/**
 * Prepends a value to an array.
 */
var prependValueToArray = function (arr, value) { return __spreadArray([
    value
], arr, true); };
exports.prependValueToArray = prependValueToArray;
/**
 * Prepends keys of an object with a given prefix.
 */
var prependObjectKeysWith = function (object, prefix) {
    return Object.entries(object).reduce(function (result, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (__assign(__assign({}, result), (_b = {}, _b["".concat(prefix).concat(key)] = value, _b)));
    }, {});
};
exports.prependObjectKeysWith = prependObjectKeysWith;
/**
 * Sets a value at a specified path in an object.
 */
var setValueAtPathInObject = function (object, path, value) {
    if (!object || typeof object !== "object") {
        throw new Error("Input must be an object.");
    }
    var keys = path.split(".");
    keys.reduce(function (obj, key, index) {
        return index === keys.length - 1
            ? (obj[key] = value)
            : obj[key] || (obj[key] = {});
    }, object);
    return object;
};
exports.setValueAtPathInObject = setValueAtPathInObject;
/**
 * Joins the elements of an array into a string using a specified separator.
 */
var joinArrayElements = function (arr, separator) {
    return arr.join(separator);
};
exports.joinArrayElements = joinArrayElements;
