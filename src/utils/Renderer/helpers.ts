import { IComponentType } from "@/types";
import {
  importReactHooks,
  runMappedFunctions,
} from "@/utils/Functions/DynamicFunctionLibrary";
import {
  evaluate,
  getValue,
  processTemplateStrings,
  resolveTemplateString,
  setByDotNotation,
  simpleDeepClone,
} from "unisoft-utils";

export const replaceDynamicTargets = <T = any, R = any>(
  obj: T,
  targets: string[]
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

export const processRenderer = (
  component: IComponentType,
  fromClient?: boolean
) => {
  if (component.passAttributes?.reactActions) {
    importReactHooks(component.name, component.passAttributes?.reactActions);
  }
  if (component.rendererDynamic)
    component = replaceDynamicTargets(component, component.rendererDynamic);
  if (component.rendererConditions)
    component.rendererConditions.forEach((keyPath: string) => {
      return setByDotNotation(
        component,
        keyPath,
        processTemplateStrings(
          getValue(component, keyPath),
          (value: string) => {
            return evaluate(value);
          },
          "#{",
          "}"
        ) as any
      );
    });
  if (component.functions?.length) {
    runMappedFunctions(component.uuid, component.functions);
  }

  return component;
}
