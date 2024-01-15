import { runFunction } from "@/core/Functions/DynamicFunctionLibrary";
import functionsMap from "@/core/Functions/useFunctions";
import { FunctionNames } from "@/types";

export const setState = (task: any, uuid: string) => {
  functionsMap[`setState${uuid.replaceAll("-", "")}`](
    task.attributes.key,
    task.attributes.value
  );
};

export const setModalHook = (task: any, uuid: string) => {
  functionsMap[FunctionNames.useModalHook](task.attributes.component);
};

// export function useEffect(task: any) {
//   functionsMap[task.name](task.attributes.watchKeys, () => {
//     task.attributes.callbacks.forEach((value: any) => runFunction(value));
//   });
// }

export function useTimeEffect(task: any, uuid: string) {
  functionsMap[`${task.name}${uuid.replaceAll("-", "")}`](
    task.attributes.watchKeys,
    () => {
      task.attributes.callbacks.forEach((value: any) =>
        runFunction(value, uuid)
      );
    },
    task.attributes.delay
  );
}
