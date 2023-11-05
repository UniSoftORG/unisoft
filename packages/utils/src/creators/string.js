"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = exports.generateRandomPassword = void 0;
/**
 * Generates a random password with the specified length.
 *
 * @param {number} length - The length of the password.
 * @return {string} - The uni-imports password.
 */
var generateRandomPassword = function (length) {
    return (0, exports.generateRandomString)(length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
};
exports.generateRandomPassword = generateRandomPassword;
/**
 * Generates a random string with the specified length.
 *
 * @param {number} length - The length of the random string.
 * @param allowedChars
 * @return {string} - The randomly uni-imports string.
 */
var generateRandomString = function (length, allowedChars) {
    if (allowedChars === void 0) { allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
    var result = "";
    for (var i = 0; i < length; i++) {
        result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
