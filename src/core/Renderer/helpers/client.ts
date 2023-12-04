import {
  importReactHooks,
  runMappedFunctions,
} from "@/core/Functions/DynamicFunctionLibrary";
import {
  processConditions,
  replaceDynamicTargets,
} from "@/core/Renderer/helpers/replacers";
import { IComponentType } from "@/types";

export const processRenderer = (
  component: IComponentType,
  fromClient?: boolean
) => {
  if (component.passAttributes?.hooks) {
    importReactHooks(component.name, component.passAttributes?.hooks);
  }
  if (component.passAttributes?.reactActions) {
    importReactHooks(component.name, component.passAttributes?.reactActions);
  }
  if (component.rendererDynamic)
    component = replaceDynamicTargets(component, component.rendererDynamic);
  if (component.rendererConditions)
    processConditions(component, "rendererConditions");
  if (component.functions?.length) {
    runMappedFunctions(component.uuid, component.functions);
  }

  return component;
};
