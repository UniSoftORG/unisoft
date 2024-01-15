import { handleEvents } from "@/core/Renderer/helpers/events";
import Image from "next/image";
import { startsWith } from 'lodash';

const ImageRenderer: React.FC<any> = ({ children, componentData, events }) => {
  const { src, alt, width, height, className } =
    componentData.elementAttributes;

  const imageSrc = src ?? componentData.passAttributes?.image;

  if(typeof imageSrc !== "string") {
    return null;
  }

  if(imageSrc.startsWith('Cg') || imageSrc.startsWith('Hi') || imageSrc.startsWith('Fa') || imageSrc.startsWith('Md') || imageSrc.startsWith('Gr')){
    return (
      <Image
        src={`/icons/react-icons/${imageSrc}.svg`}
        alt={alt ?? ""}
        width={width ?? 0}
        height={height ?? 0}
        className={'svg-color white ' + className}
        loading={"eager"}
        priority
        {...(componentData.onEvents && {
          ...handleEvents(componentData, { customPrefix: "executeOn" }),
        })}
      />
    );
  }

  return (
    <Image
      src={startsWith(imageSrc, "/") ? imageSrc : `/${imageSrc}`}
      alt={alt ?? ""}
      width={width ?? 0}
      height={height ?? 0}
      className={className}
      loading={"eager"}
      priority
      {...(componentData.onEvents && {
        ...handleEvents(componentData, { customPrefix: "executeOn" }),
      })}
    />
  );
};

export default ImageRenderer;
