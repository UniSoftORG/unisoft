import { IComponentType } from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";
import {executeFunctions, runFunctionTask} from "@/utils/Functions/DynamicFunctionLibrary";

const Renderer: React.FC<{
  Component: any;
  componentProps: IComponentType;
  index: number;
  passFromParent?: any;
}> = ({ Component, componentProps, index, passFromParent }) => {
  const merged = {
    ...componentProps,
    passAttributes: { ...componentProps.passAttributes },
  };
  const {states, reactActions} = componentProps.passAttributes;

  // if (componentProps.name === "Slider" && states && reactActions) {
  //   reactActions.useInterval(['current'], () => {
  //     reactActions.setState("current", states['current'] === 0 ? 1 : 0);
  //   }, states, 4000)
  // }

  // componentProps.functions && componentProps.functions.forEach(runFunctionTask);
  componentProps.functions && executeFunctions(componentProps.functions, reactActions);
  componentProps.functions && runFunctionTask(componentProps.functions, states)
  // componentProps.functions && componentProps.functions.forEach(runFunctionTask);
  return (
    <Component
      {...componentProps}
      componentData={{
        ...merged,
        passAttributes: { ...merged.passAttributes },
      }}
      key={`${componentProps.uuid}-${index}`}
    >
      {componentProps.children &&
        componentProps.children.map((child: IComponentType, cIndex: number) => {
          return PrepareRenderer(
            {
              ...child,
              passAttributes: {
                ...componentProps.passAttributes[child.name],
                ...passFromParent,
              },
            },
            cIndex,
          );
        })}
    </Component>
  );
};

export default Renderer;
