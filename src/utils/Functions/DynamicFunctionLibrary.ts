import functionsMap, {
  registerFunc,
  registerReactHook,
} from "@/utils/Functions/useFunctions";
import { simpleDeepClone, mapObjectValues } from "unisoft-utils";
import { setState, useTimeEffect } from "@/utils/React/Initiator";

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

export function invokeFunctionByName(
  name: string,
  attributes: Attributes,
  inject?: any,
): any {
  if (name) {
    if (!functionsMap[name] && name) {
      registerFunc(name);
    }
    return functionsMap[name](attributes);
  }
}

export function runMappedFunctions(tasks: any) {
  tasks.forEach((task: any) => {
    if (task.name === "useInterval" && functionsMap[task.name]) {
      useTimeEffect(task);
      return;
    }
    return runFunction(task);
  });
}

export function runFunction(task: any) {
  const executeTask = (currentTask: any) => {
    const result =
      currentTask.name === "setState"
        ? setState(currentTask)
        : invokeFunctionByName(currentTask.name, currentTask.attributes);

    if (currentTask.callbacks && currentTask.callbacks.length) {
      currentTask.callbacks.forEach((callback: any) => {
        const callbackAttributes = mapObjectValues(
          callback.attributes,
          (value: string) => {
            return value === "parentReturn" ? result : value;
          },
        );

        executeTask({ ...callback, attributes: callbackAttributes });
      });
    }

    return result;
  };

  return executeTask(simpleDeepClone(task));
}

export function importReactHooks(injectHook: any) {
  Object.keys(injectHook).map((value) => {
    return registerReactHook(value, injectHook[value]);
  });
}

export function invokeCallbacks(
  result: any,
  callbackConfigs?: CallbackConfig[],
) {
  if (!callbackConfigs) return;
  for (const config of callbackConfigs) {
    const updatedAttributes = { ...config.attributes, result };
    invokeFunctionByName(config.name, updatedAttributes);
  }
}

export function wrapExternalFunction(
  func: (...args: any[]) => any,
  paramMapping: (attributes: Attributes) => any[],
) {
  return (attributes: Attributes) => {
    const args = paramMapping(attributes);
    const result = func(...args);
    invokeCallbacks(result, attributes.callbacks);
    return result;
  };
}
