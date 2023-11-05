"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignProp = void 0;
/**
 * Assigns a property from a source object to a target object if the property is not undefined.
 *
 * @param {Record<KeyType, T | undefined>} target - The target object.
 * @param {KeyType} propName - The name of the property to assign.
 * @param {Record<KeyType, T>} source - The source object.
 */
var assignProp = function (target, propName, source) {
    if (source[propName] !== undefined) {
        target[propName] = source[propName];
    }
};
exports.assignProp = assignProp;
