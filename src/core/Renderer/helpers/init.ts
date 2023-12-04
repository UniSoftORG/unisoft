"use server";
import { IComponentType } from "@/types";
import { createRequest } from "@/utils/Request/createRequest";
import { getValue } from "unisoft-utils";
import { v4 } from "uuid";

export async function initComponent(componentData: IComponentType) {
  if (componentData.requests?.length) await prepareRequests(componentData);
  return transformObject(componentData, "mapByKey");
}
async function transformObject(
  componentData: IComponentType,
  shouldTransformByKey: string
): Promise<IComponentType> {
  return processChildrenMapping(
    { ...componentData },
    shouldTransformByKey,
    componentData,
    []
  );
}

async function prepareRequests(componentData: IComponentType) {
  if (!componentData.requests) {
    return;
  }

  try {
    const replaceKeysIn = componentData.variables;
    const requestedData = await createRequest(componentData.requests);
    return Object.keys(requestedData ?? {}).reduce(
      (acc: IComponentType["variables"], key) => {
        const data = requestedData?.[key]?.data;
        if (acc) {
          acc[key] = data;
        }
        return acc;
      },
      replaceKeysIn
    );
  } catch (error) {
    return componentData.variables;
  }
}

function processChildrenMapping(
  checkObj: IComponentType,
  shouldTransformByKey: string,
  rootObj: IComponentType,
  parentHierarchy: IComponentType[]
): IComponentType {
  let updatedHierarchy = [...parentHierarchy, checkObj];
  checkObj.receiveAttributes?.hasOwnProperty("session");
  if (!checkObj.children) {
    return processReceiveAttributes({ ...checkObj }, updatedHierarchy);
  }

  let newChildren: IComponentType[] = [];

  for (const child of checkObj.children) {
    if (
      child.hasOwnProperty(shouldTransformByKey) &&
      (child as any)[shouldTransformByKey].startsWith(rootObj.name)
    ) {
      const parentValuePath = (child as any)[shouldTransformByKey].replace(
        `${rootObj.name}.`,
        ""
      );
      const parentValue = getValue(rootObj, parentValuePath);
      if (Array.isArray(parentValue)) {
        newChildren.push(
          ...parentValue.map((item, index) =>
            createMappedChild(child, item, index, rootObj, updatedHierarchy)
          )
        );
      }
    } else {
      newChildren.push(
        processChildrenMapping(
          { ...child },
          shouldTransformByKey,
          rootObj,
          updatedHierarchy
        )
      );
    }
  }

  return processReceiveAttributes(
    { ...checkObj, children: newChildren },
    updatedHierarchy
  );
}

function createMappedChild(
  templateChild: IComponentType,
  data: any,
  index: number,
  rootObj: IComponentType,
  parentHierarchy: IComponentType[]
): IComponentType {
  let newChild: IComponentType = {
    ...templateChild,
    passAttributes: { ...data, index },
    uuid: v4(),
  };
  if (templateChild.children) {
    newChild.children = templateChild.children.map((child: IComponentType) =>
      processChildrenMapping({ ...child }, "", rootObj, [
        ...parentHierarchy,
        newChild,
      ])
    );
  }
  return processReceiveAttributes(newChild, [...parentHierarchy, newChild]);
}

function processReceiveAttributes(
  obj: IComponentType,
  parentHierarchy: IComponentType[]
): IComponentType {
  if (!obj.receiveAttributes) {
    return obj;
  }

  let existingPassAttributes = obj.passAttributes || {};
  let newPassAttributes = { ...existingPassAttributes };
  let newReceiveAttributes: { [key: string]: any } = {};

  for (const key in obj.receiveAttributes) {
    let valuePath = obj.receiveAttributes[key];
    let value;

    for (let i = parentHierarchy.length - 1; i >= 0; i--) {
      let parent = parentHierarchy[i];
      if (
        !valuePath.includes(`.states.`) &&
        valuePath.startsWith(`${parent.name}.`)
      ) {
        value = getValue(parent, valuePath.replace(`${parent.name}.`, ""));
        break;
      }
    }

    if (typeof value !== "undefined") {
      newPassAttributes[key] = value;
    } else {
      newReceiveAttributes[key] = valuePath;
    }
  }

  if (Object.keys(newPassAttributes).length === 0) {
    delete obj.passAttributes;
  } else {
    obj.passAttributes = newPassAttributes;
  }

  if (Object.keys(newReceiveAttributes).length === 0) {
    delete obj.receiveAttributes;
  } else {
    obj.receiveAttributes = newReceiveAttributes;
  }

  return obj;
}
