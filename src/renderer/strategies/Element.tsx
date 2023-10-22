import React, {createElement} from "react";
import {IComponentBase} from "@/types";
import ChildRenderer from "../renderers/ChildRenderer";

const Element: React.FC<{ children: any, componentData: IComponentBase }> = ({
                                                                                children,
                                                                                componentData,
                                                                                ...parentProps
                                                                            }) => {
    return createElement(componentData.element as string, {
        ...componentData.elementAttributes,
        key: componentData.uuid
    }, <ChildRenderer passProps={parentProps}>{children}</ChildRenderer>);
};

export default Element;
