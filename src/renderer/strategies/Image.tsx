import { handleEvents } from "@/utils/Renderer/events";
import Image from "next/image";

const ImageRenderer: React.FC<any> = ({ children, componentData, events }) => {
  const { src, alt, width, height, className } = componentData.elementAttributes
  return (
    <Image
      src={src ?? componentData.passAttributes.image}
      alt={alt ?? ""}
      width={width ?? 0}
      height={height ?? 0}
      className={className}
      loading={"eager"}
      priority
      {...(componentData.onEvents && {...handleEvents(componentData, { customPrefix: "executeOn" })})}
    />
  );
};

export default ImageRenderer;
