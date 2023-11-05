"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateConditions = exports.evaluateCondition = void 0;
var _utils_1 = require("../../@utils");
var helpers_1 = require("../helpers");
var string_1 = require("./string");
var getters_1 = require("../getters");
var setters_1 = require("../setters");
/**
 * Transforms a condition from string to into actionable logic.
 * Definition example 'variable1 === variable2' - returns boolean or define
 * @param {string} conditionStr - The condition string to evaluate.
 * @param {T} mainObj - The main object to use for evaluation.
 * @returns {boolean} - The result of the evaluation.
 */
var evaluateCondition = function (conditionStr, mainObj) {
    var _a = conditionStr.split(" "), leftPath = _a[0], operator = _a[1], rightPath = _a[2];
    var leftValue = (0, getters_1.getValue)(mainObj, leftPath);
    var rightValue = (0, getters_1.getValue)(mainObj, rightPath);
    return (0, helpers_1.createCondition)(leftValue, operator, rightValue);
};
exports.evaluateCondition = evaluateCondition;
/**
 * Evaluates conditions and returns a value based on the given options.
 * Object definition example {condition: 'variable1 === variable2', value: 'class1'}
 * @param {Array<Object>} conditions - An array of objects representing conditions.
 * @param {Object} objOptions - An object containing options for evaluation.
 * @param {Object} objOptions.mainObj - The main object to evaluate conditions against.
 * @param {string} [objOptions.valueKey] - The key to retrieve the value from the main object.
 * @param {boolean} [objOptions.returnValueKeyOnly] - Whether to return only the value key in the result.
 * @param {boolean} [objOptions.forceMostFrequentKey] - Whether to force the most frequent key in the result.
 * @param {ValueReplacement} [replaceValue] - The type of replacement for the value.
 * @return {Object|undefined} - The evaluated value or undefined.
 */
var evaluateConditions = function (conditions, objOptions, replaceValue) {
    var _a;
    if (replaceValue === void 0) { replaceValue = _utils_1.ValueReplacement.Before; }
    var mainObj = objOptions.mainObj, valueKey = objOptions.valueKey, returnValueKeyOnly = objOptions.returnValueKeyOnly;
    var conditional = "";
    if (conditions) {
        Array.isArray(conditions) &&
            conditions.forEach(function (attribute) {
                if (valueKey && typeof attribute === "object" && mainObj) {
                    (0, helpers_1.mapObjectValues)(attribute, function (conditions) {
                        conditions.forEach(function (condition) {
                            if ((0, exports.evaluateCondition)(condition.condition, mainObj !== null && mainObj !== void 0 ? mainObj : {}))
                                conditional += " ".concat(condition.value);
                        });
                    });
                }
                else {
                    if ((0, exports.evaluateCondition)(attribute.condition, mainObj !== null && mainObj !== void 0 ? mainObj : {})) {
                        conditional += " ".concat(attribute.value);
                    }
                }
            });
    }
    var finalValue = (0, string_1.evaluateReplacement)({
        oldValue: (0, getters_1.getValue)(mainObj, valueKey !== null && valueKey !== void 0 ? valueKey : "") || "",
        newValue: conditional.trim(),
    }, replaceValue).trim();
    if (returnValueKeyOnly && valueKey) {
        return _a = {}, _a[valueKey.split(".").pop()] = finalValue, _a;
    }
    else if (valueKey) {
        return (0, setters_1.setNestedValue)(mainObj, valueKey.split("."), finalValue);
    }
    else {
        return finalValue;
    }
};
exports.evaluateConditions = evaluateConditions;
