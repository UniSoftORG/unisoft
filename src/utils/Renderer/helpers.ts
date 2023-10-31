import { IComponentBase } from "@/types";
import { v4 } from "uuid";
import { getValue, simpleDeepClone, setByDotNotation, resolveTemplateString } from "unisoft-utils";

export const replaceDynamicTargets = <T = any, R = any>(
  obj: T,
  targets: string[],
): R | any => {
  const newObj = simpleDeepClone(obj);

  targets?.map((target) => {
    const targetStr = getValue(newObj, target);
    const replaced = resolveTemplateString(
      targetStr as string,
      newObj,
    );
    setByDotNotation(newObj, target, replaced);
    return replaced;
  });

  return newObj;
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
