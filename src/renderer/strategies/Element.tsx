import React, { createElement, Suspense } from "react";
import { IComponentBase, IComponentType } from "@/types";
import ChildRenderer from "../ChildRenderer";

// const Element: React.FC<{ children: any, componentData: IComponentBase }> = ({
//                                                                                 children,
//                                                                                 componentData,
//                                                                                 ...parentProps
//                                                                             }) => {
const Element: React.FC<{ children: any; componentData: IComponentBase }> = ({
  children,
  componentData,
  ...parentProps
}) => {
  return createElement(
    componentData.element as string,
    {
      ...componentData.elementAttributes,
      key: componentData.uuid,
    },
    <Suspense>
      <ChildRenderer passProps={componentData}>{children}</ChildRenderer>
    </Suspense>,
  );
};

export default Element;
