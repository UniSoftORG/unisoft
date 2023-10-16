import {ComponentData} from "@/types";
import {v4} from "uuid";
import {Evaluators, Transformers} from "unisoft-utils";

export const mergeParentProps = (newProps: any, oldProps: any) => {
    return {
        ...oldProps,
        ...newProps,
        parentProps: {
            ...oldProps?.parentProps,
            ...newProps?.parentProps,
        }
    };
};

export const createAttributes = (componentData: ComponentData<any, any>): ComponentData => {
    return {
        ...(componentData.propConfig?.dynamicAttributes && Transformers.replaceTargetedStrings(componentData, componentData.propConfig?.dynamicAttributes)), ...(componentData.conditional && componentData.conditionalClasses &&
            Evaluators.evaluateConditions<any>(componentData.conditional, {
                mainObj: componentData,
                valueKey: 'attrs.className',
                returnValueKeyOnly: true
            }))
    };
};

export const updateUUIDs = (component: ComponentData): ComponentData => {
    const newComponent = {...component};

    newComponent.uuid = v4();

    if (Array.isArray(newComponent.children)) {
        newComponent.children = newComponent.children.map(child => updateUUIDs(child as ComponentData));
    }

    return newComponent;
}