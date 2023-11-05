"use client";
import Renderer from "@/renderer/Render";
import componentsMaps from "@/renderer/imports/components";
import { useDynamicStates } from "@/utils/React/HookManagers/StateManager";
import { useInterval } from "@/utils/React/HookManagers/TimeManager";

const ClientRenderer: React.FC<{ componentProps: any; index: number }> = ({
  componentProps,
  index,
}) => {

  const Component = componentsMaps[componentProps.type];
  if (!Component) throw new Error("Component does not exists!");

  const [states, setStateByKey] = componentProps.states
    ? useDynamicStates(componentProps.states)
    : [];

  return (
    <Renderer
      Component={Component}
      componentProps={{
        ...componentProps,
        states: states,
        passAttributes: {
          ...{
            reactActions: {
              setState: setStateByKey,
              useInterval: (watchKeys: any, executeFn: any, delay: any) =>
                executeFn && useInterval(watchKeys, executeFn, states, delay),
            },
          },
        },
      }}
      index={index}
      passFromParent={{ ...states }}
      fromClient={true}
    />
  );
};

export default ClientRenderer;
