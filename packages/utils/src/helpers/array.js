"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crossJoin = void 0;
/**
 * Generates the cross join of two arrays.
 *
 * @param {T[]} arr1 - The first array.
 * @param {U[]} arr2 - The second array.
 * @return {[T, U][]} - The cross join of the two arrays.
 */
var crossJoin = function (arr1, arr2) {
    return arr1.flatMap(function (item1) { return arr2.map(function (item2) { return [item1, item2]; }); });
};
exports.crossJoin = crossJoin;
