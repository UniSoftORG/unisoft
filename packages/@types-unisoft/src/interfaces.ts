export interface Nested<T> {
  [key: string]: T | Nested<T> | undefined;
}

export interface FilterOptions<KeyType extends string = string> {
  initialProperties?: KeyType[];
  additionalProperties?: KeyType[];
  parentKey?: KeyType;
}

export interface Conditional {
  condition: string;
  value: string;
}

export interface ExtractOptions<KeyType extends string = string> {
  additionalProps?: KeyType[];
  recursiveKey?: string;
}

export interface BinaryExpression {
  left: Expression;
  operator: string;
  right: Expression;
}

export interface TernaryExpression {
  condition: Expression;
  trueBranch: Expression;
  falseBranch: Expression;
}

export type Expression = string | BinaryExpression | TernaryExpression;
