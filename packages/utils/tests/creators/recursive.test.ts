import { deepClone, flatten } from "../..//src/creators/recursive";

describe("Recursive Creator Module", () => {
  describe("deepClone", () => {
    it("creates a deep clone of an object", () => {
      const originalObject = {
        prop1: "value1",
        prop2: {
          nestedProp: "value2",
        },
      };

      const clonedObject = deepClone(originalObject);

      expect(clonedObject).toEqual(originalObject);
      expect(clonedObject).not.toBe(originalObject);
    });
  });

  describe("flatten", () => {
    it("flattens a nested array into a single-level array", () => {
      const nestedArray = [1, [2, [3, 4]], [5]];

      const flattenedArray = flatten(nestedArray);

      expect(flattenedArray).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
