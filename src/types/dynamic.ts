import {SupportedApiMethods} from "@/interfaces/api/generics";

export interface DynamicProp {
    [key: string]: Array<{ [key: string]: string }>;
}

export interface DynamicRequest { objKey: string; method: SupportedApiMethods; url: string; payload?: any }
