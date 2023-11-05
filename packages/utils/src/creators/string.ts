/**
 * Generates a random password with the specified length.
 *
 * @param {number} length - The length of the password.
 * @return {string} - The uni-imports password.
 */
export const generateRandomPassword = (length: number): string =>
  generateRandomString(
    length,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  );

/**
 * Generates a random string with the specified length.
 *
 * @param {number} length - The length of the random string.
 * @param allowedChars
 * @return {string} - The randomly uni-imports string.
 */
export const generateRandomString = (
  length: number,
  allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += allowedChars.charAt(
      Math.floor(Math.random() * allowedChars.length),
    );
  }
  return result;
};
