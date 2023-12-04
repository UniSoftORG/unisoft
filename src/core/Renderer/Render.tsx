import { processRenderer } from "@/core/Renderer/helpers/client";
import componentsMaps from "@/core/Renderer/imports/components";
import { IComponentType } from "@/types";

const Renderer: React.FC<{
  component: IComponentType;
  passFromParent?: any;
  fromClient?: boolean;
}> = ({ component, passFromParent, fromClient }) => {
  const Component = componentsMaps[component.type];
  if (!Component) throw new Error(`Component does not exists!`);

  component = processRenderer(component, fromClient);

  return (
    <Component {...component} componentData={component} key={component.uuid} />
  );
};

export default Renderer;
