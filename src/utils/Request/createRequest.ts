"use server";
import { DynamicRequest } from "@/types";
import { request } from "@/utils/Request/new/request";

export const createRequest = async (endpoints: DynamicRequest[]) => {
  const resultsArray = await Promise.all(
    endpoints.map(async (endpoint) => {
      const { method, url, payload, objKey } = endpoint;

      try {
        const result = await request(url, payload, method);
        return { key: objKey, value: result };
      } catch (error) {
        console.error(`Error in ${method} request to ${url}:`, error);
        return { key: objKey, value: null };
      }
    })
  );

  return Object.fromEntries(resultsArray.map(({ key, value }) => [key, value]));
};
