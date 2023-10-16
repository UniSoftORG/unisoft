import { containsAny, containsAll, isUrl, isUuid, isUlid, is, isAscii, isJson } from '../../src/checkers';

describe('String utility functions', () => {
  describe('contains function', () => {
    it('should return true if the subject contains the search string', () => {
      expect(containsAny('hello world', 'world')).toBe(true);
    });

    it('should return false if the subject does not contain the search string', () => {
      expect(containsAny('hello world', 'moon')).toBe(false);
    });

    it('should return true if the subject contains any of the search strings in array', () => {
      expect(containsAny('hello world', ['moon', 'world'])).toBe(true);
    });

    it('should return false if the subject contains none of the search strings in array', () => {
      expect(containsAny('hello world', ['moon', 'mars'])).toBe(false);
    });
  });

  describe('containsAll function', () => {
    it('should return true if the subject contains all search strings', () => {
      expect(containsAll('hello world moon', ['hello', 'world'])).toBe(true);
    });

    it('should return false if the subject does not contain all search strings', () => {
      expect(containsAll('hello world', ['hello', 'moon'])).toBe(false);
    });
  });

  describe('isUrl function', () => {
    it('should return true for a valid URL', () => {
      expect(isUrl('https://www.google.com')).toBe(true);
    });

    it('should return false for an invalid URL', () => {
      expect(isUrl('not a url')).toBe(false);
    });
  });

  describe('isUuid function', () => {
    it('should return true for a valid UUID', () => {
      expect(isUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    });

    it('should return false for an invalid UUID', () => {
      expect(isUuid('not a uuid')).toBe(false);
    });
  });

  describe('isUlid function', () => {
    it('should return true for a valid ULID', () => {
      expect(isUlid('01F5ZG7W99T0RJATBGRX4K53SW')).toBe(true);
    });

    it('should return false for an invalid ULID', () => {
      expect(isUlid('not a ulid')).toBe(false);
    });
  });

  describe('is function', () => {
    it('should return true if subject matches pattern', () => {
      expect(is('hello', 'he..o')).toBe(true);
    });

    it('should return false if subject does not match pattern', () => {
      expect(is('hello', 'wo..d')).toBe(false);
    });
  });

  describe('isAscii function', () => {
    it('should return true for ASCII characters', () => {
      expect(isAscii('hello world')).toBe(true);
    });

    it('should return false for non-ASCII characters', () => {
      expect(isAscii('hello 世界')).toBe(false);
    });
  });

  describe('isJson function', () => {
    it('should return true for a valid JSON string', () => {
      expect(isJson('{"key": "value"}')).toBe(true);
    });

    it('should return false for an invalid JSON string', () => {
      expect(isJson('not a json')).toBe(false);
    });
  });
});
