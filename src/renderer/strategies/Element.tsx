import {ComponentData} from "@/types";
import {createAttributes} from "@/utils/Renderer/helpers";
import {handleEvents} from "@/Builder/utils/eventUtils";
import React, {createElement} from "react";
import ChildRenderer from "../renderers/ChildRenderer";

const Element: React.FC<{ children: any, componentData: ComponentData }> = ({
                                                                                children,
                                                                                componentData,
                                                                                ...parentProps
                                                                            }) => {
    return createElement(componentData.element as string, {
        ...createAttributes(componentData), ...handleEvents(componentData, {customPrefix: 'executeOn'}),
        key: componentData.uuid
    }, <ChildRenderer passProps={parentProps}>{children}</ChildRenderer>);
};

export default Element;
