import {IComponentBase, IComponentType} from "@/types";
import {v4} from "uuid";
import {
    getValue,
    simpleDeepClone,
    setByDotNotation,
    resolveTemplateString,
    processTemplateStrings,
    evaluate,
} from "unisoft-utils";
import {importReactHooks, runMappedFunctions} from "@/utils/Functions/DynamicFunctionLibrary";

export const replaceDynamicTargets = <T = any, R = any>(
    obj: T,
    targets: string[],
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

export const processRenderer = (component: IComponentType, fromClient?: boolean) => {
    if (fromClient) importReactHooks(component.name, component.passAttributes.reactActions[component.name]);
    if (component.rendererDynamic) component = replaceDynamicTargets(component, component.rendererDynamic);
    if (component.rendererConditions) component.rendererConditions.forEach((keyPath: string) => {
        return setByDotNotation(
            component,
            keyPath,
            processTemplateStrings(
                getValue(component, keyPath),
                (value: string) => {
                    return evaluate(value);
                },
                "#{",
                "}",
            ) as any,
        );
    });
    if (component.functions) runMappedFunctions(component.functions);

    return component
};

export const processConditionsOnRenderer = (componentProps: IComponentType) => {
    if (componentProps.rendererConditions)
        componentProps.rendererConditions.forEach((keyPath: string) => {
            return setByDotNotation(
                componentProps,
                keyPath,
                processTemplateStrings(
                    getValue(componentProps, keyPath),
                    (value: string) => {
                        return evaluate(value);
                    },
                    "#{",
                    "}",
                ) as any,
            );
        });
};

export const processDynamicOnRenderer = (componentProps: IComponentType) => {
    if (componentProps.rendererDynamic)
        componentProps = replaceDynamicTargets(
            componentProps,
            componentProps.rendererDynamic,
        );
};

export const updateUUIDs = (component: IComponentType): IComponentBase => {
    const newComponent = {...component};

    newComponent.uuid = v4();

    if (Array.isArray(newComponent.children)) {
        newComponent.children = newComponent.children.map((child) =>
            updateUUIDs(child as IComponentBase),
        );
    }

    return newComponent;
};
