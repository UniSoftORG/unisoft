"use strict";
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
exports.recursiveKeyCollection = void 0;
/**
 * Recursively collects keys from an object based on the specified criteria.
 * @param obj The object to
 * @param collectKeys The keys to collect
 * @param childrenKey The key to use for children
 * @param options Additional options
 */
function recursiveKeyCollection(obj, collectKeys, childrenKey, options) {
    var _a, _b, _c;
    if (childrenKey === void 0) { childrenKey = "children"; }
    var keysSet = new Set(__spreadArray(__spreadArray([], ((_a = options === null || options === void 0 ? void 0 : options.additionalProps) !== null && _a !== void 0 ? _a : []), true), (typeof collectKeys === "string"
        ? (_b = obj[collectKeys]) !== null && _b !== void 0 ? _b : []
        : collectKeys), true));
    (_c = obj[childrenKey]) === null || _c === void 0 ? void 0 : _c.forEach(function (child) {
        recursiveKeyCollection(child, collectKeys, childrenKey).forEach(function (p) {
            return keysSet.add(p);
        });
    });
    return Array.from(keysSet);
}
exports.recursiveKeyCollection = recursiveKeyCollection;
