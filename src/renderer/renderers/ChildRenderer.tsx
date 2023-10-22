"use client"
import {Children, isValidElement, cloneElement, ReactElement, JSXElementConstructor} from "react";
import {IComponentBase} from "@/types";

const ChildRenderer: React.FC<{
    children: ReactElement<{ parentProps?: any; }, string | JSXElementConstructor<any>>[] | ReactElement<{
        parentProps?: any;
    }, string | JSXElementConstructor<any>> | IComponentBase[] | undefined,
    passProps?: any
}> = ({children, passProps}) => {

    return (
        Children.map(children as React.ReactElement<{ parentProps?: any }>[] | React.ReactElement<{
            parentProps?: any
        }>, (child) => {
            if (isValidElement(child)) {
                // const newProps = mergeParentProps((child.props as any).componentData.props, passProps);
                return cloneElement(child);
            }
            return child;
        })
    )
};

export default ChildRenderer;
