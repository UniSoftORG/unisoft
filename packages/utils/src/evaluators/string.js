"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateReplacement = void 0;
var _utils_1 = require("../../@utils");
var setters_1 = require("../setters");
/**
 * Evaluates the replacement value based on the given condition.
 *
 * @param {object} values - An object containing the old and new values.
 * @param {ValueReplacement} condition - The condition to evaluate.
 * @param {boolean} noSpaceBetween - Whether to include a space between the old and new values.
 * @return {string} The evaluated replacement value.
 */
var evaluateReplacement = function (values, condition, noSpaceBetween) {
    switch (condition) {
        case _utils_1.ValueReplacement.All:
            return values.newValue;
        case _utils_1.ValueReplacement.Before:
            return (0, setters_1.addBefore)(values.oldValue, values.newValue, undefined, noSpaceBetween);
        default:
            return (0, setters_1.addAfter)(values.oldValue, values.newValue, undefined, noSpaceBetween);
    }
};
exports.evaluateReplacement = evaluateReplacement;
