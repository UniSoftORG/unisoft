"use server";
/**
 * This file contains functions for initializing, transforming, and processing UI component data.
 * It handles dynamic rendering aspects like mapping child components based on specific keys,
 * preparing requests for component data, and processing attributes dynamically.
 *
 * Author: Rade Ilijev
 */
import { IComponentType } from "@/types";
import { createRequest } from "@/utils/Request/createRequest";
import { getValue } from "unisoft-utils";
import { v4 } from "uuid";

/**
 * Initializes a component with provided data. Processes any defined requests for the component and then
 * transforms it based on mapping rules.
 *
 * @param componentData - The data for the component to be initialized.
 * @return A Promise that resolves with the initialized component data.
 */
export async function initComponent(componentData: IComponentType): Promise<IComponentType> {
  if (componentData.requests?.length) await prepareRequests(componentData);
  return transformObject(componentData, "mapByKey");
}

/**
 * Prepares and executes requests for component data. Merges the response into the component's variables.
 * Handles errors by returning the original variables in case of request failure.
 *
 * @param componentData - The component data for which requests are prepared.
 * @return A Promise resolving to the prepared component data variables or undefined if there are no requests.
 */
async function prepareRequests(componentData: IComponentType): Promise<IComponentType["variables"] | undefined> {
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


async function transformObject(
  componentData: IComponentType,
  shouldTransformByKey: string
): Promise<IComponentType> {
  return processChildrenMapping(
    { ...componentData },
    []
  );
}

function processChildrenMapping(
  checkObj: IComponentType,
  parentHierarchy: IComponentType[]
): IComponentType {
  let updatedHierarchy = [...parentHierarchy, checkObj];

  if (!checkObj.children) {
    return processReceiveAttributes({ ...checkObj }, updatedHierarchy);
  }

  let newChildren: IComponentType[] = [];
  for (const child of checkObj.children) {
    if (child.mapByKey) {
      const valuePath = child.mapByKey;
      const parentValue = getValueFromHierarchy(updatedHierarchy, valuePath);

      if (Array.isArray(parentValue)) {
        parentValue.forEach((item, index) => {
          let mappedChild = createMappedChild(child, item, index, updatedHierarchy);
          newChildren.push(processChildrenMapping(mappedChild, updatedHierarchy));
        });
      } else {
        newChildren.push(processChildrenMapping({ ...child }, updatedHierarchy));
      }
    } else {
      newChildren.push(processChildrenMapping({ ...child }, updatedHierarchy));
    }
  }

  return processReceiveAttributes(
    { ...checkObj, children: newChildren },
    updatedHierarchy
  );
}


function getValueFromHierarchy(
  hierarchy: IComponentType[],
  valuePath: string
): any {
  for (let i = hierarchy.length - 1; i >= 0; i--) {
    const obj = hierarchy[i];
    if (valuePath.startsWith(`${obj.name}.`)) {
      return getValue(obj, valuePath.replace(`${obj.name}.`, ""));
    }
  }
  return undefined;
}

function createMappedChild(
  templateChild: IComponentType,
  data: any,
  index: number,
  parentHierarchy: IComponentType[]
): IComponentType {
  let newChild: IComponentType = {
    ...templateChild,
    passAttributes: { ...data, index },
    uuid: v4(),
  };

  if (templateChild.children) {
    newChild.children = templateChild.children.map((child: IComponentType) =>
      processChildrenMapping({ ...child }, [...parentHierarchy, newChild])
    );
  }

  return processReceiveAttributes(newChild, [...parentHierarchy, newChild]);
}


function processReceiveAttributes(
  obj: IComponentType,
  parentHierarchy: IComponentType[]
): IComponentType {
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

  obj.passAttributes = Object.keys(newPassAttributes).length ? newPassAttributes : undefined;
  obj.receiveAttributes = Object.keys(newReceiveAttributes).length ? newReceiveAttributes : undefined;

  return obj;
}
