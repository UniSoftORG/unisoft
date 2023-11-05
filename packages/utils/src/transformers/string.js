"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strWrap = exports.wordWrap = exports.finish = exports.excerpt = exports.replaceLast = exports.replaceFirst = exports.replaceEnd = exports.replaceStart = exports.headline = exports.squish = exports.snake = exports.swap = exports.title = exports.studly = exports.slug = exports.reverse = exports.upper = exports.lower = exports.limit = exports.resolveTemplateString = void 0;
var getters_1 = require("../getters");
/**
 * Iteratively resolves placeholders in a template-like string using values from a provided object.
 * If a resolved value contains another template, it will continue the resolution until all placeholders
 * are replaced.
 *
 * @param {string} str - The template-like string containing placeholders.
 * @param {any} obj - The object from which to source replacement values.
 * @returns {string} - The fully resolved string.
 */
var resolveTemplateString = function (str, obj) {
    var replacedStr = str;
    var regexMatch;
    var regex = /\$\{([^${}]+)\}/g;
    while ((regexMatch = regex.exec(replacedStr))) {
        var fullMatch = regexMatch[0];
        var path = regexMatch[1];
        var value = (0, getters_1.getValue)(obj, path);
        if (typeof value === "object") {
            replacedStr = value;
        }
        else if (typeof value === "string" && value.includes("${")) {
            replacedStr = replacedStr.replace(fullMatch, (0, exports.resolveTemplateString)(value, obj));
        }
        else {
            replacedStr = replacedStr.replace(fullMatch, value);
        }
        regex.lastIndex = 0;
    }
    return replacedStr;
};
exports.resolveTemplateString = resolveTemplateString;
/**
 * Limits the length of a string to a specified number of characters, appending an ending if truncated.
 *
 * @param {string} subject - The string to limit.
 * @param {number} [limit=100] - The maximum length of the string.
 * @param {string} [end='...'] - The ending to append if the string is truncated.
 * @returns {string} - The truncated string.
 */
var limit = function (subject, limit, end) {
    if (limit === void 0) { limit = 100; }
    if (end === void 0) { end = "..."; }
    return (subject.length > limit ? subject.slice(0, limit) + end : subject);
};
exports.limit = limit;
/**
 * Converts a string to lowercase.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in lowercase.
 */
var lower = function (subject) { return subject.toLowerCase(); };
exports.lower = lower;
/**
 * Converts a string to uppercase.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in uppercase.
 */
var upper = function (subject) { return subject.toUpperCase(); };
exports.upper = upper;
/**
 * Reverses a string.
 *
 * @param {string} subject - The string to reverse.
 * @returns {string} - The reversed string.
 */
var reverse = function (subject) {
    return subject.split("").reverse().join("");
};
exports.reverse = reverse;
/**
 * Converts a string to a URL-friendly slug.
 *
 * @param {string} subject - The string to convert.
 * @param {string} [separator='-'] - The separator for the slug.
 * @returns {string} - The slug.
 */
var slug = function (subject, separator) {
    if (separator === void 0) { separator = "-"; }
    return subject.toLowerCase().replace(/[^\w]+/g, separator);
};
exports.slug = slug;
/**
 * Converts a string to studly caps.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in studly caps.
 */
var studly = function (subject) {
    return subject.replace(/[-_](.)/g, function (_, char) { return char.toUpperCase(); });
};
exports.studly = studly;
/**
 * Converts a string to title case.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in title case.
 */
var title = function (subject) {
    return subject.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
exports.title = title;
/**
 * Swaps the case of each character in a string.
 *
 * @param {string} subject - The string to swap case for.
 * @returns {string} - The string with swapped case.
 */
var swap = function (subject) {
    return subject.replace(/\w/g, function (char) {
        return /[A-Z]/.test(char) ? char.toLowerCase() : char.toUpperCase();
    });
};
exports.swap = swap;
/**
 * Converts a string to snake_case.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in snake_case.
 */
var snake = function (subject) {
    return subject.replace(/([A-Z])/g, "_$1").toLowerCase();
};
exports.snake = snake;
/**
 * Removes extra whitespace from a string and trims it.
 *
 * @param {string} subject - The string to squish.
 * @returns {string} - The squished string.
 */
var squish = function (subject) {
    return subject.replace(/\s+/g, " ").trim();
};
exports.squish = squish;
/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} subject - The string to capitalize.
 * @returns {string} - The string with the first letter capitalized.
 */
var headline = function (subject) {
    return subject.replace(/^./, function (match) { return match.toUpperCase(); });
};
exports.headline = headline;
/**
 * Replaces the start of a string if it matches the search string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to look for at the start.
 * @param {string} replacement - The string to replace with.
 * @returns {string} - The modified string.
 */
var replaceStart = function (subject, search, replacement) {
    return subject.startsWith(search)
        ? replacement + subject.slice(search.length)
        : subject;
};
exports.replaceStart = replaceStart;
/**
 * Replaces the end of a string if it matches the search string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to look for at the end.
 * @param {string} replacement - The string to replace with.
 * @returns {string} - The modified string.
 */
var replaceEnd = function (subject, search, replacement) {
    return subject.endsWith(search)
        ? subject.slice(0, subject.length - search.length) + replacement
        : subject;
};
exports.replaceEnd = replaceEnd;
/**
 * Replaces the first occurrence of the search string in the subject string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to replace.
 * @param {string} replace - The replacement string.
 * @returns {string} - The modified string.
 */
var replaceFirst = function (subject, search, replace) { return subject.replace(search, function () { return replace; }); };
exports.replaceFirst = replaceFirst;
/**
 * Replaces the last occurrence of the search string in the subject string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to replace.
 * @param {string} replace - The replacement string.
 * @returns {string} - The modified string.
 */
var replaceLast = function (subject, search, replace) {
    var pos = subject.lastIndexOf(search);
    if (pos === -1)
        return subject;
    return subject.slice(0, pos) + replace + subject.slice(pos + search.length);
};
exports.replaceLast = replaceLast;
/**
 * Generates an excerpt from a string by limiting its length.
 *
 * @param {string} subject - The string to excerpt.
 * @param {number} [length=100] - The maximum length of the excerpt.
 * @param {string} [end='...'] - The ending to append if the string is truncated.
 * @returns {string} - The excerpt.
 */
var excerpt = function (subject, length, end) {
    if (length === void 0) { length = 100; }
    if (end === void 0) { end = "..."; }
    return subject.length <= length
        ? subject
        : subject.substring(0, length - end.length) + end;
};
exports.excerpt = excerpt;
/**
 * Appends a string to the end of another string, if it doesn't already end with it.
 *
 * @param {string} subject - The string to modify.
 * @param {string} cap - The string to append.
 * @returns {string} - The modified string.
 */
var finish = function (subject, cap) {
    return subject.endsWith(cap) ? subject : subject + cap;
};
exports.finish = finish;
/**
 * Wraps a string at a certain width, inserting a line break character.
 *
 * @param {string} subject - The string to wrap.
 * @param {number} width - The maximum width of each line.
 * @param {string} [breakChar='\n'] - The character to use for line breaks.
 * @returns {string} - The wrapped string.
 */
var wordWrap = function (subject, width, breakChar) {
    if (breakChar === void 0) { breakChar = "\n"; }
    return subject.replace(new RegExp("(?![^\n]{1,".concat(width, "}$)([^\n]{1,").concat(width, "})\\s"), "g"), "$1".concat(breakChar));
};
exports.wordWrap = wordWrap;
/**
 * Wraps a string at a certain width using wordWrap function.
 *
 * @param {string} subject - The string to wrap.
 * @param {number} width - The maximum width of each line.
 * @returns {string} - The wrapped string.
 */
var strWrap = function (subject, width) {
    return (0, exports.wordWrap)(subject, width);
};
exports.strWrap = strWrap;
