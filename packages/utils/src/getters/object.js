"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
/**
 * A function that retrieves a value from an object based on a given path.
 *
 * @param {T} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired value, using dot notation.
 * @return {any} The value found at the specified path.
 */
var getValue = function (obj, path) {
    return path.split(".").reduce(function (acc, part) {
        return acc && typeof acc === "object" ? acc[part] : undefined;
    }, obj);
};
exports.getValue = getValue;
