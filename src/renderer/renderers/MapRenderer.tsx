import { replaceDynamicTargets } from "@/utils/Renderer/helpers";
import { evaluate, processTemplateStrings } from "unisoft-utils";
import { IComponentType } from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";

export default function MapRenderer(component: IComponentType) {
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

      return PrepareRenderer(
        {
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
        },
        cIndex,
      );
    });
  }
}
