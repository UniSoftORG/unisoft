import {Operators} from "@/types";

export const customCondition = (value: string) => `#{${value}}`

export const ternaryCondition = (
    evaluate: {
        value1: string,
        operator?: Operators,
        value2?: string
    },
    trueReturn: string | number,
    falseReturn: string | number
) => `#{${evaluate.value1} ${evaluate.operator} ${evaluate.value2} ? ${trueReturn} : ${falseReturn}}`