import {IComponentBase, IComponentType} from "@/types";
import {runFunction} from "@/utils/Functions/DynamicFunctionLibrary";

type EventConfig = {
  function: string;
  props?: Array<{ name: string; from: string }>;
  from: string;
};

const events = [
  "Click",
  "MouseOver",
  "MouseEnter",
  "MouseDown",
  "MouseUp",
  "MouseMove",
  "MouseOut",
  "Blur",
  "Focus",
  "Change",
  "Submit",
];

export const handleEvents = (
  componentData: IComponentType,
  options: { customPrefix?: string },
) => {
  if (!componentData || !componentData.onEvents) return {};
  const handlers: { [key: string]: any } = {};

  componentData?.onEvents.map((customEvent: any) => {
    handlers['on'+customEvent.name] = (event: any) => {
      customEvent.callbacks.forEach((value: any) => runFunction(value));
    }
  })
  // const { onEvents } = componentData;
  // const { parentProps } = onEvents;
  //
  // const handlers: { [key: string]: any } = {};
  //
  // handlers['onClick'] = (event: any) => {
  //   console.log(onEvents)
  // }
  // for (const event of events) {
  //   const eventConfigName = `${options?.customPrefix}${event}`;
  //   const eventConfig: EventConfig | undefined = onEvents[eventConfigName];
  //
  //   if (!eventConfig) continue;
  //
  //   const { function: functionName, props: functionProps, from } = eventConfig;
  //   const functionSource = from === "parent" ? parentProps : onEvents;
  //
  //   const functionToExecute = functionSource[functionName];
  //   if (!functionToExecute) continue;
  //
  //   const eventName = `on${event}`;
  //
  //   if (!functionProps) {
  //     handlers[eventName] = functionToExecute;
  //   } else {
  //     handlers[eventName] = () => {
  //       const args = functionProps.map((propInfo) => {
  //         const propSource = propInfo.from === "parent" ? parentProps : onEvents;
  //         return propSource[propInfo.name];
  //       });
  //       functionToExecute(...args);
  //     };
  //   }
  // }

  return handlers;
};
