"use server";
import {
  generatePassAttributes,
  replaceWithValuesFromMainObject,
} from "@/utils/Renderer/propUtils";
import { IComponentType } from "@/types";
import { getValue } from "unisoft-utils";
import {createRequest} from "@/utils/Request/createRequest";

function transformObject(
  obj: IComponentType,
  shouldTransformByKey: string,
  copyKeys: string[],
) {

    function checkAll(checkObj: IComponentType) {
      if(checkObj.children) {
        checkObj.children.forEach((child: any, key: any) => {
          if (
              (child.hasOwnProperty(shouldTransformByKey)) &&
              (child[shouldTransformByKey].startsWith(obj.name))
          ) {
            const parentValue = getValue(
                obj,
                child[shouldTransformByKey]?.replace(`${obj.name}.`, ""),
            );


            child.mappedComponent = [];

            parentValue.forEach((data: any, vKey: number) => {
              child.mappedComponent.push({
                passAttributes: {...data, index: vKey},
              });
            });
          }
          checkAll(child)
        });
      }
    }
    checkAll(obj)
}
export const prepareProps = (componentData: IComponentType) => {
  generatePassAttributes(componentData, componentData?.passAttributes);
  replaceWithValuesFromMainObject(componentData, componentData.passAttributes);
  transformObject(componentData, "mapByKey", []);
};

export const prepareRequests = async (componentData: IComponentType, requests: any) => {
  const requestedData = componentData.requests ? await createRequest(componentData.requests) : undefined
  return Object.keys(requestedData || {}).reduce((acc, key) => {
    if (!(requestedData) || requestedData[key] !== undefined) {
      if (requestedData) {
        (requests as any)[key] = requestedData[key].data;
      }
    }
    return requests;
  }, {});
};
