import { runFunction } from "@/utils/Functions/DynamicFunctionLibrary";
import functionsMap from "@/utils/Functions/useFunctions";

export const setState = (task: any, uuid: string) => {
  functionsMap[`setState${uuid.replaceAll("-", "")}`](
    task.attributes.key,
    task.attributes.value
  );
};

// export function useEffect(task: any) {
//   functionsMap[task.name](task.attributes.watchKeys, () => {
//     task.attributes.callbacks.forEach((value: any) => runFunction(value));
//   });
// }

export function useTimeEffect(task: any, uuid: string) {
  functionsMap[`useInterval${uuid.replaceAll("-", "")}`](
    task.attributes.watchKeys,
    () => {
      task.attributes.callbacks.forEach((value: any) =>
        runFunction(value, uuid)
      );
    },
    task.attributes.delay
  );
}
