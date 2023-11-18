import { Events } from "@/types/events";
import { FunctionNames } from "@/types/uniFunctions";
import { FunctionAttributesMap } from "@/types/uniTypes";
import { ReactHooks } from '@/types/react';

export type Attributes = {
  [key: string]: any;
};

export type FunctionSignature = (params: Attributes) => any;

export interface IEvents<T extends Events, F extends FunctionNames> {
  name: T;
  callbacks?: IFunction<F>[];
}

export interface IFunction<T extends FunctionNames> {
  name: T;
  attributes: FunctionAttributesMap[T];
  callbacks?: IFunction<T>[];
}

export interface IEvent<T extends Events> {
  name: T;
  callbacks?: IFunction<FunctionNames>[];
}

export type Fu = {};

export interface IUseEffect {
  name: FunctionNames;
  attributes: {
    watchKeys?: string[];
    callbacks?: any;
    delay?: number;
  };
}

export interface ISetState {
  key: string;
  value: any;
}

export interface IConsoleLog {
  value: any;
}

export interface IUseInterval {
  watchKeys?: string[];
  callbacks?: IFunction<FunctionNames>[];
  delay: number;
}
// export interface IUseEffectReturn {
//     name: string;
//     attributes: Attributes;
// }
