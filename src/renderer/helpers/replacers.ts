import { IComponentType } from "@/types";
import {
  evaluate,
  getValue,
  processTemplateStrings,
  resolveTemplateString,
  setByDotNotation,
  simpleDeepClone,
} from "unisoft-utils";

export const replaceDynamicTargets = (
  obj: IComponentType,
  targets: string[]
) => {
  const newObj = simpleDeepClone(obj);

  targets?.map((target) => {
    const targetStr = getValue(newObj, target);
    const replaced = resolveTemplateString(targetStr as string, newObj);
    setByDotNotation(newObj, target, replaced);
    return replaced;
  });
  return newObj;
};

export const replaceConditionalTargets = (
  component: IComponentType,
  targets: string[]
) => {
  if (targets) {
    targets.forEach((keyPath: string) => {
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
  }
};
