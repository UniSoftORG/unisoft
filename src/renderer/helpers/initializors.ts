import { AnyObject, IComponentType } from "@/types";
import { createRequest } from "@/utils/Request/createRequest";
import { get, getValue } from "unisoft-utils";
import { v4 } from "uuid";

export class PrepareComponent {
  componentData: IComponentType;

  constructor(componentData: IComponentType) {
    this.componentData = componentData;
  }

  public static getSingleton(componentData: IComponentType) {
    const initiateClass = new PrepareComponent(componentData);
    return initiateClass.prepareComponent();
  }

  async prepareComponent() {
    this.componentData.variables
      ? await this.prepareRequests(this.componentData.variables)
      : undefined;
    await this.generatePassAttributes(
      this.componentData,
      this.componentData?.passAttributes
    );
    await this.transformObject("mapByKey");
    await this.replaceValuesWithMainObject(
      this.componentData,
      this.componentData.passAttributes
    );
  }

  processChildAttributes(
    child: IComponentType,
    parentName: string,
    passTo: any
  ) {
    const childPassAttributes: any = {};

    // Collect attributes to pass
    for (const key in child.receiveAttributes) {
      const attrValue = child.receiveAttributes[key];
      if (attrValue.startsWith(parentName)) {
        childPassAttributes[key] = attrValue;
      }
    }

    // Only assign if there are attributes to pass
    if (Object.keys(childPassAttributes).length > 0) {
      passTo[child.name] = childPassAttributes;
    }

    // Process children, if any
    if (child.children) {
      child.children.forEach((grandChild: IComponentType) => {
        const grandChildPassAttributes = {};
        this.processChildAttributes(
          grandChild,
          parentName,
          grandChildPassAttributes
        );
        if (Object.keys(grandChildPassAttributes).length > 0) {
          passTo[child.name] = {
            ...(passTo[child.name] || {}),
            ...grandChildPassAttributes,
          };
        }
      });
    }
  }

  async replaceValuesWithMainObject(
    componentData: IComponentType,
    passAttributes: AnyObject
  ): Promise<void> {
    if (passAttributes) {
      for (const [key, value] of Object.entries(passAttributes)) {
        if (typeof value === "object") {
          await this.replaceValuesWithMainObject(componentData, value);
        } else {
          this.replaceAttributeValue(componentData, passAttributes, key, value);
        }
      }
    }
  }

  replaceAttributeValue(
    mainObject: IComponentType,
    passAttributes: AnyObject,
    key: string,
    value: string
  ): void {
    if (!value.startsWith(mainObject.name + ".")) {
      return;
    }

    try {
      const path = value.replace(`${mainObject.name}.`, "");
      const newValue = get(mainObject, path);
      if (newValue !== undefined) {
        passAttributes[key] = newValue;
      }
    } catch (error) {
      console.error(`Error in replaceAttributeValue for key ${key}:`, error);
    }
  }

  generatePassAttributes = async (
    node: IComponentType,
    parentAttributes?: any
  ) => {
    const passAttributes: any = {};

    if (node.children) {
      await Promise.all(
        node.children.map((child: IComponentType) =>
          this.processChildAttributes(child, node.name, passAttributes)
        )
      );
    }

    if (Object.keys(passAttributes).length > 0) {
      node.passAttributes = { ...node.passAttributes, ...passAttributes };
    }
    if (parentAttributes && parentAttributes[node.name]) {
      node.passAttributes = parentAttributes[node.name];
    }

    if (node.children) {
      await Promise.all(
        node.children.map((child: IComponentType) =>
          this.generatePassAttributes(child, node.passAttributes)
        )
      );
    }
  };

  async transformObject(shouldTransformByKey: string, copyKeys?: string[]) {
    await this.processChildrenMapping(this.componentData, shouldTransformByKey);
  }

  async processChildrenMapping(
    checkObj: IComponentType,
    shouldTransformByKey: string
  ) {
    if (checkObj.children) {
      const originalChildren = [...checkObj.children];
      let newChildren: any[] = [];

      for (const child of originalChildren) {
        if (
          child.hasOwnProperty(shouldTransformByKey) &&
          child[shouldTransformByKey].startsWith(this.componentData.name)
        ) {
          const parentValue = getValue(
            this.componentData,
            child[shouldTransformByKey].replace(
              `${this.componentData.name}.`,
              ""
            )
          );
          newChildren = this.createMappedChildren(child, parentValue);
        } else {
          newChildren.push(child);
        }
      }

      checkObj.children = newChildren;

      // Process grandchildren in the new children array
      for (const child of newChildren) {
        await this.processChildrenMapping(child, shouldTransformByKey);
      }
    }
  }

  createMappedChildren(
    child: IComponentType,
    parentValue: IComponentType[] | null
  ) {
    if (!Array.isArray(parentValue)) {
      return [];
    }
    return parentValue.map((data, vKey) => ({
      ...child,
      uuid: v4(),
      passAttributes: { ...data, index: vKey },
      children: child.children ? [...child.children] : undefined,
    }));
  }

  prepareRequests = async (requests: AnyObject) => {
    if (!this.componentData.requests?.length) {
      return requests;
    }

    try {
      const requestedData = await createRequest(this.componentData.requests);
      return Object.keys(requestedData ?? {}).reduce(
        (acc: AnyObject, key: string) => {
          if (requestedData?.[key]?.data !== undefined) {
            acc[key] = requestedData[key]?.data;
          }
          return acc;
        },
        requests
      );
    } catch (error) {
      console.error("Error in prepareRequests:", error);
      return requests;
    }
  };
}
