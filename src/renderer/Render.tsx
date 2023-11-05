import { IComponentType } from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";
import { runMappedFunctions } from "@/utils/Functions/DynamicFunctionLibrary";
import { processReactClientData } from "@/utils/Renderer/helpers";

const Renderer: React.FC<{
  Component: any;
  componentProps: IComponentType;
  index: number;
  passFromParent?: any;
  fromClient?: boolean;
}> = ({ Component, componentProps, index, passFromParent, fromClient }) => {
  if (fromClient) componentProps = processReactClientData(componentProps);
  if (componentProps.functions) runMappedFunctions(componentProps.functions);

  return (
    <Component
      {...componentProps}
      componentData={{
        ...componentProps,
        passAttributes: { ...componentProps.passAttributes },
      }}
      key={`${componentProps.uuid}-${index}`}
    >
      {componentProps.children &&
        componentProps.children.map((child: IComponentType, cIndex: number) => {
          return PrepareRenderer(
            {
              ...child,
              passAttributes: {
                ...componentProps.passAttributes[child.name as string],
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
