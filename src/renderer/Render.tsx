import { IComponentType } from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";

const Renderer: React.FC<{
  Component: any;
  componentProps: any;
  index: number;
  passFromParent?: any;
}> = ({ Component, componentProps, index, passFromParent }) => {
  const merged = {
    ...componentProps,
    passAttributes: { ...componentProps.passAttributes },
  };

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
