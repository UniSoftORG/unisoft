export type Attributes = {
    [key: string]: any;
};

export type FunctionSignature = (params: Attributes) => any;

export interface IFunction {
    name: string;
    attributes: Attributes;
    callbacks?: IFunction[]
}

export interface IUseEffect {
    name: string;
    attributes: {
        watchKeys: string[]
        executeFn: IFunction[]
        delay: number
    }
}

export interface ISetState {
    key: string;
    value: any
}
// export interface IUseEffectReturn {
//     name: string;
//     attributes: Attributes;
// }
