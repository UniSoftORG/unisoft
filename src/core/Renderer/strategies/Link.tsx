import { handleEvents } from "@/core/Renderer/helpers/events";
import ChildRenderer from "@/core/Renderer/renderers/ChildRenderer";
import { IComponentType } from "@/types";
import Link from "next/link";

const UniLink: React.FC<{
  children?: IComponentType[];
  componentData: IComponentType;
}> = ({ children, componentData }) => {
  return (
    <Link
      prefetch={true}
      href={componentData.passAttributes.href}
      {...(componentData.onEvents &&
        ({
          ...handleEvents(componentData, { customPrefix: "executeOn" }),
        } as any))}
      {...componentData.elementAttributes}
    >
      {children ? (
        <ChildRenderer parentData={componentData}>{children}</ChildRenderer>
      ) : null}
    </Link>
  );
};

export default UniLink;
