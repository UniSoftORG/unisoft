import { findObjectByValue } from "../../src/getters/recursive";

describe("Recursive Getters Module", () => {
  describe("findObjectByValue", () => {
    it("finds an object by value", async () => {
      const data = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ];

      const foundObject = await findObjectByValue(data, "Bob", "name");
      expect(foundObject?.object).toEqual({ id: 2, name: "Bob" });
    });
  });
});
