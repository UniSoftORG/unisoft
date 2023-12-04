import { Operators } from "@/types";

export const customCondition = (value: string) => `#{${value}}`;

export const ternaryCondition = (
  evaluate:
    | {
        value1: string | number;
        operator?: Operators;
        value2?: string | number;
      }
    | string,
  trueReturn: any,
  falseReturn?: any
) =>
  `#{${
    typeof evaluate === "string"
      ? evaluate
      : `${evaluate.value1} ${evaluate.operator} ${evaluate.value2}`
  } ? ${trueReturn} : ${falseReturn}}`;
