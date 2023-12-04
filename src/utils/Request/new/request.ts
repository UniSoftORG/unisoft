"use server";
import { SupportedApiMethods } from "@/types/request/generics";
import { Endpoints } from "@/utils/Request/new/endpoints";
import { requestHeaders } from "./headers";

export const request = async <TData = any, TPayload = any>(
  url: Endpoints,
  payload?: TPayload,
  method: SupportedApiMethods = SupportedApiMethods.GET,
  withoutAsyncStorage?: boolean
): Promise<{
  data: TData;
  statusCode: number;
}> => {
  const response = await fetch(process.env.NEXT_API_URL + url, {
    method: method,
    ...(method !== SupportedApiMethods.GET && {
      body: (payload as TPayload) ? JSON.stringify(payload) : undefined,
    }),
    headers: await requestHeaders(withoutAsyncStorage),
    next: { revalidate: 120 },
  });

  const data = await response.json();

  return {
    data: data.data,
    statusCode: response.status,
  };
};

export const get = async <TData = any>(url: Endpoints) => {
  return await request<TData>(url);
};

export const post = async <TData extends any, TPayload>(
  url: Endpoints,
  payload?: TPayload,
  withoutAsyncStorage?: boolean
) => {
  return await request<TData, TPayload>(
    url,
    payload,
    SupportedApiMethods.POST,
    withoutAsyncStorage
  );
};
