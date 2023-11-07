import { replaceDynamicTargets } from "@/utils/Renderer/helpers";
import { evaluate, processTemplateStrings } from "unisoft-utils";
import { IComponentType } from "@/types";
import {PrepareRenderer} from "@/renderer/PrepareRenderer";

export const MapRenderer: React.FC<{
    component: IComponentType,
}> = ({component}) => {
  if (component.mappedComponent) {
    return component.mappedComponent.map((child, cIndex) => {
      let childComponent = {
        ...component,
        passAttributes: {
          ...component.passAttributes,
          ...child.passAttributes,
        },
        mappedComponent: undefined,
      };

      childComponent = replaceDynamicTargets<any, any>(
        childComponent,
        childComponent.dynamic,
      );

      return <PrepareRenderer
        component={{
          ...childComponent,
          elementAttributes: {
            ...childComponent.elementAttributes,
            ...(childComponent?.elementAttributes?.className && { className: processTemplateStrings(
                  childComponent?.elementAttributes?.className,
                  (value: string) => {
                    return evaluate(value);
                  },
                  "#{",
                  "}",
              )}),

          }
        }}
        index={cIndex}
      key={`${childComponent.uuid}-${cIndex}`}
      />
    });
  }
}
