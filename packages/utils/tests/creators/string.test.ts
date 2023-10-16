import { generateRandomPassword, generateRandomString } from '../../src/creators';

describe('password function', () => {
  it('should return a string of the specified length', () => {
    expect(generateRandomPassword(10).length).toBe(10);
    expect(generateRandomPassword(20).length).toBe(20);
  });

  it('should only contain valid characters', () => {
    const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generatedPassword = generateRandomPassword(100);
    for (const char of generatedPassword) {
      expect(validChars).toContain(char);
    }
  });
});

describe('generateRandomString function', () => {
  it('should return a string of the specified length', () => {
    expect(generateRandomString(10).length).toBe(10);
    expect(generateRandomString(20).length).toBe(20);
  });

  it('should only contain valid characters', () => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const generatedString = generateRandomString(100);
    for (const char of generatedString) {
      expect(validChars).toContain(char);
    }
  });
});
