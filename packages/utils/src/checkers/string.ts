/**
 * Checks whether the given subject string contains the specified search string or array of search strings.
 *
 * @param {string} subject - The subject string to search within.
 * @param {string | string[]} search - The search string or array of search strings to look for within the subject.
 * @return {boolean} - Returns true if the subject contains the search string or any of the search strings in the array, otherwise returns false.
 */
export const containsAny = (
  subject: string,
  search: string | string[]
): boolean =>
  (Array.isArray(search) ? search : [search]).some((item) =>
    subject.includes(item)
  );

/**
 * Checks if a given string contains all the specified search strings.
 *
 * @param {string} subject - The string to search within.
 * @param {string[]} search - An array of strings to search for.
 * @return {boolean} Returns true if the subject string contains all the search strings, otherwise returns false.
 */
export const containsAll = (subject: string, search: string[]): boolean =>
  search.every((item) => subject.includes(item));

/**
 * Determines whether the given string is a valid URL.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} Returns true if the string is a valid URL, false otherwise.
 */
export const isUrl = (subject: string): boolean => {
  try {
    return !!new URL(subject);
  } catch {
    return false;
  }
};

/**
 * Checks if the given string is a valid UUID.
 *
 * @param {string} subject - The string to be tested.
 * @return {boolean} Returns true if the string is a valid UUID, false otherwise.
 */
export const isUuid = (subject: string): boolean =>
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(
    subject
  );

/**
 * Checks if the given string is a valid ULID.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} True if the string is a valid ULID, false otherwise.
 */
export const isUlid = (subject: string): boolean =>
  /^[0-9A-Z]{26}$/.test(subject);

/**
 * Checks if the given subject matches the specified pattern.
 *
 * @param {string} subject - The string to be checked.
 * @param {string} pattern - The regular expression pattern to match against the subject.
 * @return {boolean} Returns true if the subject matches the pattern, otherwise returns false.
 */
export const is = (subject: string, pattern: string): boolean => {
  const regex = new RegExp(pattern);
  return regex.test(subject);
};

/**
 * Checks if the given string contains only ASCII characters.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} True if the string contains only ASCII characters, false otherwise.
 */
export const isAscii = (subject: string): boolean =>
  // eslint-disable-next-line no-control-regex
  /^[\x00-\x7F]*$/.test(subject);

/**
 * Checks if a given string is valid JSON.
 *
 * @param {string} subject - The string to be checked.
 * @return {boolean} Returns true if the string is valid JSON, false otherwise.
 */
export const isJson = (subject: string): boolean => {
  try {
    JSON.parse(subject);
    return true;
  } catch {
    return false;
  }
};
