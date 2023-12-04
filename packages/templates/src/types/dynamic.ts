import { SupportedApiMethods } from '@/types/interfaces/api/generics';

export interface DynamicProp {
  [key: string]: Array<{ [key: string]: string }>;
}

export interface DynamicRequest {
  objKey: string;
  method: SupportedApiMethods;
  url: string;
  payload?: any;
}

export enum Operators {
  NullishCoalescing = '??',
  LogicalOr = '||',
  LogicalAnd = '&&',
  NotStrictEqual = '!==',
  StrictEqual = '===',
  Equal = '==',
  GreaterThan = '>',
  LessThan = '<',
  GreaterThanOrEqual = '>=',
  LessThanOrEqual = '<=',
}
