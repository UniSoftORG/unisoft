/**
 * Generates the cross join of two arrays.
 *
 * @param {T[]} arr1 - The first array.
 * @param {U[]} arr2 - The second array.
 * @return {[T, U][]} - The cross join of the two arrays.
 */
export const crossJoin = <T, U>(arr1: T[], arr2: U[]): Array<[T, U]> =>
  arr1.flatMap((item1) => arr2.map((item2) => [item1, item2] as [T, U]));
