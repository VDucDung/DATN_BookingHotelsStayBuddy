import React from "react";
import clsx from "clsx";
import { icons } from "./icon";
import useParseDimension from "../../hooks/useParseDimension";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import useColorClasses from "../../hooks/useColorClasses";
import { IconName } from "@/type/iconName";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: IconName;
  size?: string | number; 
  width?: string | number;
  height?: string | number; 
  className?: string; 
  color?: string; 
  strokeWidth?: number; 
}


const Icon: React.FC<IconProps> = ({
  name = "",
  size = 2,
  width = "",
  height = "",
  className = "",
  color = "gray",
  strokeWidth,
  ...props
}) => {
  const IconComponent = name ? icons[name as IconName] : null;

  const { value, unit } = useParseDimension(`${size}`);
  const widthStyle = useResponsiveStyle(width as string, "w");
  const heightStyle = useResponsiveStyle(height as string, "h");

  const sizeStyle: React.CSSProperties = {
    width: widthStyle?.width || `${value}${unit}`,
    height: heightStyle?.height || `${value}${unit}`,
  };

  const { textColor: newColor } = useColorClasses({ textColor: color });
  const style: React.CSSProperties = {
    ...sizeStyle,
    color: newColor,
    strokeWidth: strokeWidth,
  };

  return (
    <span
      className={clsx(
        "x-icon inline-flex items-center justify-center transition duration-300",
        { "text-inherit": !newColor },
        newColor,
        className
      )}
      style={style}
      {...props}
    >
      {IconComponent && (
        <IconComponent className="w-full h-full" stroke="currentColor" />
      )}
    </span>
  );
};

export default Icon;
