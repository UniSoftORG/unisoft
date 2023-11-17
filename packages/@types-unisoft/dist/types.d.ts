export type MapOption<ValueType = any, BeforeType = any, AfterType = any> = {
    key: string;
    value: ValueType;
    beforeValue?: BeforeType;
    afterValue?: AfterType;
} | string;
export type FlexibleObj<ObjectType = any, KeyType extends string = string> = {
    [key in KeyType]: ObjectType;
};
