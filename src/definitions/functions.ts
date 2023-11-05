import {ISetState, IUseEffect} from "@/types/functions";
import {FunctionNames} from "@/types/uniFunctionNames";
import {FunctionAttributesMap} from "@/types/utilsTypes";

export const useUniFunction = <T extends FunctionNames>(
    name: T,
    attributes: FunctionAttributesMap[T]
) => ({
    name,
    attributes,
});


export const useInterval = <T extends FunctionNames[]>(
    watchKeys: string[],
    executeFn: { name: T[number], attributes: FunctionAttributesMap[T[number]] }[],
    delay: number
): IUseEffect => ({
    name: "useInterval",
    attributes: {
        watchKeys,
        executeFn,
        delay,
    }
});


export const setState = (key: string, value: any): { name: FunctionNames.setState, attributes: ISetState } => ({
    name: FunctionNames.setState,
    attributes: {
        key,
        value
    }
})