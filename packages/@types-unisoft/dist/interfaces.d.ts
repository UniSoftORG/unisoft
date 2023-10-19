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
