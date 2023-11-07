"use client";
import Renderer from "@/renderer/Render";
import {IComponentType} from "@/types";
import StateRenderer from "@/renderer/renderers/StateRenderer";

const ClientRenderer: React.FC<{ component: IComponentType; index: number; passFromParent?: any }> = ({
                                                                                                          component,
                                                                                                          index,
                                                                                                          passFromParent
                                                                                                      }) => {
    if(component.states && !component.passAttributes.reactActions){
        return <StateRenderer component={component} index={index} passFromParent={passFromParent} />
    }

    return (
        <Renderer
            component={component}
            index={index}
            passFromParent={passFromParent}
        />
    );
};

export default ClientRenderer;
