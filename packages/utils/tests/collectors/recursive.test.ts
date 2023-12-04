import { FlexibleObj } from "@utils";
import { recursiveKeyCollection } from "../../src/collectors/recursive";

describe("dataCollection Module", () => {
  describe("collectKeysRecursively", () => {
    it("collects keys recursively from an object", () => {
      const data: FlexibleObj<any, any> = {
        key: "value1",
        children: [
          { key: "value2", children: [{ key: "value3" }] },
          { key: "value4" },
        ],
        collectKeys: ["key"],
      };

      const keys = recursiveKeyCollection(data, "collectKeys");
      expect(keys).toEqual(["key"]);
    });

    it("collects keys recursively from an object", () => {
      const data: FlexibleObj<any, any> = {
        key: "value1",
        children: [
          { key: "value2", children: [{ key: "value3" }] },
          { key: "value4" },
        ],
      };

      const keys = recursiveKeyCollection(data, ["key"]);
      expect(keys).toEqual(["key"]);
    });
  });
});
