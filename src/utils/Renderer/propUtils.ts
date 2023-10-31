import { simpleDeepClone, get } from "unisoft-utils";
import { IComponent } from "@/types";

function checkChild(child: IComponent, parentName: string, passTo: any) {
  if (child.receiveAttributes) {
    for (const key in child.receiveAttributes) {
      const attrValue = child.receiveAttributes[key];
      if (attrValue.startsWith(parentName)) {
        passTo[child.name] = passTo[child.name] || {};
        passTo[child.name][key] = attrValue;
      }
    }
  }

  if (child.children) {
    child.children.forEach((grandChild: IComponent) => {
      passTo[child.name] = passTo[child.name] || {};
      checkChild(grandChild, parentName, passTo[child.name]);
    });
  }
}

type AnyObject = { [key: string]: any };
export function replaceWithStateValues(
  mainObject: AnyObject,
  passAttributes: AnyObject,
): AnyObject {
  const clonedPassAttributes = simpleDeepClone(passAttributes);

  for (const key in clonedPassAttributes) {
    if (typeof clonedPassAttributes[key] === "object") {
      // Recursive call if the value is an object
      clonedPassAttributes[key] = replaceWithStateValues(
        mainObject,
        clonedPassAttributes[key],
      );
    } else if (
      typeof clonedPassAttributes[key] === "string" &&
      clonedPassAttributes[key].startsWith(mainObject.name + ".states.")
    ) {
      // Extract the state key from the placeholder string
      const stateKey = clonedPassAttributes[key].split(".").slice(2).join(".");

      // If the state exists in the mainObject's states, replace the value
      if (mainObject.states && mainObject.states[stateKey] !== undefined) {
        clonedPassAttributes[key] = mainObject.states[stateKey];
      }
    }
  }

  return clonedPassAttributes;
}

export function replaceWithValuesFromMainObject(
  mainObject: AnyObject,
  passAttributes: AnyObject,
  collectState: boolean = false,
): AnyObject {
  for (const key in passAttributes) {
    if (typeof passAttributes[key] === "object") {
      replaceWithValuesFromMainObject(
        mainObject,
        passAttributes[key],
        collectState,
      );
    } else if (
      typeof passAttributes[key] === "string" &&
      passAttributes[key].startsWith(mainObject.name)
    ) {
      // Logic to handle .states. based on collectState
      const containsStates = passAttributes[key].includes(".states.");

      // If collectState is false and contains .states., continue to the next iteration
      if (!collectState && containsStates) {
        continue;
      }

      // If collectState is true and doesn't contain .states., continue to the next iteration
      if (collectState && !containsStates) {
        continue;
      }

      const paths = passAttributes[key].split(".");
      let currentValue: any = mainObject;
      if (paths[0] === currentValue.name) {
        try {
          const newVal = get(
            mainObject,
            passAttributes[key].replace(currentValue.name + ".", ""),
          );
          currentValue = newVal;
        } catch (e: any) {
          console.log(e);
        }
      }
      if (currentValue !== null) {
        passAttributes[key] = currentValue;
      }
    }
  }
  return passAttributes;
}

export function generatePassAttributes(
  node: IComponent,
  parentAttributes?: any,
) {
  const passAttributes: any = {};

  if (node.children) {
    for (const child of node.children) {
      checkChild(child, node.name, passAttributes);
    }
  }
  node.passAttributes = passAttributes;

  // Merge with existing passAttributes
  node.passAttributes = { ...node.passAttributes, ...passAttributes };
  // If parentAttributes contains a key matching the node's name, use it
  if (parentAttributes && parentAttributes[node.name]) {
    node.passAttributes = parentAttributes[node.name]
    // node.passAttributes = Transformers.deepMerge(
    //   passAttributes,
    //   parentAttributes,
    // );
  }

  if (node.children) {
    for (const child of node.children) {
      generatePassAttributes(child, node.passAttributes);
    }
  }
}
