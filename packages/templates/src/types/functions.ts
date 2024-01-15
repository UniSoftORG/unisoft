import { FunctionNames } from '@/types/uniFunctions';
import { FunctionAttributesMap } from '@/types/uniTypes';
import { Events } from '@/types/events';

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
  attributes?: FunctionAttributesMap[T];
  callbacks?: IFunction<T>[];
}

export type Fu = {};

export interface IUseEffect {
  name: string;
  attributes: {
    watchKeys: string[];
    callbacks: any;
    delay: number;
  };
}

export interface ISetState {
  key: string;
  value: any;
}

export interface IConsoleLog {
  value: any;
}
// export interface IUseEffectReturn {
//     name: string;
//     attributes: Attributes;
// }
