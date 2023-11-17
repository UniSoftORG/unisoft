import { Attributes } from "../DynamicFunctionLibrary";
//
// export function cyclicIncrement({ number, max = Infinity, min = 0, reset = false, callbacks = [] }: Attributes): Result {
//     const nextNumber = number + 1;
//     const value = reset && nextNumber > max ? min : nextNumber;
//     return { value, min, max };
// }
//
// export const after = ({subject, search, callbacks = []}: Attributes): string => {
//     const pos = subject.indexOf(search);
//     return pos === -1 ? "" : subject.slice(pos + search.length);
// };

export function consoleLog({ value }: Attributes): void {
  console.log(value);
}

// Add any other functions.ts here as needed...
