import {IComponentType} from "@/types";
import Image from "next/image";
import { handleEvents } from "@/utils/Renderer/events";

const ImageRenderer: React.FC<any> = ({
  children,
  componentData,
  events,
}) => {
  // let src;
  // const data = componentData.dynamicAttributes ? replaceDynamic(componentData, 'attrs', 'dynamicAttributes') : componentData
  // if(data.src?.includes('false')){
  //     src = data.src?.includes('false') ? componentData.attrs?.fallback ? componentData.attrs.fallback : '/kgb.png' : data.src
  // } else {
  //     src = data.src
  // }

  return (
    <Image
      src={componentData.passAttributes.image ?? componentData.elementAttributes.src}
      alt={componentData.elementAttributes.alt ?? ""}
      width={componentData.elementAttributes.width}
      height={componentData.elementAttributes.height}
      className={componentData.elementAttributes.className}
      loading={"eager"}
      priority
      {...handleEvents(componentData, { customPrefix: "executeOn" })}
    />
  );
};

export default ImageRenderer;
