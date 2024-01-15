import { ApiResponse, isGenericApiError } from '@/types';

export function ApiError<T>(res: ApiResponse<T>) {
  if (isGenericApiError(res)) {
    throw new Error(res.message);
  } else {
    throw new Error("Authentication failed!");
  }
}