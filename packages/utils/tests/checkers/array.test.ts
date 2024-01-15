import { hasAnyKey, hasKey, isAccessible } from "../../src/checkers";

describe("isAccessible function", () => {
  it("should return true for arrays", () => {
    expect(isAccessible([1, 2, 3])).toBe(true);
  });

  it("should return true for objects", () => {
    expect(isAccessible({ key: "value" })).toBe(true);
  });

  it("should return false for null", () => {
    expect(isAccessible(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isAccessible(undefined)).toBe(false);
  });

  it("should return false for primitives", () => {
    expect(isAccessible(42)).toBe(false);
    expect(isAccessible("string")).toBe(false);
    expect(isAccessible(true)).toBe(false);
  });
});

describe("has function", () => {
  it("should return true if key exists", () => {
    expect(hasKey({ key: "value" }, "key")).toBe(true);
  });

  it("should return false if key does not exist", () => {
    expect(hasKey({ key: "value" }, "noKey")).toBe(false);
  });

  test("should return false for null or undefined object", () => {
    expect(hasKey(null, "key")).toBe(false);
    expect(hasKey(undefined, "key")).toBe(false);
  });
});

describe("hasAny function", () => {
  it("should return true if any key exists", () => {
    expect(
      hasAnyKey({ key1: "value1", key2: "value2" }, ["key1", "noKey"])
    ).toBe(true);
  });

  it("should return false if no keys exist", () => {
    expect(
      hasAnyKey({ key1: "value1", key2: "value2" }, ["noKey1", "noKey2"])
    ).toBe(false);
  });

  it("should return false for null or undefined object", () => {
    expect(hasAnyKey(null, ["key"])).toBe(false);
    expect(hasAnyKey(undefined, ["key"])).toBe(false);
  });
});
