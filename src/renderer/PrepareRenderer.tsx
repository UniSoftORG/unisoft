import {IComponentType} from "@/types";
import {prepareProps} from "@/renderer/helpers/initializors";
import ServerRenderer from "@/renderer/renderers/ServerRenderer";
import ClientRenderer from "@/renderer/renderers/ClientRenderer";
import {replaceDynamicTargets} from "@/utils/Renderer/helpers";
import {Suspense} from "react";
import MapRenderer from "@/renderer/renderers/MapRenderer";

export default function PrepareRenderer(
    component: IComponentType,
    index?: number,
    generateProps: boolean = false
): any {
    if (generateProps) prepareProps(component);
    if (!component.mapByKey && component.dynamic) component = replaceDynamicTargets<any, any>(component, component.dynamic);

    if (component.mappedComponent?.length) return MapRenderer(component)

    if (
        component.renderer === "client" ||
        typeof component.states !== "undefined"
    ) {
        return <Suspense key={`${component.uuid}-${index}`}>
            <ClientRenderer
                componentProps={component}
                index={index as number}
            />
        </Suspense>
    }

    return ServerRenderer(component, index ? index : 0);
}