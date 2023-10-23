import componentsMaps from "@/renderer/imports/components";
import Renderer from "@/renderer/Render";
import ClientRenderer from "@/renderer/ClientRenderer";
import {replaceDynamicTargets} from "@/utils/Renderer/helpers";

export default function ServerRenderer(componentProps: any, index: number): JSX.Element {
    if (componentProps.dynamic) {
        componentProps = replaceDynamicTargets<any, any>(componentProps, componentProps.dynamic)
    }

    if(componentProps.renderer === 'client' || typeof componentProps.states !== 'undefined') {
        return <ClientRenderer componentProps={componentProps} index={index} key={`${componentProps.uuid}-${index}`}/>
    }

    const Component = componentsMaps[componentProps.type];

    if (!Component) throw new Error('Component does not exists!')

    return <Renderer Component={Component} componentProps={componentProps} index={index} key={`${componentProps.uuid}-${index}`}/>
};

