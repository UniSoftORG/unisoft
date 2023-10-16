import {SupportedApiMethods} from "@/interfaces/api/generics";

export interface DynamicRequest { objKey: string; method: SupportedApiMethods; url: string; payload?: any }
