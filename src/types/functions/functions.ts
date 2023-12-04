import { FunctionAttributesMap, FunctionNames } from "@/types";
import { Events } from "./events";

export interface IFunction<T extends FunctionNames> {
  name: T;
  attributes: FunctionAttributesMap[T];
  callbacks?: IFunction<T>[];
}

export interface IEvent<T extends Events> {
  name: T;
  callbacks?: IFunction<FunctionNames>[];
}

export interface ISetState {
  key: string;
  value: any;
}

export interface IModalHook {
  component: string;
}

export interface IConsoleLog {
  value: any;
}

export interface IUseInterval {
  watchKeys?: string[];
  callbacks?: IFunction<FunctionNames>[];
  delay: number;
}
