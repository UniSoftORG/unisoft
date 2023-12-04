"use client";
import useDynamicStates from "@/core/React/Managers/StateManager";
import { useInterval, useTimeout } from "@/core/React/Managers/TimeManager";
import Renderer from "@/core/Renderer/Render";
import { FunctionNames, IComponentType } from "@/types";
import { getAllValuesByKey } from "unisoft-utils";

type ConstructedFunctions = {
  [key: string]: any; // Replace 'any' with a more specific type if possible
};

const StateRenderer: React.FC<{
  component: IComponentType;
}> = ({ component }) => {
  const [states, setStateByKey] = component.states
    ? useDynamicStates(component.states)
    : [];
  const functionNamesMap = component.functions?.length
    ? getAllValuesByKey(
        component.functions,
        ["attributes", "callbacks"],
        ["name"]
      )
    : component.onEvents
      ? getAllValuesByKey(
          component.onEvents,
          ["attributes", "callbacks"],
          ["name"]
        )
      : [];

  const constructFunctions = (): ConstructedFunctions => {
    const constructFunctions: ConstructedFunctions = {};

    functionNamesMap.forEach((functionName: string) => {
      if (functionName === "setState") {
        constructFunctions[`setState${component.uuid.replaceAll("-", "")}`] =
          setStateByKey;
      } else if (
        functionName === FunctionNames.useInterval ||
        functionName === FunctionNames.useTimeOut
      ) {
        const useFunction =
          functionName === FunctionNames.useInterval ? useInterval : useTimeout;
        constructFunctions[
          `${functionName}${component.uuid.replaceAll("-", "")}`
        ] = (watchKeys: any, callbacks: any, delay: any) =>
          useFunction(watchKeys, callbacks, states, delay);
      }
    });

    return constructFunctions;
  };

  return (
    <Renderer
      component={{
        ...component,
        states: states,
        passAttributes: {
          ...component.passAttributes,
          reactActions: {
            ...constructFunctions(),
          },
        },
      }}
      fromClient={true}
    />
  );
};

export default StateRenderer;
