import {
  IGenericApiError,
  SupportedApiMethods,
} from "@/types/request/generics";
import { ApiResponse } from "@/types/request/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest } from "next";

// Constants
const CONTENT_TYPE = "application/json";
const DEFAULT_LOCALE = "en";

export default class ApiRequest {
  locale: string = DEFAULT_LOCALE;
  token: string | JwtPayload = "";
  sessionId: any = null;
  revalidate: undefined | number = undefined;

  constructor(
    locale?: string,
    token?: string | JwtPayload,
    sessionId?: any,
    revalidate?: boolean
  ) {
    if (locale) this.locale = locale;
    if (token) this.token = token;
    if (sessionId) this.sessionId = sessionId;
    if (revalidate !== undefined) this.revalidate = 0;
  }

  private handleError = (error: IGenericApiError | any) => {
    const customError = {
      message: error.message,
      errors: error.errors,
    };
    return Promise.reject(customError);
  };

  private requestHeaders = async (
    withoutAsyncStorage?: boolean
  ): Promise<Headers> => {
    try {
      if (!withoutAsyncStorage) {
        const getCookies = (await import("next/headers")).cookies();
        const decode = (await import("next-auth/jwt")).decode;

        // const getCookies = cookies();
        const tokens = getCookies.get(
          `${
            process.env.NODE_ENV === "production" ? "__Secure-" : ""
          }next-auth.session-token`
        );

        if (tokens?.value) {
          const decoded = await decode({
            token: tokens?.value,
            secret: process.env.NEXTAUTH_SECRET ?? "",
          });

          if (decoded) {
            this.token = decoded.token as string;
          } else {
            throw new Error("JWT decode failed");
          }
        }

        this.sessionId = getCookies.get("sessionId") ?? null;
        this.locale = getCookies.get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
      }

      return new Headers({
        "content-type": CONTENT_TYPE,
        Authorization: this.token
          ? `Bearer ${jwt.verify(
              this.token as string,
              process.env.JWT_DOUBLE_SECRET ?? ""
            )}`
          : "",
        "X-Lang": this.locale,
        sessionId:
          typeof this.sessionId === "string"
            ? this.sessionId
            : this.sessionId?.value ?? "",
        "X-UNI": process.env.NEXT_UNITOKEN ?? "",
        accept: CONTENT_TYPE,
      });
    } catch (error) {
      return this.handleError(error);
    }
  };

  private static async getResponse<Type>(
    response: Response
  ): Promise<ApiResponse<Type>> {
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
    withoutAsyncStorage?: boolean
  ): Promise<ApiResponse<Type>> {
    try {
      const headers = await this.requestHeaders(withoutAsyncStorage);
      const response = await fetch(process.env.NEXT_API_URL + endpoint, {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined,
        next: {
          revalidate: 0,
          // ...(this.revalidate !== undefined && {revalidate: 0}),
        },
      });

      return await ApiRequest.getResponse<Type>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async get<Type>(
    endpoint: string,
    withoutAsyncStorage?: boolean
  ): Promise<ApiResponse<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.GET,
      endpoint,
      undefined,
      withoutAsyncStorage
    );
  }

  async post<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
    withoutAsyncStorage?: boolean
  ): Promise<ApiResponse<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.POST,
      endpoint,
      payload,
      withoutAsyncStorage
    );
  }

  async put<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
    withoutAsyncStorage?: boolean
  ): Promise<ApiResponse<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.PUT,
      endpoint,
      payload,
      withoutAsyncStorage
    );
  }

  async patch<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
    withoutAsyncStorage?: boolean
  ): Promise<ApiResponse<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.PATCH,
      endpoint,
      payload,
      withoutAsyncStorage
    );
  }

  async delete<Type>(
    endpoint: string,
    payload: Record<string, unknown> | any,
    withoutAsyncStorage?: boolean
  ): Promise<ApiResponse<Type>> {
    return await this.createRequest<Type>(
      SupportedApiMethods.DELETE,
      endpoint,
      payload,
      withoutAsyncStorage
    );
  }
}

export const apiRequest = (revalidate?: boolean) => {
  return new ApiRequest();
};

export const clientRequest = async (
  req: NextApiRequest,
  revalidate?: boolean
): Promise<ApiRequest> => {
  const getToken = (await import("next-auth/jwt")).getToken;

  const encryptedToken = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return new ApiRequest(
    req.cookies["NEXT_LOCALE"],
    encryptedToken ? encryptedToken.token : undefined,
    req.cookies["sessionId"],
    revalidate
  );
};
