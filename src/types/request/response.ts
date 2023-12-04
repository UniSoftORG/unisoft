import { IBreadcrumbs, IHead, IMeta } from "@/types/request/breadCrumbs";
import { IGenericApiError } from "@/types/request/generics";

export interface ApiResponse<Type> extends IGenericApiError {
  data: Type;
  statusCode: number;
  breadCrumbs?: IBreadcrumbs;
  meta?: IMeta;
  head?: IHead;
}
