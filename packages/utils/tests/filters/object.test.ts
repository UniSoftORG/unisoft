import { filterObjectByKey } from "../../src/filters";

describe("Filter Objects Module", () => {
  describe("filterObjectByKey", () => {
    it("filters the given object by the specified keys", () => {
      const obj = { key1: "value1", key2: "value2", key3: "value3" };
      const keys = ["key1", "key3"];

      const result = filterObjectByKey(obj, keys);

      expect(result).toEqual({ key1: "value1", key3: "value3" });
    });

    it("handles empty keys array", () => {
      const obj = { key1: "value1", key2: "value2", key3: "value3" };
      const keys: string[] = [];

      const result = filterObjectByKey(obj, keys);

      expect(result).toEqual({});
    });

    it("filters the given object by the specified keys", () => {
      const obj = {
        key1: "value1",
        key2: "value2",
        key3: "value3",
        key4: "value4",
      };
      const keys: ("key1" | "key3" | "key2" | "key4")[] = [
        "key1",
        "key3",
        "key2",
        "key4",
      ];

      const result = filterObjectByKey(obj, keys);

      expect(result).toEqual({
        key1: "value1",
        key3: "value3",
        key2: "value2",
        key4: "value4",
      });
    });
  });
});
