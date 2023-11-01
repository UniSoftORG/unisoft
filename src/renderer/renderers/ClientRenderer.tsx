"use client";
import Renderer from "@/renderer/Render";
import componentsMaps from "@/renderer/imports/components";
import { delaySetState, useDynamicStates } from "@/utils/React/StateManager";
import {useInterval} from "@/utils/React/TimeManager";

const ClientRenderer: React.FC<{ componentProps: any; index: number }> = ({
  componentProps,
  index,
}) => {
  const Component = componentsMaps[componentProps.type];
  if (!Component) throw new Error("Component does not exists!");

  const [states, setStateByKey] = componentProps.states
    ? useDynamicStates(componentProps.states)
    : [];

  // if (componentProps.name === "Slider" && states && setStateByKey) {
  //   useInterval(['current'], () => {
  //     setStateByKey("current", states['current'] === 0 ? 1 : 0);
  //   }, states, 4000)
  // }

  return (
    <Renderer
      Component={Component}
      componentProps={{
        ...componentProps,
        passAttributes: { ...componentProps.passAttributes, states: states, reactActions: {states: [states, setStateByKey], setState: setStateByKey, useInterval: useInterval} },
      }}
      index={index}
      passFromParent={{ ...states }}
    />
  );
};

export default ClientRenderer;
