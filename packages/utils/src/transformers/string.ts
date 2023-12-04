import { getValue } from "../getters";

/**
 * Iteratively resolves placeholders in a template-like string using values from a provided object.
 * If a resolved value contains another template, it will continue the resolution until all placeholders
 * are replaced.
 *
 * @param {string} str - The template-like string containing placeholders.
 * @param {any} obj - The object from which to source replacement values.
 * @returns {string} - The fully resolved string.
 */
export const resolveTemplateString = (str: string, obj: any): string => {
  let replacedStr = str;
  let regexMatch;

  const regex = /\$\{([^${}]+)\}/g;

  while ((regexMatch = regex.exec(replacedStr))) {
    const fullMatch = regexMatch[0];
    const path = regexMatch[1];

    const value = getValue(obj, path);

    if (typeof value === "object") {
      replacedStr = value;
    } else if (typeof value === "string" && value.includes("${")) {
      replacedStr = replacedStr.replace(
        fullMatch,
        resolveTemplateString(value, obj)
      );
    } else {
      replacedStr = replacedStr.replace(fullMatch, value);
    }
    regex.lastIndex = 0;
  }
  return replacedStr;
};

/**
 * Limits the length of a string to a specified number of characters, appending an ending if truncated.
 *
 * @param {string} subject - The string to limit.
 * @param {number} [limit=100] - The maximum length of the string.
 * @param {string} [end='...'] - The ending to append if the string is truncated.
 * @returns {string} - The truncated string.
 */
export const limit = (
  subject: string,
  limit: number = 100,
  end: string = "..."
): string => (subject.length > limit ? subject.slice(0, limit) + end : subject);

/**
 * Converts a string to lowercase.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in lowercase.
 */
export const lower = (subject: string): string => subject.toLowerCase();

/**
 * Converts a string to uppercase.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in uppercase.
 */
export const upper = (subject: string): string => subject.toUpperCase();

/**
 * Reverses a string.
 *
 * @param {string} subject - The string to reverse.
 * @returns {string} - The reversed string.
 */
export const reverse = (subject: string): string =>
  subject.split("").reverse().join("");

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param {string} subject - The string to convert.
 * @param {string} [separator='-'] - The separator for the slug.
 * @returns {string} - The slug.
 */
export const slug = (subject: string, separator: string = "-"): string =>
  subject.toLowerCase().replace(/[^\w]+/g, separator);

/**
 * Converts a string to studly caps.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in studly caps.
 */
export const studly = (subject: string): string =>
  subject.replace(/[-_](.)/g, (_, char) => char.toUpperCase());

/**
 * Converts a string to title case.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in title case.
 */
export const title = (subject: string): string =>
  subject.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

/**
 * Swaps the case of each character in a string.
 *
 * @param {string} subject - The string to swap case for.
 * @returns {string} - The string with swapped case.
 */
export const swap = (subject: string): string =>
  subject.replace(/\w/g, (char) =>
    /[A-Z]/.test(char) ? char.toLowerCase() : char.toUpperCase()
  );

/**
 * Converts a string to snake_case.
 *
 * @param {string} subject - The string to convert.
 * @returns {string} - The string in snake_case.
 */
export const snake = (subject: string): string =>
  subject.replace(/([A-Z])/g, "_$1").toLowerCase();

/**
 * Removes extra whitespace from a string and trims it.
 *
 * @param {string} subject - The string to squish.
 * @returns {string} - The squished string.
 */
export const squish = (subject: string): string =>
  subject.replace(/\s+/g, " ").trim();

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} subject - The string to capitalize.
 * @returns {string} - The string with the first letter capitalized.
 */
export const headline = (subject: string): string =>
  subject.replace(/^./, (match) => match.toUpperCase());

/**
 * Replaces the start of a string if it matches the search string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to look for at the start.
 * @param {string} replacement - The string to replace with.
 * @returns {string} - The modified string.
 */
export const replaceStart = (
  subject: string,
  search: string,
  replacement: string
): string =>
  subject.startsWith(search)
    ? replacement + subject.slice(search.length)
    : subject;

/**
 * Replaces the end of a string if it matches the search string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to look for at the end.
 * @param {string} replacement - The string to replace with.
 * @returns {string} - The modified string.
 */
export const replaceEnd = (
  subject: string,
  search: string,
  replacement: string
): string =>
  subject.endsWith(search)
    ? subject.slice(0, subject.length - search.length) + replacement
    : subject;

/**
 * Replaces the first occurrence of the search string in the subject string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to replace.
 * @param {string} replace - The replacement string.
 * @returns {string} - The modified string.
 */
export const replaceFirst = (
  subject: string,
  search: string,
  replace: string
): string => subject.replace(search, () => replace);

/**
 * Replaces the last occurrence of the search string in the subject string.
 *
 * @param {string} subject - The string to modify.
 * @param {string} search - The string to replace.
 * @param {string} replace - The replacement string.
 * @returns {string} - The modified string.
 */
export const replaceLast = (
  subject: string,
  search: string,
  replace: string
): string => {
  const pos = subject.lastIndexOf(search);
  if (pos === -1) return subject;
  return subject.slice(0, pos) + replace + subject.slice(pos + search.length);
};

/**
 * Generates an excerpt from a string by limiting its length.
 *
 * @param {string} subject - The string to excerpt.
 * @param {number} [length=100] - The maximum length of the excerpt.
 * @param {string} [end='...'] - The ending to append if the string is truncated.
 * @returns {string} - The excerpt.
 */
export const excerpt = (
  subject: string,
  length: number = 100,
  end: string = "..."
): string =>
  subject.length <= length
    ? subject
    : subject.substring(0, length - end.length) + end;

/**
 * Appends a string to the end of another string, if it doesn't already end with it.
 *
 * @param {string} subject - The string to modify.
 * @param {string} cap - The string to append.
 * @returns {string} - The modified string.
 */
export const finish = (subject: string, cap: string): string =>
  subject.endsWith(cap) ? subject : subject + cap;

/**
 * Wraps a string at a certain width, inserting a line break character.
 *
 * @param {string} subject - The string to wrap.
 * @param {number} width - The maximum width of each line.
 * @param {string} [breakChar='\n'] - The character to use for line breaks.
 * @returns {string} - The wrapped string.
 */
export const wordWrap = (
  subject: string,
  width: number,
  breakChar: string = "\n"
): string =>
  subject.replace(
    new RegExp(`(?![^\n]{1,${width}}$)([^\n]{1,${width}})\\s`, "g"),
    `$1${breakChar}`
  );

/**
 * Wraps a string at a certain width using wordWrap function.
 *
 * @param {string} subject - The string to wrap.
 * @param {number} width - The maximum width of each line.
 * @returns {string} - The wrapped string.
 */
export const strWrap = (subject: string, width: number): string =>
  wordWrap(subject, width);
