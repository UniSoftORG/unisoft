"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setByDotNotation = exports.setNestedValue = void 0;
/**
 * Sets a nested key-value pair in an object.
 *
 * @param {T} obj - The object in which to set the key-value pair.
 * @param {(string | number)[]} keyPath - An array representing the path to the nested key.
 * @param {any} value - The value to set for the nested key.
 * @return {T} - The modified object with the nested key-value pair set.
 */
var setNestedValue = function (obj, keyPath, value) {
    var currentObj = obj;
    for (var i = 0; i < keyPath.length - 1; i++) {
        var key = keyPath[i];
        if (!(key in currentObj)) {
            currentObj[key] = {};
        }
        currentObj = currentObj[key];
    }
    currentObj[keyPath[keyPath.length - 1]] = value;
    return obj;
};
exports.setNestedValue = setNestedValue;
/**
 * Sets a nested key-value pair in an object based on a dot-separated string path.
 *
 * @param {T} obj - The object in which to set the key-value pair.
 * @param {string} path - A dot-separated string representing the path to the nested key.
 * @param {K} value - The value to set for the nested key.
 */
var setByDotNotation = function (obj, path, value) {
    // Handle both dot and array notations and split the path.
    try {
        var parts = path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
        parts.reduce(function (acc, part, index, array) {
            // If it's the last part, set the value
            if (index === array.length - 1) {
                acc[part] = value;
                return acc;
            }
            // If the part doesn't exist, create either an array or an object.
            if (!(part in acc)) {
                // Check if the next part can be parsed into a number
                acc[part] = isFinite(Number(array[index + 1])) ? [] : {};
            }
            return acc[part];
        }, obj);
    }
    catch (error) {
        return undefined;
    }
};
exports.setByDotNotation = setByDotNotation;
