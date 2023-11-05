"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObjectKeysRecursive = void 0;
var helpers_1 = require("../helpers");
var setters_1 = require("../setters");
/**
 * Filters properties from the given object based on the received properties and options.
 *
 * @param {Record<any, any>} allKeys - The object containing all properties.
 * @param {any[]} receiveKeys - An array of properties to be filtered.
 * @param {FilterOptions} [options] - (Optional) Options for filtering.
 * @returns {any} - The filtered properties.
 */
var sanitizeObjectKeysRecursive = function (allKeys, receiveKeys, options) {
    var result = {};
    receiveKeys.forEach(function (prop) {
        if ((options === null || options === void 0 ? void 0 : options.parentKey) && prop[options === null || options === void 0 ? void 0 : options.parentKey]) {
            (0, helpers_1.mapRecursive)(prop[options === null || options === void 0 ? void 0 : options.parentKey], function (p) {
                (0, setters_1.assignProp)(result, p, allKeys);
                if (prop[options === null || options === void 0 ? void 0 : options.parentKey]) {
                    (0, setters_1.assignProp)(result, p, prop[options === null || options === void 0 ? void 0 : options.parentKey]);
                }
            });
        }
        else {
            (0, setters_1.assignProp)(result, prop, allKeys);
        }
    });
    return result;
};
exports.sanitizeObjectKeysRecursive = sanitizeObjectKeysRecursive;
