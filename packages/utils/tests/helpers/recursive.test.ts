import { Nested } from "@utils";
import {
  forEachRecursive,
  forLoopRecursive,
  forRecursive,
  mapRecursive,
} from "../../src/helpers/recursive";

describe("dataMapping Module", () => {
  describe("mapRecursive", () => {
    it("recursively maps over an array of nested objects", () => {
      const data: Nested<any>[] = [
        { value: 1, children: [{ value: 2 }] },
        { value: 3 },
      ];

      const mappedData = mapRecursive(data, (item) => ({
        ...item,
        value: item.value * 2,
      }));

      expect(mappedData).toEqual([
        { value: 2, children: [{ value: 4 }] },
        { value: 6 },
      ]);
    });
  });

  describe("mapRecursiveForLoop", () => {
    it("maps an array of objects using a for loop", () => {
      const data: Record<string, any>[] = [
        { value: 1, children: [{ value: 2 }] },
        { value: 3 },
      ];

      const mappedData = forLoopRecursive(data, (item) => ({
        ...item,
        value: item.value * 2,
      }));

      expect(mappedData).toEqual([
        { value: 2, children: [{ value: 4 }] },
        { value: 6 },
      ]);
    });
  });

  describe("mapEachRecursive", () => {
    it("recursively maps each item in the given data array", () => {
      const data = [{ value: 1, children: [{ value: 2 }] }, { value: 3 }];

      const mappedData = forEachRecursive(data, (item) => ({
        ...item,
        value: item.value * 2,
      }));

      expect(mappedData).toEqual([
        { value: 2, children: [{ value: 4 }] },
        { value: 6 },
      ]);
    });
  });

  describe("forRecursive", () => {
    it("executes a callback function recursively on each item in an array of objects", () => {
      const data = [{ value: 1, children: [{ value: 2 }] }, { value: 3 }];
      let count = 0;

      forRecursive(data, (item) => {
        count += item.value;
      });

      expect(count).toEqual(6);
    });
  });
});
