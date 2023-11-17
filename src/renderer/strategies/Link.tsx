"use client";
import ChildRenderer from "@/renderer/renderers/ChildRenderer";
import { IComponentType } from "@/types";
import { handleEvents } from "@/utils/Renderer/events";
import Link from "next/link";

const UniLink: React.FC<{
  children?: IComponentType[];
  componentData: IComponentType;
}> = ({ children, componentData }) => {
  return (
    <Link
      prefetch={true}
      href={componentData.passAttributes.href}
      {...handleEvents(componentData, { customPrefix: "executeOn" })}
      {...componentData.elementAttributes}
    >
      {children ? (
        <ChildRenderer parentData={componentData}>{children}</ChildRenderer>
      ) : null}
    </Link>
  );
};

export default UniLink;
