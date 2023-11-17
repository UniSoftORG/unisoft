import Renderer from "@/renderer/Render";
import { replaceDynamicTargets } from "@/renderer/helpers/replacers";
import ClientRenderer from "@/renderer/renderers/ClientRenderer";
import { IComponentType } from "@/types";

export const PrepareRenderer: React.FC<{
  component: IComponentType;
  fromClient?: boolean;
}> = ({ component, fromClient }) => {
  if (component.dynamic) {
    component = replaceDynamicTargets(component, component.dynamic);
  }

  if (component.renderer === "client" || component.states) {
    return <ClientRenderer key={component.uuid} component={component} />;
  }

  return (
    <Renderer
      component={component}
      key={component.uuid}
      fromClient={fromClient}
    />
  );
};
