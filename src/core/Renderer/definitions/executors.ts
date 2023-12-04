import {
  Events,
  FunctionAttributesMap,
  FunctionNames,
  IFunction,
} from "@/types";

export const useFunction = <T extends FunctionNames>(
  name: T,
  attributes: FunctionAttributesMap[T],
  callbacks?: IFunction<T>[]
) => ({
  name,
  attributes,
  callbacks,
});

export const useInterval = <T extends FunctionNames>(
  watchKeys: string[],
  callbacks: IFunction<FunctionNames>[],
  delay: number
): IFunction<FunctionNames.useInterval> => ({
  name: FunctionNames.useInterval,
  attributes: {
    watchKeys,
    callbacks,
    delay,
  },
});

export const useTimeOut = <T extends FunctionNames>(
  watchKeys: string[],
  callbacks: IFunction<FunctionNames>[],
  delay: number
): IFunction<FunctionNames.useTimeOut> => ({
  name: FunctionNames.useTimeOut,
  attributes: {
    watchKeys,
    callbacks,
    delay,
  },
});

export const setState = (
  key: string,
  value: any
): IFunction<FunctionNames.setState> => ({
  name: FunctionNames.setState,
  attributes: {
    key,
    value,
  },
});

export const useModalHook = (
  component: string
): IFunction<FunctionNames.useModalHook> => {
  console.log(component);
  return {
    name: FunctionNames.useModalHook,
    attributes: {
      component,
    },
  };
};

export const createEvent = <T extends Events, F extends FunctionNames>(
  name: T,
  // attributes: FunctionAttributesMap[T],
  callbacks?: IFunction<F>[]
) => ({
  name,
  // attributes,
  callbacks,
});
