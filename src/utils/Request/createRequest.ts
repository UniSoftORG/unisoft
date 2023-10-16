import {webRequest} from "@/utils/Request/singletonApiRequest";
import {DynamicRequest} from "@/types";

export const createRequest = async (endpoints: DynamicRequest[]) => {
    const webReq = webRequest();

    const resultsArray = await Promise.all(endpoints.map(async (endpoint) => {
        const {method, url, payload} = endpoint;
        const mappedMethod = endpoint.method;

        if (mappedMethod && typeof webReq[mappedMethod] === 'function') {
            const result = await webReq[mappedMethod](url, payload);
            return {key: endpoint.objKey, value: result};
        } else {
            return Promise.reject(new Error(`Unsupported method: ${method}`));
        }
    }));

    return Object.fromEntries(
        resultsArray.map(({key, value}) => [key, value])
    );
};

