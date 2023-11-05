"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTemplateStrings = exports.substrReplace = exports.replaceArray = exports.mask = exports.replaceBetween = exports.addAfter = exports.addBefore = void 0;
var getters_1 = require("../getters");
/**
 * Adds a value before a specified match in a subject string.
 *
 * @param {string} subject - The original string to modify.
 * @param {string} valueToAdd - The value to add before the match.
 * @param {string} [matchAfter] - The string to match after which the value should be added. If not provided, the value will be added at the beginning of the subject string.
 * @param {boolean} [notSpaceBetween=false] - Flag to indicate whether there should be a space between the value and the subject string. By default, a space is added.
 * @return {string} The modified string with the value added before the match.
 */
var addBefore = function (subject, valueToAdd, matchAfter, notSpaceBetween) {
    if (notSpaceBetween === void 0) { notSpaceBetween = false; }
    var separator = notSpaceBetween ? "" : " ";
    if (typeof matchAfter === "undefined") {
        return valueToAdd + separator + subject;
    }
    var beforeMatch = (0, getters_1.before)(subject, matchAfter);
    if (beforeMatch === subject) {
        return subject;
    }
    return beforeMatch + valueToAdd + separator + (0, getters_1.after)(subject, beforeMatch);
};
exports.addBefore = addBefore;
/**
 * Adds a value after a specified match in a subject string.
 *
 * @param {string} subject - The original string.
 * @param {string} valueToAdd - The value to add after the match.
 * @param {string} [matchBefore] - The string to match before adding the value. If not provided, the value will be added to the end of the subject string.
 * @param {boolean} [notSpaceBetween=false] - Whether to include a space between the match and the value. Default is false.
 * @returns {string} - The modified string with the value added.
 */
var addAfter = function (subject, valueToAdd, matchBefore, notSpaceBetween) {
    if (notSpaceBetween === void 0) { notSpaceBetween = false; }
    var separator = notSpaceBetween ? "" : " ";
    if (typeof matchBefore === "undefined") {
        return subject + separator + valueToAdd;
    }
    var afterMatch = (0, getters_1.after)(subject, matchBefore);
    if (afterMatch === "") {
        return subject;
    }
    return (0, getters_1.before)(subject, afterMatch) + separator + valueToAdd + afterMatch;
};
exports.addAfter = addAfter;
/**
 * Replaces a substring between two matching substrings in a given string.
 *
 * @param {string} subject - The original string
 * @param {string} valueToReplace - The string that will replace the substring between startMatch and endMatch
 * @param {string} startMatch - The substring that marks the beginning of the section to be replaced
 * @param {string} endMatch - The substring that marks the end of the section to be replaced
 * @return {string} - The modified string with the substring replaced
 */
var replaceBetween = function (subject, valueToReplace, startMatch, endMatch) {
    var beforeStart = (0, getters_1.before)(subject, startMatch);
    if (beforeStart === subject) {
        return subject;
    }
    var afterStart = (0, getters_1.after)(subject, startMatch);
    if (afterStart === "") {
        return subject;
    }
    var beforeEnd = (0, getters_1.before)(afterStart, endMatch);
    if (beforeEnd === afterStart) {
        return subject;
    }
    var afterEnd = (0, getters_1.after)(afterStart, endMatch);
    return beforeStart + startMatch + valueToReplace + endMatch + afterEnd;
};
exports.replaceBetween = replaceBetween;
/**
 * Masks a portion of the given subject string with the provided mask character.
 *
 * @param {string} subject - The string to be masked.
 * @param {number} start - The starting index of the portion to be masked.
 * @param {number} length - The length of the portion to be masked.
 * @param {string} maskChar - The character used for masking. Defaults to '*'.
 * @return {string} - The masked string.
 */
var mask = function (subject, start, length, maskChar) {
    if (maskChar === void 0) { maskChar = "*"; }
    var masked = maskChar.repeat(length);
    return subject.slice(0, start) + masked + subject.slice(start + length);
};
exports.mask = mask;
/**
 * Replaces all occurrences of a substring in a string with values from an array.
 *
 * @param {string} subject - The string to search and replace in.
 * @param {string} search - The substring to search for.
 * @param {any[]} replace - The array of values to replace the substring with.
 * @return {string} - The resulting string after the replacements.
 */
var replaceArray = function (subject, search, replace) {
    var index = 0;
    return subject.replace(new RegExp(search, "g"), function () { var _a; return (_a = replace[index++]) !== null && _a !== void 0 ? _a : ""; });
};
exports.replaceArray = replaceArray;
/**
 * Replaces a portion of a string with another string.
 *
 * @param {string} subject - The original string.
 * @param {string} replacement - The string to replace the portion of the original string.
 * @param {number} start - The index at which the replacement should start.
 * @param {number} length - The length of the portion to be replaced.
 * @return {string} - The resulting string after the replacement.
 */
var substrReplace = function (subject, replacement, start, length) {
    return subject.substr(0, start) + replacement + subject.substr(start + length);
};
exports.substrReplace = substrReplace;
/**
 * Processes a template string by replacing content between customizable delimiters with the result of a callback function.
 *
 * @param {string} input - The template string to process.
 * @param {(value: string) => string} callback - A callback function that receives the content between the delimiters and returns a replacement string.
 * @param {string} start - The starting delimiter. Special characters will be escaped.
 * @param {string} end - The ending delimiter. Special characters will be escaped.
 * @returns {string} - The processed string with content between the delimiters replaced by the result of the callback function.
 *
 * @example
 * // Returns "Hello John!"
 * processTemplateStrings("Hello ${name}!", name => "John", "${", "}")
 */
var processTemplateStrings = function (input, callback, start, end) {
    var escapedStart = start.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    var escapedEnd = end.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    var pattern = new RegExp("".concat(escapedStart, "(.*?)").concat(escapedEnd), "g");
    return input.replace(pattern, function (match, content) { return callback(content); });
};
exports.processTemplateStrings = processTemplateStrings;
