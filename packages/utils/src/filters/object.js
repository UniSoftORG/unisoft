"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObjectByKey = void 0;
/**
 * Filters the given object by the specified keys.
 *
 * @param {Record<T, K>} object - The source object to filter.
 * @param {T[]} keys - The keys to filter the object by.
 * @return {Partial<Record<T, K>>} - The filtered object.
 */
var filterObjectByKey = function (object, keys) {
    return keys.reduce(function (acc, key) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {});
};
exports.filterObjectByKey = filterObjectByKey;
