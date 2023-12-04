"use server";
import { ILoginResponse, IRegisterRequest } from "@/types";
import { isGenericApiError } from "@/types/guards/api";
import { Endpoints } from "@/utils/Request/new/endpoints";
import { post } from "@/utils/Request/new/request";
import { cookies, headers } from "next/headers";

export const laravelSession = async () => {
  const header = headers();
  const cookie = cookies();

  const request = await post<unknown | any, unknown>(Endpoints.session, {
    client: header,
  });

  if (
    !isGenericApiError(request) &&
    cookie.get("sessionId") !== request.data.session_id
  ) {
    cookie.set("sessionId", request.data.session_id);
  }

  return request;
};

export const authenticate = async (
  username: string,
  password: string,
  sessionId: string
) => {
  return await post<ILoginResponse, unknown>(
    Endpoints.login,
    { username, password, sessionId },
    true
  );
};

export const verifyEmail = async (code: string) => {
  return await post<unknown, unknown>(Endpoints.verify, { code });
};

export const signUp = async (params: IRegisterRequest) => {
  return await post<unknown, unknown>(Endpoints.register, params);
};

export const passwordReset = async (params: { email: string }) => {
  return await post<unknown, unknown>(Endpoints.requestPasswordReset, params);
};

export const verifyPasswordReset = async (code: string) => {
  return await post<unknown, unknown>(Endpoints.verifyPasswordCode, { code });
};

export const verifyTwoFactorCode = async (code: string, sessionId: string) => {
  return await post<ILoginResponse, unknown>(
    Endpoints.twoFactor,
    { code, sessionId },
    true
  );
};

export const verifyTwoFactorURLCode = async (
  code: string,
  sessionId: string
) => {
  return await post<ILoginResponse, unknown>(
    Endpoints.twoFactorURL,
    { code, sessionId },
    true
  );
};

export const logOut = async () => {
  return await post<unknown, unknown>(Endpoints.logout, "");
};
