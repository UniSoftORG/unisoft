import {Operators} from "unisoft";

export const getValueByDotNation = (key: string) => key;
export const getVariable = (key: string) => '${variables.' + {key} + '}'
export const getAttribute = (key: string) => '${passAttributes.' + {key} + '}'
export const getState = (key: string) => '${states.' + {key} + '}'
export const customCondition = (value: string) => `#{${value}}`
export const ternaryCondition = (
    value: string | number,
    operator: Operators,
    compareValue: string | number,
    trueReturn: string | number,
    falseReturn: string | number
) => `#{${value} ${operator} ${compareValue} ? ${trueReturn} : ${falseReturn} }`