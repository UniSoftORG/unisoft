import { SupportedApiMethods } from "@/types/request/generics";
import { Endpoints } from "@/utils/Request/new/endpoints";

export interface DynamicRequest {
  objKey: string;
  method: SupportedApiMethods;
  url: Endpoints;
  payload?: any;
}

export enum Operators {
  NullishCoalescing = "??",
  LogicalOr = "||",
  LogicalAnd = "&&",
  NotStrictEqual = "!==",
  StrictEqual = "===",
  Equal = "==",
  GreaterThan = ">",
  LessThan = "<",
  GreaterThanOrEqual = ">=",
  LessThanOrEqual = "<=",
}
