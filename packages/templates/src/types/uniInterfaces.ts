import {
  ExtractOptions,
  FilterOptions,
  FlexibleObj,
  MapOption,
  Nested,
  ValueReplacement,
} from 'unisoft';

// Generated TypeScript definitions
// Enums and Interfaces uni-imports from checkers\array.ts

export interface isAccessibleAttributes {
  arr: unknown; // Default: null
}

export interface hasKeyAttributes {
  arr: Record<string, unknown> | null | undefined; // Default: null
  key: string; // Default: null
}

export interface hasAnyKeyAttributes {
  arr: Record<string, unknown> | null | undefined; // Default: null
  keys: string[]; // Default: null
}

// Enums and Interfaces uni-imports from checkers\string.ts

export interface containsAnyAttributes {
  subject: string; // Default: null
  search: string | string[]; // Default: null
}

export interface containsAllAttributes {
  subject: string; // Default: null
  search: string[]; // Default: null
}

export interface isUrlAttributes {
  subject: string; // Default: null
}

export interface isUuidAttributes {
  subject: string; // Default: null
}

export interface isUlidAttributes {
  subject: string; // Default: null
}

export interface isAttributes {
  subject: string; // Default: null
  pattern: string; // Default: null
}

export interface isAsciiAttributes {
  subject: string; // Default: null
}

export interface isJsonAttributes {
  subject: string; // Default: null
}

// Enums and Interfaces uni-imports from collectors\object.ts

export interface efficientPluckAttributes<T, K extends keyof T> {
  obj: T; // Default: null
  keys: K[]; // Default: null
}

// Enums and Interfaces uni-imports from collectors\recursive.ts

export interface recursiveKeyCollectionAttributes<
  ObjectType,
  KeyType extends string = string,
> {
  obj: FlexibleObj<ObjectType, KeyType>; // Default: null
  collectKeys: KeyType | KeyType[]; // Default: null
  childrenKey: KeyType; // Default: "children" as KeyType
  options?: ExtractOptions<KeyType>; // Default: null
}

// Enums and Interfaces uni-imports from creators\object.ts

export interface createObjectFromMapOptionsAttributes {
  mapOptions: MapOption[]; // Default: null
}

// Enums and Interfaces uni-imports from creators\recursive.ts

export interface flattenAttributes<T> {
  arr: any[]; // Default: null
}

export interface deepCloneAttributes<T> {
  obj: T; // Default: null
}

export interface simpleDeepCloneAttributes<T> {
  obj: T; // Default: null
}

// Enums and Interfaces uni-imports from creators\string.ts

export interface generateRandomPasswordAttributes {
  length: number; // Default: null
}

export interface generateRandomStringAttributes {
  length: number; // Default: null
  allowedChars: unknown; // Default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
}

// Enums and Interfaces uni-imports from evaluators\advanced.ts

export interface isNullishAttributes {
  value: any; // Default: null
}

export interface splitByOperatorAttributes {
  str: string; // Default: null
  operator: string; // Default: null
}

export interface findMatchingColonAttributes {
  str: string; // Default: null
}

export interface parseExpressionAttributes {
  str: string; // Default: null
}

export interface evaluateExpressionAttributes {
  expr: any; // Default: null
}

export interface evaluateAttributes {
  str: string; // Default: null
}

// Enums and Interfaces uni-imports from evaluators\array.ts

export interface doesKeyExistAttributes {
  obj: Record<string, unknown>; // Default: null
  key: string; // Default: null
}

export interface isAssocAttributes {
  arr: object | null; // Default: null
}

export interface isArrayAttributes {
  arr: unknown[]; // Default: null
}

// Enums and Interfaces uni-imports from evaluators\condition.ts

// Enums and Interfaces uni-imports from evaluators\recursive.ts

export interface findMostFrequentAttributes {
  data: (string | number)[]; // Default: null
}

// Enums and Interfaces uni-imports from evaluators\string.ts

export interface evaluateReplacementAttributes {
  values: {
    oldValue: string;
    newValue: string;
  }; // Default: null
  condition?: ValueReplacement; // Default: null
  noSpaceBetween?: boolean; // Default: null
}

// Enums and Interfaces uni-imports from filters\array.ts

export interface mapToKeysAttributes<T, U> {
  arr: T[]; // Default: null
  fn: (value: T) => Record<string, U>; // Default: null
}

export interface filterByKeysAttributes<T> {
  obj: Record<string, T>; // Default: null
  keys: string[]; // Default: null
}

export interface omitByKeysAttributes<T> {
  obj: Record<string, T>; // Default: null
  keys: string[]; // Default: null
}

export interface removeValueAttributes<T> {
  arr: T[]; // Default: null
  value: T; // Default: null
}

export interface randomAttributes<T> {
  arr: T[]; // Default: null
}

export interface shuffleArrayAttributes<T> {
  arr: T[]; // Default: null
}

export interface sortArrayAttributes<T> {
  arr: T[]; // Default: null
}

export interface sortArrayDescAttributes<T> {
  arr: T[]; // Default: null
}

export interface sortRecursiveAscAttributes {
  arr: any; // Default: null
}

export interface sortRecursiveDescAttributes {
  arr: any; // Default: null
}

export interface filterArrayAttributes<T> {
  arr: T[]; // Default: null
  fn: (value: T) => boolean; // Default: null
}

export interface filterNotNullAttributes<T> {
  arr: T[]; // Default: null
}

// Enums and Interfaces uni-imports from filters\object.ts

export interface filterObjectByKeyAttributes<T extends string, K> {
  object: Record<T, K>; // Default: null
  keys: T[]; // Default: null
}

// Enums and Interfaces uni-imports from filters\recursive.ts

export interface sanitizeObjectKeysRecursiveAttributes<
  T extends Record<any, any>,
> {
  allKeys: T; // Default: null
  receiveKeys: any; // Default: null
  options?: FilterOptions; // Default: null
}

// Enums and Interfaces uni-imports from getters\array.ts

export interface firstAttributes<T> {
  arr: T[]; // Default: null
  fn: (value: T) => boolean; // Default: null
}

export interface getAttributes<T, K extends string | number | symbol> {
  obj: Record<K, T>; // Default: null
  path: string; // Default: null
  defaultValue?: T; // Default: null
}

export interface lastAttributes<T> {
  arr: T[]; // Default: null
  fn: (value: T) => boolean; // Default: null
}

export interface keyByAttributes<T> {
  arr: T[]; // Default: null
  key: keyof T; // Default: null
}

export interface pluckAttributes<T, K extends keyof T> {
  arr: T[]; // Default: null
  key: K; // Default: null
}

// Enums and Interfaces uni-imports from getters\object.ts

export interface getValueAttributes<T> {
  obj: T; // Default: null
  path: string; // Default: null
}

// Enums and Interfaces uni-imports from getters\recursive.ts

export interface findObjectByValueAttributes<T extends Record<string, any>> {
  data: T[]; // Default: null
  value: any; // Default: null
  key: keyof T; // Default: null
  parent?: T; // Default: null
  nestedKey: keyof T; // Default: "children"
}

// Enums and Interfaces uni-imports from getters\string.ts

export interface afterAttributes {
  subject: string; // Default: null
  search: string; // Default: null
}

export interface afterLastAttributes {
  subject: string; // Default: null
  search: string; // Default: null
}

export interface beforeAttributes {
  subject: string; // Default: null
  search: string; // Default: null
}

export interface beforeLastAttributes {
  subject: string; // Default: null
  search: string; // Default: null
}

export interface betweenAttributes {
  subject: string; // Default: null
  start: string; // Default: null
  end: string; // Default: null
}

export interface substrAttributes {
  subject: string; // Default: null
  start: number; // Default: null
  length?: number; // Default: null
}

export interface wordCountAttributes {
  subject: string; // Default: null
}

export interface ucsplitAttributes {
  subject: string; // Default: null
}

export interface substrCountAttributes {
  subject: string; // Default: null
  search: string; // Default: null
}

// Enums and Interfaces uni-imports from helpers\array.ts

export interface crossJoinAttributes<T, U> {
  arr1: T[]; // Default: null
  arr2: U[]; // Default: null
}

// Enums and Interfaces uni-imports from helpers\condition.ts

export interface createConditionAttributes {
  firstParam: any; // Default: null
  operator: string; // Default: null
  secondParam: any; // Default: null
}

// Enums and Interfaces uni-imports from helpers\object.ts

export interface mapObjectValuesAttributes<T, U> {
  obj: Record<string, T>; // Default: null
  mapperFn: (value: T) => U; // Default: null
}

export interface transformEntriesAttributes<T> {
  input: { [key: string]: any }; // Default: null
  transformer: (key: string, value: any) => T; // Default: null
}

export interface mapArrayValuesAttributes<T, U> {
  values: T[]; // Default: null
  mapperFn: (value: T) => U; // Default: null
}

// Enums and Interfaces uni-imports from helpers\recursive.ts

export interface mapRecursiveAttributes<T extends Nested<T>> {
  data: T[]; // Default: null
  mapperFn: (value: T, key?: any) => T; // Default: null
  nestedKey: string; // Default: "children"
}

export interface forRecursiveAttributes<T extends Record<string, any>> {
  data: T[]; // Default: null
  callback: (item: T, index: number, parent?: T) => Promise<any> | any; // Default: null
  nestedKey: keyof T; // Default: "children"
  parent?: T; // Default: null
}

export interface forEachRecursiveAttributes<T extends Record<string, any>> {
  data: T[]; // Default: null
  mapperFn: (component: T) => T; // Default: null
  nestedKey: string; // Default: "children"
}

export interface forLoopRecursiveAttributes<T extends Record<string, any>> {
  data: T[]; // Default: null
  mapperFn: (component: T) => T; // Default: null
  nestedKey: string; // Default: "children"
}

export interface transformObjectAttributes {
  obj: any; // Default: null
  shouldTransformByKey: string; // Default: null
  copyKeys: string[]; // Default: null
  parent?: any; // Default: null
}

// Enums and Interfaces uni-imports from setters\array.ts

export interface addValueToArrayAtIndexAttributes<T> {
  arr: T[]; // Default: null
  value: T; // Default: null
  index: number; // Default: null
}

export interface removeValueFromArrayAtIndexAttributes<T> {
  arr: T[]; // Default: null
  index: number; // Default: null
}

export interface prependValueToArrayAttributes<T> {
  arr: T[]; // Default: null
  value: T; // Default: null
}

export interface prependObjectKeysWithAttributes<T> {
  object: Record<string, T>; // Default: null
  prefix: string; // Default: null
}

export interface setValueAtPathInObjectAttributes<T> {
  object: T; // Default: null
  path: string; // Default: null
  value: unknown; // Default: null
}

export interface joinArrayElementsAttributes<T> {
  arr: T[]; // Default: null
  separator: string; // Default: null
}

// Enums and Interfaces uni-imports from setters\object.ts

export interface assignPropAttributes<T, KeyType extends string> {
  target: Record<KeyType, T | undefined>; // Default: null
  propName: KeyType; // Default: null
  source: Record<KeyType, T>; // Default: null
}

// Enums and Interfaces uni-imports from setters\recursive.ts

export interface setNestedValueAttributes<T> {
  obj: T; // Default: null
  keyPath: (string | number)[]; // Default: null
  value: any; // Default: null
}

export interface setByDotNotationAttributes<
  T,
  K extends keyof any = keyof any,
> {
  obj: T; // Default: null
  path: string; // Default: null
  value: K; // Default: null
}

// Enums and Interfaces uni-imports from setters\string.ts

export interface addBeforeAttributes {
  subject: string; // Default: null
  valueToAdd: string; // Default: null
  matchAfter?: string; // Default: null
  notSpaceBetween: boolean; // Default: false
}

export interface addAfterAttributes {
  subject: string; // Default: null
  valueToAdd: string; // Default: null
  matchBefore?: string; // Default: null
  notSpaceBetween: boolean; // Default: false
}

export interface replaceBetweenAttributes {
  subject: string; // Default: null
  valueToReplace: string; // Default: null
  startMatch: string; // Default: null
  endMatch: string; // Default: null
}

export interface maskAttributes {
  subject: string; // Default: null
  start: number; // Default: null
  length: number; // Default: null
  maskChar: string; // Default: "*"
}

export interface replaceArrayAttributes {
  subject: string; // Default: null
  search: string; // Default: null
  replace: any[]; // Default: null
}

export interface substrReplaceAttributes {
  subject: string; // Default: null
  replacement: string; // Default: null
  start: number; // Default: null
  length: number; // Default: null
}

export interface processTemplateStringsAttributes {
  input: string; // Default: null
  callback: (value: string) => string; // Default: null
  start: string; // Default: null
  end: string; // Default: null
}

// Enums and Interfaces uni-imports from transformers\array.ts

export interface arrayToObjectAttributes<T> {
  arr: T[]; // Default: null
  keyExtractor: (item: T) => string; // Default: null
}

export interface collapseAttributes<T> {
  arr: T[][]; // Default: null
}

export interface separateKeysAndValuesAttributes<T> {
  obj: Record<string, T>; // Default: null
}

export interface createQueryStringAttributes {
  params: Record<string, string | number | boolean>; // Default: null
}

export interface convertArrayToClassStringAttributes {
  arr: string[]; // Default: null
}

export interface convertObjectToCssStringAttributes {
  styles: {
    [key: string]: string | number;
  }; // Default: null
}

export interface undotAttributes {
  arr: { [key: string]: any }; // Default: null
}

export interface ensureArrayAttributes<T> {
  value: T | T[]; // Default: null
}

// Enums and Interfaces uni-imports from transformers\object.ts

export interface replaceDynamicTargetsAttributes<T> {
  obj: T; // Default: null
  targets: string[]; // Default: null
}

export interface mergeObjectsAttributes {
  oldProps: any; // Default: null
  newProps: any; // Default: null
}

export interface deepMergeAttributes {
  target: Record<string, any>; // Default: null
  sources: Record<string, any>[]; // Default: null
}

export interface objectToArrayAttributes<T> {
  obj: Record<string, T>; // Default: null
  keys?: string[]; // Default: null
}

export interface excludeKeysAttributes<
  T extends Record<string, any>,
  K extends keyof T,
> {
  obj: T; // Default: null
  keysToExclude: K[]; // Default: null
}

// Enums and Interfaces uni-imports from transformers\string.ts

export interface resolveTemplateStringAttributes {
  str: string; // Default: null
  obj: any; // Default: null
}

export interface limitAttributes {
  subject: string; // Default: null
  limit: number; // Default: 100
  end: string; // Default: "..."
}

export interface lowerAttributes {
  subject: string; // Default: null
}

export interface upperAttributes {
  subject: string; // Default: null
}

export interface reverseAttributes {
  subject: string; // Default: null
}

export interface slugAttributes {
  subject: string; // Default: null
  separator: string; // Default: "-"
}

export interface studlyAttributes {
  subject: string; // Default: null
}

export interface titleAttributes {
  subject: string; // Default: null
}

export interface swapAttributes {
  subject: string; // Default: null
}

export interface snakeAttributes {
  subject: string; // Default: null
}

export interface squishAttributes {
  subject: string; // Default: null
}

export interface headlineAttributes {
  subject: string; // Default: null
}

export interface replaceStartAttributes {
  subject: string; // Default: null
  search: string; // Default: null
  replacement: string; // Default: null
}

export interface replaceEndAttributes {
  subject: string; // Default: null
  search: string; // Default: null
  replacement: string; // Default: null
}

export interface replaceFirstAttributes {
  subject: string; // Default: null
  search: string; // Default: null
  replace: string; // Default: null
}

export interface replaceLastAttributes {
  subject: string; // Default: null
  search: string; // Default: null
  replace: string; // Default: null
}

export interface excerptAttributes {
  subject: string; // Default: null
  length: number; // Default: 100
  end: string; // Default: "..."
}

export interface finishAttributes {
  subject: string; // Default: null
  cap: string; // Default: null
}

export interface wordWrapAttributes {
  subject: string; // Default: null
  width: number; // Default: null
  breakChar: string; // Default: "\n"
}

export interface strWrapAttributes {
  subject: string; // Default: null
  width: number; // Default: null
}
