import functionsMap, {
  registerFunc,
  registerReactHook,
} from '@/utils/Functions/useFunctions';
import { mapObjectValues, simpleDeepClone } from 'unisoft-utils';
import { setState, useTimeEffect } from '@/utils/React/Initiator';
import { startsWith } from 'lodash';

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
  inject?: any
): any {
  if (name) {
    if (!functionsMap[name] && name) {
      registerFunc(name);
    }
    return functionsMap[name](attributes);
  }
}

export function runMappedFunctions(uuid: string, tasks: any) {
  tasks.forEach((task: any) => {
    if (
      startsWith(task.name, 'useInterval') &&
      functionsMap[task.name + uuid.replaceAll('-', '')]
    ) {
      useTimeEffect(task, uuid);
      return;
    }
    return runFunction(task, uuid);
  });
}

export function runFunction(task: any, uuid: string) {
  const executeTask = (currentTask: any) => {
    if (startsWith(currentTask.name, 'setState')) {
      setState(currentTask, uuid);
    }
    // const result = startsWith(currentTask.name, 'setState')
    //   ? setState(currentTask, uuid)
    //   : invokeFunctionByName(currentTask.name, currentTask.attributes);
    //
    // if (currentTask.callbacks && currentTask.callbacks.length) {
    //   currentTask.callbacks.forEach((callback: any) => {
    //     const callbackAttributes = mapObjectValues(
    //       callback.attributes,
    //       (value: string) => {
    //         return value === 'parentReturn' ? result : value;
    //       }
    //     );
    //
    //     executeTask({ ...callback, attributes: callbackAttributes });
    //   });
    // }
    //
    // return result;
  };

  return executeTask(simpleDeepClone(task));
}

export function importReactHooks(name: string, injectHook: any) {
  injectHook
    ? Object.keys(injectHook).map((value) => {
        return registerReactHook(value, injectHook[value]);
      })
    : undefined;
}

export function invokeCallbacks(
  result: any,
  callbackConfigs?: CallbackConfig[]
) {
  if (!callbackConfigs) return;
  for (const config of callbackConfigs) {
    const updatedAttributes = { ...config.attributes, result };
    invokeFunctionByName(config.name, updatedAttributes);
  }
}

export function wrapExternalFunction(
  func: (...args: any[]) => any,
  paramMapping: (attributes: Attributes) => any[]
) {
  return (attributes: Attributes) => {
    const args = paramMapping(attributes);
    const result = func(...args);
    invokeCallbacks(result, attributes.callbacks);
    return result;
  };
}
