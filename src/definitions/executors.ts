import {IFunction, IUseEffect} from "@/types/functions";
import {FunctionNames} from "@/types/uniFunctions";
import {FunctionAttributesMap} from "@/types/uniTypes";

export const useFunction = <T extends FunctionNames>(
    name: T,
    attributes: FunctionAttributesMap[T],
    callbacks?: IFunction<T>[]
) => ({
    name,
    attributes,
    callbacks
});


export const useInterval = <T extends FunctionNames>(
    watchKeys: string[],
    callbacks: IFunction<T>[],
    delay: number
): IUseEffect => ({
    name: "useInterval",
    attributes: {
        watchKeys,
        callbacks,
        delay,
    }
});


export const setState = (key: string, value: any): IFunction<FunctionNames.setState> => ({
    name: FunctionNames.setState,
    attributes: {
        key,
        value
    }
})