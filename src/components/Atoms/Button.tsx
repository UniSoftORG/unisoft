"use client";
import DynamicImage from "@/components/Atoms/DynamicImage";

type ButtonProps = {
  label: string | number | React.ReactNode | React.ReactNode[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  icon?: any;
  image?: any;
  reactIconLabel?: string;
  reactIconPath?: string;
  reactIconClass?: string;
  color?: string;
  gradient?: string;
  className?: any;
  disabled?: boolean;
  size?: number;
  hideLabelOnMobile?: boolean;
  buttonType?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Button: React.FC<ButtonProps> = ({
  label,
  onClick = () => {},
  onKeyPress = () => {},
  buttonType,
  image,
  icon: Icon,
  className,
  color,
  gradient,
  reactIconPath,
  reactIconLabel,
  reactIconClass,
  disabled,
  size,
  hideLabelOnMobile,
  ...additionalProps
}) => {
  const gradientColor = gradient
    ? gradient.match("-darker")
      ? "dark-background bg-opacity-50"
      : gradient.match("-dark")
        ? gradient + "er"
        : gradient + "-darker"
    : color + "-dark";

  return (
    <button
      onKeyPress={onKeyPress}
      onClick={onClick}
      type={buttonType ? "button" : "submit"}
      className={`inline-flex items-center 
                        ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
                        rounded-full
                        ${className && className.match("px-") ? "" : "px-6"}
                        ${className && className.match("py-") ? "" : "py-3"}
                        ${
                          reactIconPath &&
                          `${hideLabelOnMobile && "pr-1"} lg:pr-5`
                        }
                        transition duration-300
                        ${color ? `bg-${color} hover:bg-${color}-dark` : ""}
                        ${
                          gradient
                            ? `bg-gradient-to-r from-${gradient} to-${gradientColor} hover:opacity-70`
                            : ""
                        }
                        ${className}
                       
            `}
      {...additionalProps}
    >
      {image ? (
        <span className={`bg-${gradientColor} mr-1.5 p-2 rounded-full`}>
          {image}
        </span>
      ) : (
        ""
      )}

      {reactIconPath && (
        <span
          className={`bg-${gradientColor} ${
            hideLabelOnMobile ? "mr-0" : "mr-1.5"
          } lg:mr-1.5  p-1.5 rounded-full`}
        >
          <DynamicImage
            frontPath={"react-icons/" + reactIconPath}
            label={reactIconLabel}
            height={size ?? 22}
            width={size ?? 22}
            iconClass={reactIconClass}
            noColor
          />
        </span>
      )}
      <span className={`${hideLabelOnMobile && "hidden lg:block"}`}>
        {label}
      </span>
    </button>
  );
};

export default Button;
