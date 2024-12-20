import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import useColorClasses from "../../hooks/useColorClasses";
import Icon from "../icon";
import Loading from "../loading";
import { IconName } from "@/type/iconName";

type Size = "small" | "medium" | "large" | "zeroPadding";
type Variant = "contained" | "outlined" | "text";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: Size;
  variant?: Variant;
  iconSize?: number;
  iconWidth?: string;
  iconHeight?: string;
  iconClass?: string;
  iconStrokeWidth?: number;
  textColor?: string;
  iconColor?: string;
  textHoverColor?: string;
  bgColor?: string;
  bgHoverColor?: string;
  borderColor?: string;
  className?: string;
  rounded?: boolean;
  width?: string;
  height?: string;
  to?: string;
  href?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onClick,
  disabled = false,
  loading = false,
  size = "zeroPadding",
  variant = "text",
  iconSize = 2,
  iconWidth,
  iconHeight,
  iconClass,
  iconStrokeWidth,
  textColor = "",
  iconColor = "",
  textHoverColor = "",
  bgColor = "",
  bgHoverColor = "",
  borderColor,
  className,
  rounded = true,
  width = "",
  height = "",
  to = "",
  href = "",
  ...props
}) => {
  const baseClasses =
    "rounded-full outline-none transition duration-200 flex items-center justify-center";

  const sizeClasses: Record<Size, string> = {
    small: "px-2 py-2",
    medium: "px-3 py-3",
    large: "px-4 py-4",
    zeroPadding: "p-0",
  };

  const defaultTextContainedColor = "text-white";
  const defaultBgHoverContainedColor = "hover:bg-blue-300";
  const defaultBgContainedColor = "bg-blue-500";

  const defaultIconColor = "text-blue-500";
  const defaultBorderColor = "border-blue-500";
  const defaultBgHoverColor = "hover:bg-blue-200";

  const { textColor: newIconColor } = useColorClasses({ textColor });
  const { textHoverColor: newTextHoverColor } = useColorClasses({
    textHoverColor,
  });

  const { bgHoverColor: newBgHoverColor } = useColorClasses({ bgHoverColor });
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  const variantClasses: Record<Variant, string> = {
    contained: clsx(
      newIconColor || defaultTextContainedColor,
      newBgColor || defaultBgContainedColor,
      newBgHoverColor || defaultBgHoverContainedColor,
      newTextHoverColor || ""
    ),

    outlined: clsx(
      "border",
      newIconColor || defaultIconColor,
      newBorderColor || defaultBorderColor,
      newBgHoverColor || defaultBgHoverColor
    ),

    text: clsx(
      newIconColor || defaultIconColor,
      newBgHoverColor || "",
      newTextHoverColor || ""
    ),
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    {
      "opacity-50 cursor-not-allowed": disabled || loading,
      "rounded-full": rounded,
    },
    className
  );

  const ButtonComponent: React.ElementType = to ? Link : href ? "a" : "button";

  return (
    <ButtonComponent
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      to={to}
      href={href}
      {...props}
    >
      {loading ? (
        <Loading color={textColor || "white"} size="1em" />
      ) : (
        <Icon
          className={iconClass}
          name={iconName as IconName}
          size={iconSize}
          width={iconWidth || width}
          height={iconHeight || height}
          color={iconColor}
          strokeWidth={iconStrokeWidth}
        />
      )}
    </ButtonComponent>
  );
};

export default IconButton;
