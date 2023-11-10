import functionsMap from "@/utils/Functions/useFunctions";
import { runFunction } from "@/utils/Functions/DynamicFunctionLibrary";
import {statesActionsMap, statesMap} from "@/utils/React/Managers/StateManager";

export const setState = (task: any) => {
    // statesMap[task.attributes.key].dispatch(task.attributes.key, task.attributes.value)
console.log(statesActionsMap[task.attributes.key].setState(task.attributes.key, task.attributes.value))
  functionsMap.setState(task.attributes.key, task.attributes.value);
}


export function useEffect(task: any) {
    // console.log('eee')
  functionsMap.useEffect(
      task.attributes.watchKeys,
      () => {
        task.attributes.callbacks.forEach((value: any) => {
            console.log(functionsMap)
        });
      }
  );
}

export function useTimeEffect(task: any) {
  functionsMap.useInterval(
    task.attributes.watchKeys,
    () => {
      task.attributes.callbacks.forEach((value: any) => runFunction(value));
    },
    task.attributes.delay,
  );
}
