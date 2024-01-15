import { after, before } from "../getters";

/**
 * Adds a value before a specified match in a subject string.
 *
 * @param {string} subject - The original string to modify.
 * @param {string} valueToAdd - The value to add before the match.
 * @param {string} [matchAfter] - The string to match after which the value should be added. If not provided, the value will be added at the beginning of the subject string.
 * @param {boolean} [notSpaceBetween=false] - Flag to indicate whether there should be a space between the value and the subject string. By default, a space is added.
 * @return {string} The modified string with the value added before the match.
 */
export const addBefore = (
  subject: string,
  valueToAdd: string,
  matchAfter?: string,
  notSpaceBetween: boolean = false
): string => {
  const separator = notSpaceBetween ? "" : " ";

  if (typeof matchAfter === "undefined") {
    return valueToAdd + separator + subject;
  }

  const beforeMatch = before(subject, matchAfter);
  if (beforeMatch === subject) {
    return subject;
  }

  return beforeMatch + valueToAdd + separator + after(subject, beforeMatch);
};

/**
 * Adds a value after a specified match in a subject string.
 *
 * @param {string} subject - The original string.
 * @param {string} valueToAdd - The value to add after the match.
 * @param {string} [matchBefore] - The string to match before adding the value. If not provided, the value will be added to the end of the subject string.
 * @param {boolean} [notSpaceBetween=false] - Whether to include a space between the match and the value. Default is false.
 * @returns {string} - The modified string with the value added.
 */
export const addAfter = (
  subject: string,
  valueToAdd: string,
  matchBefore?: string,
  notSpaceBetween: boolean = false
): string => {
  const separator = notSpaceBetween ? "" : " ";

  if (typeof matchBefore === "undefined") {
    return subject + separator + valueToAdd;
  }

  const afterMatch = after(subject, matchBefore);
  if (afterMatch === "") {
    return subject;
  }

  return before(subject, afterMatch) + separator + valueToAdd + afterMatch;
};

/**
 * Replaces a substring between two matching substrings in a given string.
 *
 * @param {string} subject - The original string
 * @param {string} valueToReplace - The string that will replace the substring between startMatch and endMatch
 * @param {string} startMatch - The substring that marks the beginning of the section to be replaced
 * @param {string} endMatch - The substring that marks the end of the section to be replaced
 * @return {string} - The modified string with the substring replaced
 */
export const replaceBetween = (
  subject: string,
  valueToReplace: string,
  startMatch: string,
  endMatch: string
): string => {
  const beforeStart = before(subject, startMatch);
  if (beforeStart === subject) {
    return subject;
  }

  const afterStart = after(subject, startMatch);
  if (afterStart === "") {
    return subject;
  }

  const beforeEnd = before(afterStart, endMatch);
  if (beforeEnd === afterStart) {
    return subject;
  }

  const afterEnd = after(afterStart, endMatch);

  return beforeStart + startMatch + valueToReplace + endMatch + afterEnd;
};

/**
 * Masks a portion of the given subject string with the provided mask character.
 *
 * @param {string} subject - The string to be masked.
 * @param {number} start - The starting index of the portion to be masked.
 * @param {number} length - The length of the portion to be masked.
 * @param {string} maskChar - The character used for masking. Defaults to '*'.
 * @return {string} - The masked string.
 */
export const mask = (
  subject: string,
  start: number,
  length: number,
  maskChar: string = "*"
): string => {
  const masked = maskChar.repeat(length);
  return subject.slice(0, start) + masked + subject.slice(start + length);
};

/**
 * Replaces all occurrences of a substring in a string with values from an array.
 *
 * @param {string} subject - The string to search and replace in.
 * @param {string} search - The substring to search for.
 * @param {any[]} replace - The array of values to replace the substring with.
 * @return {string} - The resulting string after the replacements.
 */
export const replaceArray = (
  subject: string,
  search: string,
  replace: any[]
): string => {
  let index = 0;
  return subject.replace(new RegExp(search, "g"), () => replace[index++] ?? "");
};

/**
 * Replaces a portion of a string with another string.
 *
 * @param {string} subject - The original string.
 * @param {string} replacement - The string to replace the portion of the original string.
 * @param {number} start - The index at which the replacement should start.
 * @param {number} length - The length of the portion to be replaced.
 * @return {string} - The resulting string after the replacement.
 */
export const substrReplace = (
  subject: string,
  replacement: string,
  start: number,
  length: number
): string =>
  subject.substr(0, start) + replacement + subject.substr(start + length);

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
export const processTemplateStrings = (
  input: string,
  callback: (value: string) => string,
  start: string,
  end: string
): string => {
  const escapedStart = start.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = end.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escapedStart}(.*?)${escapedEnd}`, "g");

  return input.replace(pattern, (match, content) => callback(content));
};
