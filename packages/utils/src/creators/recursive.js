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
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleDeepClone = exports.deepClone = exports.flatten = void 0;
/**
 * Flattens a nested array into a single-level array.
 *
 * @param {any[]} arr - The array to be flattened.
 * @return {T[]} The flattened array.
 */
var flatten = function (arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? (0, exports.flatten)(toFlatten) : toFlatten);
    }, []);
};
exports.flatten = flatten;
/**
 * Creates a deep clone of an object.
 *
 * @param {T} obj - The object to be cloned.
 * @return {T} - The cloned object.
 */
var deepClone = function (obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    return Array.isArray(obj)
        ? obj.map(function (item) { return (0, exports.deepClone)(item); })
        : Object.entries(obj).reduce(function (clone, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return (__assign(__assign({}, clone), (_b = {}, _b[key] = (0, exports.deepClone)(value), _b)));
        }, {});
};
exports.deepClone = deepClone;
/**
 * Creates a simple deep clone of an object.
 *
 * @param {T} obj - The object to be cloned.
 * @return {T} - The cloned object.
 */
var simpleDeepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
exports.simpleDeepClone = simpleDeepClone;
