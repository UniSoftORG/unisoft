import { IComponentType } from "@/types";
import { prepareProps } from "@/renderer/helpers/initializors";
import ClientRenderer from "@/renderer/renderers/ClientRenderer";
// import { replaceDynamicTargets } from "@/utils/Renderer/helpers";
import { Suspense } from "react";
import MapRenderer from "@/renderer/renderers/MapRenderer";
import Renderer from "@/renderer/Render";

export default function PrepareRenderer(
  component: IComponentType,
  index?: number,
  generateProps: boolean = false,
): any {
  if (generateProps) prepareProps(component);
  // if (!component.mapByKey && component.dynamic) component = replaceDynamicTargets<any, any>(component, component.dynamic);
  if (component.mappedComponent?.length) return MapRenderer(component);

  if (
    component.renderer === "client" ||
    typeof component.states !== "undefined"
  ) {
    return (
      <Suspense key={`${component.uuid}-${index}`}>
        <ClientRenderer component={component} index={index as number} />
      </Suspense>
    );
  }

  return <Renderer
      component={component}
      passFromParent={component.passAttributes}
      index={index ? index : 0}
      key={`${component.uuid}-${index}`}
  />
}
