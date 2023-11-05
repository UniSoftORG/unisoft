import functionsMap from "@/utils/Functions/useFunctions";
import { runFunction } from "@/utils/Functions/DynamicFunctionLibrary";

export function initiateTimeOut(task: any) {
  functionsMap[task.name](
    task.attributes.watchKeys,
    () => {
      task.attributes.executeFn.forEach((value: any) => runFunction(value));
    },
    task.attributes.delay,
  );
}

export function setReactState(task: any) {
  functionsMap.setState(task.attributes.key, task.attributes.value);
}
