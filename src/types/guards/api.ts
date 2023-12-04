import { IGenericApiError } from "@/types/request/generics";
import { ApiResponse } from "@/types/request/response";

export const isGenericApiError = (
  result: ApiResponse<any>
): result is ApiResponse<IGenericApiError> => {
  return result.data === undefined && result.message !== undefined;
};
