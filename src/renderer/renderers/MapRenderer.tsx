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
          passAttributes: {
            ...component.passAttributes,
            ...child.passAttributes,
          },
          elementAttributes: {
            ...childComponent.elementAttributes,
            className: processTemplateStrings(
              childComponent?.elementAttributes?.className as string,
              (value: string) => {
                return evaluate(value);
              },
              "#{",
              "}",
            ),
          },
          mappedComponent: undefined,
        },
        cIndex,
      );
    });
  }
}
