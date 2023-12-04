import { doesKeyExist, isArray, isAssoc } from "../../src/evaluators";

describe("doesKeyExist function", () => {
  it("should return true if key exists", () => {
    expect(doesKeyExist({ key: "value" }, "key")).toBe(true);
  });

  it("should return false if key does not exist", () => {
    expect(doesKeyExist({ key: "value" }, "noKey")).toBe(false);
  });
});

describe("isAssoc function", () => {
  it("should return false for arrays", () => {
    expect(isAssoc([1, 2, 3])).toBe(false);
  });

  it("should return true for plain objects", () => {
    expect(isAssoc({ key: "value" })).toBe(true);
  });

  it("should return false for null", () => {
    expect(isAssoc(null)).toBe(false);
  });

  it("should return false for other object types", () => {
    expect(isAssoc(new Date())).toBe(false);
    expect(isAssoc(new Set())).toBe(false);
  });
});

describe("isList function", () => {
  test("should return true for an array with integer indices", () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  test("should return true for an empty array", () => {
    expect(isArray([])).toBe(true);
  });

  test("should return false for non-arrays", () => {
    expect(isArray("string" as unknown as unknown[])).toBe(false);
    expect(isArray(42 as unknown as unknown[])).toBe(false);
    expect(isArray(true as unknown as unknown[])).toBe(false);
  });
});
