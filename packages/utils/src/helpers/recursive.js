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
exports.transformObject = exports.forLoopRecursive = exports.forEachRecursive = exports.forRecursive = exports.mapRecursive = void 0;
/**
 * Recursively maps over an array of nested objects and applies a mapper function to each object.
 *
 * @param {T[]} data - The array of nested objects to map over.
 * @param {(value: T, key?: any) => T} mapperFn - The function to apply to each object.
 * @param {string} [nestedKey="children"] - The key used to access the nested objects in each object.
 * @throws {Error} Input must be an array.
 * @return {T[]} The mapped array of nested objects.
 */
var mapRecursive = function (data, mapperFn, nestedKey) {
    if (nestedKey === void 0) { nestedKey = "children"; }
    if (!Array.isArray(data)) {
        throw new Error("Input must be an array.");
    }
    return data.map(function (item, key) {
        var _a;
        var nestedValue = item[nestedKey];
        if (Array.isArray(nestedValue)) {
            return __assign(__assign({}, mapperFn(item, key)), (_a = {}, _a[nestedKey] = (0, exports.mapRecursive)(nestedValue, mapperFn, nestedKey), _a));
        }
        return mapperFn(item, key);
    });
};
exports.mapRecursive = mapRecursive;
/**
 * Executes a callback function recursively on each item in an array of objects.
 *
 * @param {T[]} data - The array of objects to iterate over.
 * @param {(item: T, index: number, parent?: T) => Promise<any> | any} callback - The callback function to execute on each item.
 * @param {keyof T} [nestedKey="children"] - The key of the nested array in each item.
 * @param {T} [parent] - The parent object of the current item.
 * @return {void}
 */
var forRecursive = function (data, callback, nestedKey, parent) {
    if (nestedKey === void 0) { nestedKey = "children"; }
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        callback(item, i, parent);
        if (item[nestedKey] && item[nestedKey].length) {
            (0, exports.forRecursive)(item[nestedKey], callback, nestedKey, item);
        }
    }
};
exports.forRecursive = forRecursive;
/**
 * Recursively maps each item in the given data array using the provided mapper function.
 * If an item has a nested array with the specified key, it will be recursively mapped as well.
 *
 * @param {T[]} data - The array of data to be mapped.
 * @param {(component: T) => T} mapperFn - The function used to map each item in the data array.
 * @param {string} [nestedKey="children"] - The key used to access the nested array in each item.
 * @return {T[]} The resulting array after mapping each item in the data array.
 */
var forEachRecursive = function (data, mapperFn, nestedKey) {
    if (nestedKey === void 0) { nestedKey = "children"; }
    var result = [];
    data.forEach(function (item) {
        var _a;
        var nestedValue = item[nestedKey];
        if (Array.isArray(nestedValue)) {
            result.push(__assign(__assign({}, mapperFn(item)), (_a = {}, _a[nestedKey] = (0, exports.forEachRecursive)(nestedValue, mapperFn, nestedKey), _a)));
        }
        else {
            result.push(mapperFn(item));
        }
    });
    return result;
};
exports.forEachRecursive = forEachRecursive;
/**
 * Maps an array of objects recursively using a mapper function.
 *
 * @param {T[]} data - The array of objects to be mapped.
 * @param {(component: T) => T} mapperFn - The mapper function that maps each object.
 * @param {string} [nestedKey="children"] - The key used to access the nested array in each object.
 * @return {T[]} - The mapped array of objects.
 */
var forLoopRecursive = function (data, mapperFn, nestedKey) {
    var _a;
    if (nestedKey === void 0) { nestedKey = "children"; }
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var nestedValue = item[nestedKey];
        if (Array.isArray(nestedValue)) {
            result.push(__assign(__assign({}, mapperFn(item)), (_a = {}, _a[nestedKey] = (0, exports.forLoopRecursive)(nestedValue, mapperFn, nestedKey), _a)));
        }
        else {
            result.push(mapperFn(item));
        }
    }
    return result;
};
exports.forLoopRecursive = forLoopRecursive;
var transformObject = function (obj, shouldTransformByKey, copyKeys, parent) {
    if (!obj || typeof obj !== "object")
        return;
    if (obj.hasOwnProperty(shouldTransformByKey) &&
        typeof obj[shouldTransformByKey] === "string") {
        var pathParts = obj[shouldTransformByKey].split(".");
        var valueToMap = parent;
        for (var _i = 0, pathParts_1 = pathParts; _i < pathParts_1.length; _i++) {
            var part = pathParts_1[_i];
            if (valueToMap && valueToMap.hasOwnProperty(part)) {
                valueToMap = valueToMap[part];
            }
            else {
                valueToMap = undefined;
                break;
            }
        }
        if (Array.isArray(valueToMap)) {
            obj.children = valueToMap.map(function (subItem, index) {
                var newItem = __assign(__assign({}, subItem), { index: index });
                for (var _i = 0, copyKeys_1 = copyKeys; _i < copyKeys_1.length; _i++) {
                    var key = copyKeys_1[_i];
                    if (subItem.hasOwnProperty(key)) {
                        newItem[key] = subItem[key];
                    }
                }
                return newItem;
            });
            delete obj[shouldTransformByKey]; // Remove the shouldTransformByKey after processing
        }
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
            (0, exports.transformObject)(obj[key], shouldTransformByKey, copyKeys, obj);
        }
    }
};
exports.transformObject = transformObject;
