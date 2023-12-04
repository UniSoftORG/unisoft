import { setNestedValue } from "../../src/setters/recursive";

describe("Recursive Setter Module", () => {
  describe("setNestedValue", () => {
    it("sets a nested key-value pair in an object", () => {
      const obj = {
        key1: {
          key2: {
            key3: "value3",
          },
        },
      };
      const keyPath = ["key1", "key2", "key3"];
      const value = "new_value";

      const result = setNestedValue(obj, keyPath, value);

      expect(result).toEqual({
        key1: {
          key2: {
            key3: "new_value",
          },
        },
      });
    });

    it("handles nested key not found in the object", () => {
      const obj = {
        key1: {
          key2: {
            key3: "value3",
          },
        },
      };
      const keyPath = ["key1", "key2", "key4"];
      const value = "new_value";

      const result = setNestedValue(obj, keyPath, value);

      expect(result).toEqual({
        key1: {
          key2: {
            key3: "value3",
            key4: "new_value",
          },
        },
      });
    });
  });
});
