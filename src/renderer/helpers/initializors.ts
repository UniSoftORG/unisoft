"use server"
import {generatePassAttributes, replaceWithValuesFromMainObject} from "@/utils/Renderer/propUtils";
import {IComponentType} from "@/types";

export const prepareProps = (componentData: IComponentType) => {
    generatePassAttributes(componentData, componentData?.passAttributes)
    replaceWithValuesFromMainObject(componentData, componentData.passAttributes)
}