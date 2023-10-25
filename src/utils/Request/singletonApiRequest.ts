import {
  ApiResult,
  IGenericApiError,
  SupportedApiMethods,
} from "@/interfaces/api/generics";

export default class SingletonApiRequest {
  revalidate: undefined | number = undefined;

  constructor(revalidate?: number) {
    revalidate ? (this.revalidate = revalidate) : (this.revalidate = 0);
  }

  public static getSingleton(revalidate?: number): SingletonApiRequest {
    return new SingletonApiRequest(revalidate);
  }

  private handleError = (error: IGenericApiError | any) => {
    const customError = {
      message: error.message,
      errors: error.errors,
    };
    return Promise.reject(customError);
  };

  private requestHeaders = async (): Promise<Headers> => {
    return new Headers({
      "content-type": "application/json",
      "X-UNI": process.env.NEXT_UNITOKEN ?? "",
      accept: "application/json",
    });
  };

  private static async getResponse<Type>(
    response: Response,
  ): Promise<ApiResult<Type>> {
    const json = await response.json();

    if (response.status >= 400) {
      return {
        data: undefined as Type,
        statusCode: response.status,
        message: json.message,
        errors: json.errors ?? {},
      };
    } else {
      return {
        data: json.data,
        breadCrumbs: json.breadcrumbs,
        statusCode: response.status,
        meta: json.meta,
        head: json.head,
      };
    }
  }

  private async createRequest<Type>(
    method: SupportedApiMethods,
    endpoint: string,
    payload?: Record<string, unknown>,
  ): Promise<ApiResult<Type>> {
    try {
      const headers = await this.requestHeaders();
      const response = await fetch(process.env.NEXT_API_URL + endpoint, {
        method: method.toUpperCase(),
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined,
        next: {
          revalidate: 0,
        },
      });

      return await SingletonApiRequest.getResponse<Type>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async get<Type>(endpoint: string): Promise<ApiResult<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.GET,
      endpoint,
      undefined,
    );
  }

  async post<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
  ): Promise<ApiResult<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.POST,
      endpoint,
      payload,
    );
  }

  async put<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
  ): Promise<ApiResult<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.PUT,
      endpoint,
      payload,
    );
  }

  async patch<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
  ): Promise<ApiResult<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.PATCH,
      endpoint,
      payload,
    );
  }

  async delete<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
  ): Promise<ApiResult<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.DELETE,
      endpoint,
      payload,
    );
  }
}

export const webRequest = (revalidate?: number) => {
  return SingletonApiRequest.getSingleton(revalidate);
};
