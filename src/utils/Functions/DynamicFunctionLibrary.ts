import {useFunction} from "@/utils/Functions/useFunctions";

export interface CallbackConfig {
    name: string;
    attributes: Attributes;
}

export type Attributes = {
    [key: string]: any;
};

type FunctionSignature = (params: Attributes) => any;

const functionMap: { [name: string]: FunctionSignature } = {};

export function registerFunction(name: string, func: FunctionSignature) {
    functionMap[name] = func;
}

export function invokeFunctionByName(name: string, attributes: Attributes): any {
    useFunction(name)
    if (!functionMap[name]) throw new Error(`Function ${name} not found`);
    return functionMap[name](attributes);
}

export function invokeCallbacks(result: any, callbackConfigs?: CallbackConfig[]) {
    if (!callbackConfigs) return;
    for (const config of callbackConfigs) {
        const updatedAttributes = { ...config.attributes, result };
        invokeFunctionByName(config.name, updatedAttributes);
    }
}

// Helper to wrap standalone functions
export function wrapWithCallbacks(func: (...args: any[]) => any) {
    return (attributes: Attributes) => {
        const result = func(attributes);
        invokeCallbacks(result, attributes.callbacks);
        return result;
    };
}

// Optional: To automatically register functions from imported modules
export function registerFunctionsFromModule(module: { [key: string]: (...args: any[]) => any }) {
    for (const [name, func] of Object.entries(module)) {
        registerFunction(name, wrapWithCallbacks(func));
    }
}

export function executeFunctionConfigs(functionConfigs: {name: string, [key: string]: any}[]) {
    for (const funcConfig of functionConfigs) {
        const { name, ...attributes } = funcConfig;
        invokeFunctionByName(name, attributes);
    }
}

export function wrapExternalFunction(func: (...args: any[]) => any, paramMapping: (attributes: Attributes) => any[]) {
    return (attributes: Attributes) => {
        const args = paramMapping(attributes);
        const result = func(...args);
        invokeCallbacks(result, attributes.callbacks);
        return result;
    };
}


export function runFunctionTask(task: any) {
    let result = invokeFunctionByName(task.name, task.attributes);

    // Check if there are callbacks and execute them
    if (task.callbacks && task.callbacks.length) {
        task.callbacks.forEach((callback: any) => {
            const callbackAttributes = { ...callback.attributes };

            for (const key in callbackAttributes) {
                if (callbackAttributes[key] === "result") {
                    callbackAttributes[key] = result;
                } else if (callbackAttributes[key].startsWith("result.")) {
                    const splitKey = callbackAttributes[key].split(".")[1];
                    callbackAttributes[key] = result[splitKey];
                }
            }

            invokeFunctionByName(callback.name, callbackAttributes);
        });
    }

    return result;
}
