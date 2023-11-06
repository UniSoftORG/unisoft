import React, { createElement, Suspense } from "react";
import { IComponentBase, IComponentType } from "@/types";
import ChildRenderer from "../renderers/ChildRenderer";

const Element: React.FC<{ children: any; componentData: IComponentType }> = ({
  children,
  componentData
}) => {
  return createElement(
    componentData.element as string,
    {
      ...componentData.elementAttributes,
        key: componentData.passAttributes.index ? `${componentData.uuid}-${componentData.passAttributes.index}` : componentData.uuid
    },
    <Suspense>
      <ChildRenderer>{children}</ChildRenderer>
    </Suspense>,
  );
};

export default Element;
