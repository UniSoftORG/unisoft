import { webRequest } from '@/utils/Request/singletonApiRequest';
import { DynamicRequest } from '@/types';

export const createRequest = async (endpoints: DynamicRequest[]) => {
  const webReq = webRequest();

  const resultsArray = await Promise.all(
    endpoints.map(async (endpoint) => {
      const { method, url, payload, objKey } = endpoint;

      if (method && typeof webReq[method] === 'function') {
        try {
          const result = await webReq[method](url, payload);
          return { key: objKey, value: result };
        } catch (error) {
          console.error(`Error in ${method} request to ${url}:`, error);
          return { key: objKey, value: null };
        }
      } else {
        console.error(`Unsupported method: ${method}`);
        return { key: objKey, value: null };
      }
    })
  );

  return Object.fromEntries(resultsArray.map(({ key, value }) => [key, value]));
};
