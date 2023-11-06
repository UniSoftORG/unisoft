"use client";
import {
    Children,
    isValidElement,
    cloneElement,
    ReactElement,
    JSXElementConstructor,
} from "react";
import {IComponentBase} from "@/types";

const ChildRenderer: React.FC<{
    children:
        | ReactElement<{ parentProps?: any }, string | JSXElementConstructor<any>>[]
        | ReactElement<
        {
            parentProps?: any;
        },
        string | JSXElementConstructor<any>
    >
        | IComponentBase[]
        | undefined;
    passProps?: any;
}> = ({children, passProps}) => {

    return Children.map(
        children as
            | React.ReactElement<{ parentProps?: any }>[],
        (child) => {
            if (isValidElement(child)) {
                return cloneElement(child);
            }
            return 'asd';
        },
    );
};

export default ChildRenderer;
