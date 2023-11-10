import {IFunction, IUseEffect} from "@/types/functions";
import {FunctionNames} from "@/types/uniFunctions";
import {FunctionAttributesMap} from "@/types/uniTypes";
import {Events} from "@/types/events";
import {statesMap} from "@/utils/React/Managers/StateManager";

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

export const useEffect = <T extends FunctionNames>(
    watchKeys: string[],
    callbacks: IFunction<T>[],
): IUseEffect => ({
    name: "useEffect",
    attributes: {
        watchKeys,
        callbacks
    }
});


export const setState = (key: string, value: any): IFunction<FunctionNames.setState> => {
    return {
        name: FunctionNames.setState,
            attributes: {
        key,
            value
    }
    }
}

export const createEvent = <T extends Events, F extends FunctionNames>(
    name: T,
    // attributes: FunctionAttributesMap[T],
    callbacks?: IFunction<F>[]
) => ({
    name,
    // attributes,
    callbacks
});