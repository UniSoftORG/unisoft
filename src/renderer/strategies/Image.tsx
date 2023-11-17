import { handleEvents } from "@/utils/Renderer/events";
import Image from "next/image";

const ImageRenderer: React.FC<any> = ({ children, componentData, events }) => {
  const image =
    componentData.elementAttributes.src ?? componentData.passAttributes.image;
  return (
    <Image
      src={image}
      alt={componentData.elementAttributes.alt ?? ""}
      width={componentData.elementAttributes.width ?? 0}
      height={componentData.elementAttributes.height ?? 0}
      className={componentData.elementAttributes.className}
      loading={"eager"}
      key={`${componentData.uuid}-${componentData?.passAttributes?.index}`}
      {...handleEvents(componentData, { customPrefix: "executeOn" })}
    />
  );
};

export default ImageRenderer;
