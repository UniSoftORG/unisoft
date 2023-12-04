import { runFunction } from "@/core/Functions/DynamicFunctionLibrary";
import { IComponentType } from "@/types";

export const handleEvents = (
  componentData: IComponentType,
  options: { customPrefix?: string }
): Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, any> => {
  if (!componentData || !componentData.onEvents) return {};
  const handlers: { [key: string]: any } = {};
  componentData?.onEvents.map((customEvent: any) => {
    handlers["on" + customEvent.name] = (event: any) => {
      customEvent.callbacks.forEach((value: any) =>
        runFunction(value, componentData.uuid)
      );
    };
  });
  return handlers;
};
