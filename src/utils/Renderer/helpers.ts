import { IComponentBase, IComponentType } from "@/types";
import { v4 } from "uuid";
import {
  getValue,
  simpleDeepClone,
  setByDotNotation,
  resolveTemplateString,
  processTemplateStrings,
  evaluate,
} from "unisoft-utils";
import { importReactHooks } from "@/utils/Functions/DynamicFunctionLibrary";

export const replaceDynamicTargets = <T = any, R = any>(
  obj: T,
  targets: string[],
): R | any => {
  const newObj = simpleDeepClone(obj);

  targets?.map((target) => {
    const targetStr = getValue(obj, target);
    const replaced = resolveTemplateString(targetStr as string, newObj);
    setByDotNotation(newObj, target, replaced);
    return replaced;
  });

  return newObj;
};

export const processReactClientData = (componentProps: IComponentType) => {
  if (componentProps.passAttributes.reactActions)
    importReactHooks(componentProps.passAttributes.reactActions);
  if (componentProps.rendererDynamic)
    componentProps = replaceDynamicTargets(
      componentProps,
      componentProps.rendererDynamic,
    );
  if (componentProps.rendererConditions)
    componentProps.rendererConditions.forEach((keyPath: string) => {
      return setByDotNotation(
        componentProps,
        keyPath,
        processTemplateStrings(
          getValue(componentProps, keyPath),
          (value: string) => {
            return evaluate(value);
          },
          "#{",
          "}",
        ) as any,
      );
    });
  return componentProps;
};

export const updateUUIDs = (component: IComponentBase): IComponentBase => {
  const newComponent = { ...component };

  newComponent.uuid = v4();

  if (Array.isArray(newComponent.children)) {
    newComponent.children = newComponent.children.map((child) =>
      updateUUIDs(child as IComponentBase),
    );
  }

  return newComponent;
};
