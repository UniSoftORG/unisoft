import { Evaluators, Setters } from "unisoft-utils";
import { IComponentType } from "@/types";
import { prepareProps } from "@/renderer/helpers/initializors";
import ServerRenderer from "@/renderer/ServerRenderer";
import ClientRenderer from "@/renderer/ClientRenderer";
import { replaceDynamicTargets } from "@/utils/Renderer/helpers";

export default function PrepareRenderer(
  component: IComponentType,
  index?: number,
  generateProps: boolean = false,
): any {
  if (generateProps) prepareProps(component);
  if (!component.mapByKey && component.dynamic)
    component = replaceDynamicTargets<any, any>(component, component.dynamic);

  if (component.mappedComponent?.length) {
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
            className: Setters.processTemplateStrings(
              childComponent?.elementAttributes?.className,
              (value: string) => {
                return Evaluators.evaluate(value);
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

  if (
    component.renderer === "client" ||
    typeof component.states !== "undefined"
  ) {
    return (
      <ClientRenderer
        componentProps={component}
        index={index as number}
        key={`${component.uuid}-${index}`}
      />
    );
  }

  return ServerRenderer(component, index ? index : 0);
}
