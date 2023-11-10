import { Operators } from '@/types'

export const customCondition = (value: string) => `#{${value}}`

export const ternaryCondition = (
  evaluate: {
    value1: string | number | object | unknown
    operator?: Operators
    value2?: string | number | object | unknown
  },
  trueReturn: string | number,
  falseReturn: string | number
) =>
  `#{${evaluate.value1} ${evaluate.operator} ${evaluate.value2} ? ${trueReturn} : ${falseReturn}}`
