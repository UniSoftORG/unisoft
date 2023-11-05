"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.efficientPluck = void 0;
/**
 * Plucks properties from an object based on the provided keys.
 *
 * @param {T} obj - The object from which to pluck properties.
 * @param {K[]} keys - The keys of the properties to be plucked.
 * @returns {Pick<T, K>} - An object containing only the specified properties.
 */
var efficientPluck = function (obj, keys) {
    var result = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    }
    return result;
};
exports.efficientPluck = efficientPluck;
