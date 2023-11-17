"use client";
import { IComponentBase } from "@/types";
import {
  Children,
  JSXElementConstructor,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";

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
}> = ({ children, passProps }) => {
  return Children.map(
    children as
      | React.ReactElement<{ parentProps?: any }>[]
      | React.ReactElement<{
          parentProps?: any;
        }>,
    (child) => {
      if (isValidElement(child)) {
        return cloneElement(child);
      }
      return null;
    }
  );
};

export default ChildRenderer;
