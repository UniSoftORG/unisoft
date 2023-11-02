import functionsMap, {registerFunc, registerReactFunction} from "@/utils/Functions/useFunctions";
import {simpleDeepClone, mapObjectValues} from "unisoft-utils";

export interface CallbackConfig {
    name: string;
    attributes: Attributes;
}

export type Attributes = {
    [key: string]: any;
};

type FunctionSignature = (params: Attributes) => any;


export function registerFunction(name: string, func: FunctionSignature) {
    functionsMap[name] = func;
}

export function invokeFunctionByName(name: string, attributes: Attributes, inject?: any): any {
    if (!functionsMap[name]) {
        registerFunc(name)
    }
    return functionsMap[name](attributes);
}

export function runFunctionTask(tasks: any, inject?: any) {
    tasks.forEach((task: any) => {
        if(task.name === 'useInterval'){
            functionsMap[task.name](
                task.attributes.watchKeys,
                () => {
                    task.callbacks && task.callbacks.forEach(runFunctionTasks)
                },
                inject,
                task.attributes.delay
            )
        }

        if(task.name === 'setState'){
            console.log(task)
        }
    })
}

export function runFunctionTasks(task: any, inject?: any) {
    const cloneFunction = simpleDeepClone(task)

    const executeTask = (currentTask: any) => {
            const result = invokeFunctionByName(currentTask.name, currentTask.attributes, inject);

            if (currentTask.callbacks && currentTask.callbacks.length) {
                currentTask.callbacks.forEach((callback: any) => {
                    const callbackAttributes = mapObjectValues(callback.attributes, (value: string) => {
                        return value === 'parentReturn' ? result : value
                    })
                    executeTask({...callback, attributes: callbackAttributes});
                });
            }

            return result;
    };

    return executeTask(cloneFunction);
}

export function executeFunctions(functions: any, inject?: any) {
    // const cloneFunction = simpleDeepClone(functions)
    Object.keys(inject).map((value) => {
        return registerReactFunction(value, inject[value])
    })

}

export function invokeCallbacks(result: any, callbackConfigs?: CallbackConfig[]) {
    if (!callbackConfigs) return;
    for (const config of callbackConfigs) {
        const updatedAttributes = { ...config.attributes, result };
        invokeFunctionByName(config.name, updatedAttributes);
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
