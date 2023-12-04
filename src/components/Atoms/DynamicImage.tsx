import defaultForumIcon from "@/public/icons/forum.svg";
import Image, { StaticImageData } from "next/image";

const DynamicImage: React.FC<{
  frontPath?: string;
  type?: string;
  label?: string;
  height?: number;
  width?: number;
  className?: string;
  iconClass?: string;
  loader?: StaticImageData;
  noColor?: boolean;
  color?: string;
  background?: string;
  onClick?: (e: any) => void;
}> = ({
  frontPath,
  label,
  height,
  width,
  className,
  iconClass,
  color,
  noColor,
  background,
  onClick,
}) => {
  const image = frontPath ? `/react-icons/${label}.svg` : defaultForumIcon;

  return image ? (
    <span className={`${className} ${background}`} onClick={onClick}>
      <Image
        src={image}
        alt='icon'
        height={height ? height : width ? width : 16}
        width={width ? width : height ? height : 16}
        className={`svg-color ${color ? color : "white"} ${iconClass}`}
        loading={"eager"}
      />
    </span>
  ) : null;
};

export default DynamicImage;
