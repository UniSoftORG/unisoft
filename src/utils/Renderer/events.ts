import { IComponentBase } from "@/types";

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
  componentData: IComponentBase,
  options: { customPrefix?: string },
) => {
  if (!componentData || !componentData.props) return {};

  const { props } = componentData;
  const { parentProps } = props;

  const handlers: { [key: string]: any } = {};

  for (const event of events) {
    const eventConfigName = `${options?.customPrefix}${event}`;
    const eventConfig: EventConfig | undefined = props[eventConfigName];

    if (!eventConfig) continue;

    const { function: functionName, props: functionProps, from } = eventConfig;
    const functionSource = from === "parent" ? parentProps : props;

    const functionToExecute = functionSource[functionName];
    if (!functionToExecute) continue;

    const eventName = `on${event}`;

    if (!functionProps) {
      handlers[eventName] = functionToExecute;
    } else {
      handlers[eventName] = () => {
        const args = functionProps.map((propInfo) => {
          const propSource = propInfo.from === "parent" ? parentProps : props;
          return propSource[propInfo.name];
        });
        functionToExecute(...args);
      };
    }
  }

  return handlers;
};
