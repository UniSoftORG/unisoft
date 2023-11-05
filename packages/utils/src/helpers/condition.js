"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCondition = void 0;
/**
 * Creates a condition based on the given parameters and returns the result.
 *
 * @param {any} firstParam - The first parameter.
 * @param operator
 * @param {any} secondParam - The second parameter.
 * @returns {boolean} The result of the condition.
 */
var createCondition = function (firstParam, operator, secondParam) {
    var _a, _b;
    var conditions = {
        "===": function () { return firstParam === secondParam; },
        "!==": function () { return firstParam !== secondParam; },
        "<": function () { return firstParam < secondParam; },
        "<=": function () { return firstParam <= secondParam; },
        ">": function () { return firstParam > secondParam; },
        ">=": function () { return firstParam >= secondParam; },
    };
    return ((_b = (_a = conditions[operator]) === null || _a === void 0 ? void 0 : _a.call(conditions)) !== null && _b !== void 0 ? _b : (console.warn("Unknown condition: ".concat(operator)), false));
};
exports.createCondition = createCondition;
