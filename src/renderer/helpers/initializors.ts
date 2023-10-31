"use server";
import {
  generatePassAttributes,
  replaceWithValuesFromMainObject,
} from "@/utils/Renderer/propUtils";
import { IComponentType } from "@/types";
import { getValue } from "unisoft-utils";

function transformObject(
  obj: IComponentType,
  shouldTransformByKey: string,
  copyKeys: string[],
) {
  obj.children.forEach((child: any, key: any) => {
    if (
      child.hasOwnProperty(shouldTransformByKey) &&
      child[shouldTransformByKey].startsWith(obj.name)
    ) {
      const parentValue = getValue(
        obj,
        child[shouldTransformByKey]?.replace(`${obj.name}.`, ""),
      );
      child.mappedComponent = [];

      parentValue.forEach((data: any, vKey: number) => {
        child.mappedComponent.push({
          passAttributes: { ...data, index: vKey },
        });
      });
    }
  });
}
export const prepareProps = (componentData: IComponentType) => {
  generatePassAttributes(componentData, componentData?.passAttributes);
  replaceWithValuesFromMainObject(componentData, componentData.passAttributes);
  transformObject(componentData, "mapByKey", []);
};
