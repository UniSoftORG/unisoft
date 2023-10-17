"use client"
import {Children, isValidElement, cloneElement, ReactElement, JSXElementConstructor} from "react";
import {IComponent} from "@/types";
import {mergeParentProps} from "@/utils/Renderer/helpers";

const ChildRenderer: React.FC<{
    children: ReactElement<{ parentProps?: any; }, string | JSXElementConstructor<any>>[] | ReactElement<{
        parentProps?: any;
    }, string | JSXElementConstructor<any>> | IComponent[] | undefined,
    passProps?: any
}> = ({children, passProps}) => {

    return (
        Children.map(children as React.ReactElement<{ parentProps?: any }>[] | React.ReactElement<{
            parentProps?: any
        }>, (child) => {
            if (isValidElement(child)) {
                const newProps = mergeParentProps((child.props as any).componentData.props, passProps);

                return cloneElement(child, {parentProps: newProps});
            }
            return child;
        })
    )
};

export default ChildRenderer;
