import { IComponentType } from "@/types";
import { prepareProps } from "@/renderer/helpers/initializors";
import ClientRenderer from "@/renderer/renderers/ClientRenderer";
import { Suspense } from "react";
import {MapRenderer} from "@/renderer/renderers/MapRenderer";
import Renderer from "@/renderer/Render";


export const PrepareRenderer: React.FC<{
  component: IComponentType,
  index?: number,
  generateProps?: boolean,
}> = ({component, index, generateProps}) => {
  if (generateProps) prepareProps(component)

  if (component.mappedComponent?.length) return <MapRenderer component={component} />
  if (
    component.renderer === "client" ||
    typeof component.states !== "undefined"
  ) {
    return (
      <Suspense>
        <ClientRenderer component={component} index={index as number} passFromParent={component.passAttributes}/>
      </Suspense>
    );
  }

  return <Renderer
      component={component}
      passFromParent={component.passAttributes}
      index={index ? index : 0}
  />
}
