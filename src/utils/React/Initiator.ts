import functionsMap from "@/utils/Functions/useFunctions";
import { runFunction } from "@/utils/Functions/DynamicFunctionLibrary";

export const setState = (task: any) =>
  functionsMap.setState(task.attributes.key, task.attributes.value);

export function useEffect(task: any) {
  functionsMap[task.name](task.attributes.watchKeys, () => {
    task.attributes.executeFn.forEach((value: any) => runFunction(value));
  });
}

export function useTimeEffect(task: any) {
  functionsMap[task.name](
    task.attributes.watchKeys,
    () => {
      task.attributes.executeFn.forEach((value: any) => runFunction(value));
    },
    task.attributes.delay,
  );
}
