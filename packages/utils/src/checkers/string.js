"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = exports.isAscii = exports.is = exports.isUlid = exports.isUuid = exports.isUrl = exports.containsAll = exports.containsAny = void 0;
/**
 * Checks whether the given subject string contains the specified search string or array of search strings.
 *
 * @param {string} subject - The subject string to search within.
 * @param {string | string[]} search - The search string or array of search strings to look for within the subject.
 * @return {boolean} - Returns true if the subject contains the search string or any of the search strings in the array, otherwise returns false.
 */
var containsAny = function (subject, search) {
    return (Array.isArray(search) ? search : [search]).some(function (item) {
        return subject.includes(item);
    });
};
exports.containsAny = containsAny;
/**
 * Checks if a given string contains all the specified search strings.
 *
 * @param {string} subject - The string to search within.
 * @param {string[]} search - An array of strings to search for.
 * @return {boolean} Returns true if the subject string contains all the search strings, otherwise returns false.
 */
var containsAll = function (subject, search) {
    return search.every(function (item) { return subject.includes(item); });
};
exports.containsAll = containsAll;
/**
 * Determines whether the given string is a valid URL.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} Returns true if the string is a valid URL, false otherwise.
 */
var isUrl = function (subject) {
    try {
        return !!new URL(subject);
    }
    catch (_a) {
        return false;
    }
};
exports.isUrl = isUrl;
/**
 * Checks if the given string is a valid UUID.
 *
 * @param {string} subject - The string to be tested.
 * @return {boolean} Returns true if the string is a valid UUID, false otherwise.
 */
var isUuid = function (subject) {
    return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(subject);
};
exports.isUuid = isUuid;
/**
 * Checks if the given string is a valid ULID.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} True if the string is a valid ULID, false otherwise.
 */
var isUlid = function (subject) {
    return /^[0-9A-Z]{26}$/.test(subject);
};
exports.isUlid = isUlid;
/**
 * Checks if the given subject matches the specified pattern.
 *
 * @param {string} subject - The string to be checked.
 * @param {string} pattern - The regular expression pattern to match against the subject.
 * @return {boolean} Returns true if the subject matches the pattern, otherwise returns false.
 */
var is = function (subject, pattern) {
    var regex = new RegExp(pattern);
    return regex.test(subject);
};
exports.is = is;
/**
 * Checks if the given string contains only ASCII characters.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} True if the string contains only ASCII characters, false otherwise.
 */
var isAscii = function (subject) {
    // eslint-disable-next-line no-control-regex
    return /^[\x00-\x7F]*$/.test(subject);
};
exports.isAscii = isAscii;
/**
 * Checks if a given string is valid JSON.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} Returns true if the string is valid JSON, false otherwise.
 */
var isJson = function (subject) {
    try {
        JSON.parse(subject);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isJson = isJson;
