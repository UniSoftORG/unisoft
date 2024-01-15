import { handleEvents } from "@/core/Renderer/helpers/events";
import ChildRenderer from "@/core/Renderer/renderers/ChildRenderer";
import { IComponentType } from "@/types";
import { createElement } from "react";

const Element: React.FC<{
  children?: IComponentType[];
  componentData: IComponentType;
}> = ({ children, componentData }) => {
  return createElement(
    componentData.element as string,
    {
      ...handleEvents(componentData, { customPrefix: "executeOn" }),
      ...componentData.elementAttributes,
    },
    children ? (
      <ChildRenderer parentData={componentData}>{children}</ChildRenderer>
    ) : null
  );
};

export default Element;
