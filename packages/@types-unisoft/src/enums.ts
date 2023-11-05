export enum ValueReplacement {
  All,
  After,
  Before,
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