"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substrCount = exports.ucsplit = exports.wordCount = exports.substr = exports.between = exports.beforeLast = exports.before = exports.afterLast = exports.after = void 0;
/**
 * Returns the portion of the `subject` string that comes after the first occurrence of the `search` string.
 *
 * @param {string} subject - The string to search within.
 * @param {string} search - The string to search for.
 * @return {string} - The portion of the `subject` string that comes after the first occurrence of the `search` string. If the `search` string is not found, an empty string is returned.
 */
var after = function (subject, search) {
    var pos = subject.indexOf(search);
    return pos === -1 ? "" : subject.slice(pos + search.length);
};
exports.after = after;
/**
 * Returns the substring after the last occurrence of a specified search string within a given subject string.
 *
 * @param {string} subject - The subject string.
 * @param {string} search - The search string.
 * @return {string} - The substring after the last occurrence of the search string, or an empty string if the search string is not found.
 */
var afterLast = function (subject, search) {
    var pos = subject.lastIndexOf(search);
    return pos === -1 ? "" : subject.slice(pos + search.length);
};
exports.afterLast = afterLast;
/**
 * Returns a substring of the subject string before the first occurrence of the search string.
 *
 * @param {string} subject - The string to search within.
 * @param {string} search - The string to search for.
 * @return {string} - The substring of the subject string before the first occurrence of the search string.
 */
var before = function (subject, search) {
    var pos = subject.indexOf(search);
    return pos === -1 ? subject : subject.slice(0, pos);
};
exports.before = before;
/**
 * Returns the portion of a string before the last occurrence of a specified substring.
 *
 * @param {string} subject - The string to search in.
 * @param {string} search - The substring to search for.
 * @returns {string} - The portion of the string before the last occurrence of the substring, or the original string if the substring is not found.
 */
var beforeLast = function (subject, search) {
    var pos = subject.lastIndexOf(search);
    return pos === -1 ? subject : subject.slice(0, pos);
};
exports.beforeLast = beforeLast;
/**
 * Find the substring between two given strings within a subject string.
 *
 * @param {string} subject - The subject string.
 * @param {string} start - The starting string.
 * @param {string} end - The ending string.
 * @return {string} The substring between start and end strings.
 */
var between = function (subject, start, end) {
    return (0, exports.before)((0, exports.after)(subject, start), end);
};
exports.between = between;
/**
 * Returns a substring of the given `subject` string starting from the `start` index and optionally with a specified `length`.
 *
 * @param {string} subject - The input string.
 * @param {number} start - The starting index of the substring.
 * @param {number} [length] - The length of the substring (optional).
 * @return {string} The resulting substring.
 */
var substr = function (subject, start, length) { return subject.substr(start, length); };
exports.substr = substr;
/**
 * Calculates the number of words in a given string.
 *
 * @param {string} subject - The string to count the words from.
 * @returns {number} The total number of words in the string.
 */
var wordCount = function (subject) {
    return subject.split(/\s/).filter(Boolean).length;
};
exports.wordCount = wordCount;
/**
 * Split a string into an array of its individual characters.
 *
 * @param {string} subject - The string to be split.
 * @return {string[]} An array of individual characters from the input string.
 */
var ucsplit = function (subject) { return Array.from(subject); };
exports.ucsplit = ucsplit;
/**
 * Counts the number of occurrences of a substring within a string.
 *
 * @param {string} subject - The string to search in.
 * @param {string} search - The substring to search for.
 * @return {number} The number of occurrences of the substring within the string.
 */
var substrCount = function (subject, search) {
    var count = 0, position = 0;
    while ((position = subject.indexOf(search, position)) !== -1) {
        count++;
        position += search.length;
    }
    return count;
};
exports.substrCount = substrCount;
