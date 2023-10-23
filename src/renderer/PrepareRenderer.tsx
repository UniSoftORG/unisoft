import {IComponentType} from "@/types";
import {prepareProps} from "@/renderer/helpers/initializors";
import ServerRenderer from "@/renderer/ServerRenderer";

export default function PrepareRenderer(component: IComponentType, index?: number, generateProps: boolean = false) {
    if(generateProps){
        prepareProps(component)
    }
    // const merged = {...component, passAttributes: {...component.passAttributes}}

    return ServerRenderer(component, index ? index : 0)
}