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
exports.excludeKeys = exports.objectToArray = exports.deepMerge = exports.mergeObjects = exports.replaceDynamicTargets = void 0;
var getters_1 = require("../getters");
var string_1 = require("./string");
var setters_1 = require("../setters");
/**
 * Replaces specified targeted strings within an object using a provided list.
 *
 * @template T - The type of the object containing strings to replace.
 * @param {T} obj - The object containing targeted strings.
 * @param {string[]} targets - List of imports pointing to strings to be replaced within the object.
 * @returns {T} - The modified object with targeted strings replaced.
 */
var replaceDynamicTargets = function (obj, targets) {
    targets === null || targets === void 0 ? void 0 : targets.map(function (target) {
        var targetStr = (0, getters_1.getValue)(obj, target);
        var replaced = (0, string_1.resolveTemplateString)(targetStr, obj);
        (0, setters_1.setByDotNotation)(obj, target, replaced);
    });
    // for (let path of targets) {
    //   const targetStr = getValue(obj, path);
    //   const replaced = resolveTemplateString(targetStr as string, obj);
    //   setByDotNotation(obj, path, replaced);
    // }
    return targets ? obj : undefined;
};
exports.replaceDynamicTargets = replaceDynamicTargets;
/**
 * Merge two objects
 *
 * @param oldProps
 * @param newProps
 */
var mergeObjects = function (oldProps, newProps) {
    return __assign(__assign({}, oldProps), newProps);
};
exports.mergeObjects = mergeObjects;
/**
 * Deep merge two objects
 *
 * @param {T} target - Target object.
 * @param sources
 * @return {T & U} - Merged object.
 */
var deepMerge = function (target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return sources.reduce(function (target, source) {
        if (source == null)
            return target;
        Object.keys(source).forEach(function (key) {
            var targetValue = target[key];
            var sourceValue = source[key];
            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            }
            else if (targetValue instanceof Date && sourceValue instanceof Date) {
                target[key] = new Date(Math.max(targetValue.getTime(), sourceValue.getTime()));
            }
            else if (typeof targetValue === "object" &&
                targetValue &&
                typeof sourceValue === "object" &&
                sourceValue) {
                target[key] = (0, exports.deepMerge)(__assign({}, targetValue), sourceValue);
            }
            else {
                target[key] = sourceValue;
            }
        });
        return target;
    }, target);
};
exports.deepMerge = deepMerge;
/**
 * Converts an object into an array of values.
 *
 * @param {Record<string, T>} obj - The object to convert into an array.
 * @param {string[]} [keys] - An optional array of keys to select specific values from the object.
 * @return {T[]} An array of values from the object.
 */
var objectToArray = function (obj, keys) {
    return keys
        ? keys.map(function (key) { return obj[key]; }).filter(function (val) { return val !== undefined; })
        : Object.values(obj);
};
exports.objectToArray = objectToArray;
/**
 * Exclude specified properties from an object.
 *
 * @param {T} obj - The object from which to exclude properties.
 * @param {K[]} keysToExclude - An array of keys to exclude.
 * @return {Omit<T, K>} - The object with the specified properties excluded.
 */
var excludeKeys = function (obj, keysToExclude) {
    return Object.fromEntries(Object.entries(obj).filter(function (_a) {
        var key = _a[0];
        return !keysToExclude.includes(key);
    }));
};
exports.excludeKeys = excludeKeys;
