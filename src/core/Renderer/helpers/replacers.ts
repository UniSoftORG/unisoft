import { IComponentType } from "@/types";
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
export const processConditions = (
  component: IComponentType,
  conditionsKey: "conditions" | "rendererConditions"
) => {
  component[conditionsKey]?.forEach((keyPath: string) => {
    return setByDotNotation(
      component,
      keyPath,
      processTemplateStrings(
        getValue(component, keyPath),
        (value: string) => {
          const replaced = evaluate(value);
          return typeof replaced === "string"
            ? replaced.replace(/\\n/g, "\n")
            : replaced;
        },
        "#{",
        "}"
      ) as any
    );
  });
};
