import Renderer from "@/core/Renderer/Render";
import {
  processConditions,
  replaceDynamicTargets,
} from "@/core/Renderer/helpers/replacers";
import ClientRenderer from "@/core/Renderer/renderers/ClientRenderer";
import { IComponentType } from "@/types";

export const PrepareRenderer: React.FC<{
  component: IComponentType;
  fromClient?: boolean;
}> = ({ component, fromClient }) => {
  if (component.dynamic) {
    component = replaceDynamicTargets(component, component.dynamic);
  }

  if (component.conditions) {
    processConditions(component, "conditions");
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
