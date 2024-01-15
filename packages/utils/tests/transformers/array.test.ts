import { arrayToObject } from "../../src/transformers";

describe("Array Transformer Module", () => {
  describe("arrayToObject", () => {
    it("converts an array to an object using a key extractor function", () => {
      const arr = [
        { id: "1", value: "one" },
        { id: "2", value: "two" },
      ];
      const keyExtractor = (item: { id: string; value: string }) => item.id;

      const result = arrayToObject(arr, keyExtractor);

      expect(result).toEqual({
        "1": { id: "1", value: "one" },
        "2": { id: "2", value: "two" },
      });
    });
    describe("arrayToObject", () => {
      it("handles an empty array input", () => {
        const arr: any[] = [];
        const keyExtractor = (item: any) => item.id;

        const result = arrayToObject(arr, keyExtractor);

        expect(result).toEqual({});
      });

      it("handles duplicate keys in the array input", () => {
        const arr = [
          { id: "1", value: "one" },
          { id: "1", value: "duplicate" },
        ];
        const keyExtractor = (item: { id: string; value: string }) => item.id;

        const result = arrayToObject(arr, keyExtractor);

        expect(result).toEqual({
          "1": { id: "1", value: "duplicate" },
        });
      });
    });
  });
});
