import { getValue } from "../../src/getters";

describe("Object Getters Module", () => {
  describe("getValue", () => {
    it("retrieves a value from an object based on a path", () => {
      const obj = { a: { b: { c: 10 } } };
      expect(getValue(obj, "a.b.c")).toBe(10);
    });
  });
});
