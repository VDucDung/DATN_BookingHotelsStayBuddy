import React from "react";
import clsx from "clsx";
import Link from "next/link";
import useColorClasses from "@/hooks/useColorClasses"; // Adjust the import path as needed
import Loading from "../loading"; // Adjust the import path as needed

// Common props shared between both button and link
interface CommonProps {
  children: React.ReactNode;
  loading?: boolean;
  size?: "small" | "medium" | "large" | "zeroPadding";
  variant?: "contained" | "outlined" | "text";
  textColor?: string;
  bgColor?: string;
  textHoverColor?: string;
  bgHoverColor?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  borderColor?: string;
  borderHoverColor?: string;
  className?: string;
  iconClassName?: string;
  width?: string;
  rounded?: boolean;
  full?: boolean;
  height?: string;
  external?: boolean; // Indicates if the link is external
}

// Props when rendering as a button
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined; // href should not be present when rendering as a button
  };

// Props when rendering as a link
type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string; // href is required when rendering as a link
  };

// Union type for ButtonProps
type ButtonProps = ButtonAsButton | ButtonAsLink;

const CustomButton: React.FC<ButtonProps> = (props) => {
  const {
    children,
    loading = false,
    size = "medium",
    variant = "contained",
    textColor = "",
    textHoverColor = "",
    bgColor = "",
    bgHoverColor = "",
    startIcon,
    endIcon,
    borderColor = "",
    borderHoverColor = "",
    className = "",
    iconClassName = "",
    width,
    rounded = false,
    full = false,
    height,
    external = false,
    href,
    ...restProps
  } = props;

  const isLink = Boolean(href);

  const baseClasses =
    "rounded focus:outline-none transition duration-300 flex items-center justify-center font-medium";

  const sizeClasses: Record<string, string> = {
    small: "px-2 py-1 text-sm",
    medium: "px-5 py-2 text-base",
    large: "px-7 py-3 text-lg",
    zeroPadding: "p-0",
  };

  const defaultTextContainedColor = isLink ? "text-green-500" : "text-white";
  const defaultBgContainedColor = isLink ? "" : "bg-emerald-700";
  const defaultBgHoverContainedColor = isLink ? "" : "hover:bg-yellow-500";
  const defaultTextHoverContainedColor = isLink ? "" : "hover:text-black";

  const defaultTextColor = "text-green-500";
  const defaultBorderColor = "border-green-500";
  const defaultBgHoverColor = "hover:bg-green-200";
  const defaultTextHoverColorClass = "hover:text-white";

  const defaultLinkColor = "text-green-500";

  const { textColor: newTextColor } = useColorClasses({ textColor });
  const { bgHoverColor: newBgHoverColor } = useColorClasses({ bgHoverColor });
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });
  const { textHoverColor: newTextHoverColor } = useColorClasses({
    textHoverColor,
  });
  const { borderHoverColor: newBorderHoverColor } = useColorClasses({
    borderHoverColor,
  });

  const variantClasses: Record<string, string> = {
    contained: clsx(
      newTextColor || defaultTextContainedColor,
      newBgColor || defaultBgContainedColor,
      newBgHoverColor || defaultBgHoverContainedColor,
      newTextHoverColor || defaultTextHoverContainedColor
    ),

    outlined: clsx(
      "border",
      newTextColor || defaultTextColor,
      newBorderColor || defaultBorderColor,
      newBgHoverColor || defaultBgHoverColor,
      newTextHoverColor || defaultTextHoverColorClass,
      newBorderHoverColor || ""
    ),

    text: clsx(
      "hover:underline",
      newTextColor || defaultTextColor,
      newBgHoverColor || defaultBgHoverColor,
      newTextHoverColor || ""
    ),
  };

  const linkClass = clsx(
    newTextColor || defaultLinkColor,
    newBgHoverColor || "",
    newBorderColor || "",
    newBorderHoverColor || "",
    newBgColor || "",
    newTextHoverColor || ""
  );

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    {
      [variantClasses[variant]]: variant,
      [linkClass]: isLink,
      "opacity-50 cursor-not-allowed": (isLink
        ? (props as ButtonAsLink).href  || loading
        : (props as ButtonAsButton).disabled || loading),
      "rounded-full": rounded,
      "w-full": full,
    },
    className
  );

  const content = (
    <>
      {loading ? (
        <>
          <Loading color={textColor || "white"} size="1em" />
          <span className="ml-2">Đang tải...</span>
        </>
      ) : (
        <>
          {startIcon && (
            <span
              className={clsx(
                "mr-2 flex items-center text-inherit",
                iconClassName
              )}
            >
              {startIcon}
            </span>
          )}
          <span className={clsx("text-inherit", iconClassName)}>
            {children}
          </span>
          {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </>
      )}
    </>
  );

  function isButton(props: ButtonProps): props is ButtonAsButton {
    return !props.href;
  }

  if (isButton(props)) {
    const buttonProps = restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        className={clsx(classes)}
        onClick={buttonProps.disabled || loading ? undefined : buttonProps.onClick}
        disabled={buttonProps.disabled || loading}
        style={{ width, height }}
        {...buttonProps}
      >
        {content}
      </button>
    );
  } else {
    const linkProps = restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <Link href={href ?? ""} passHref legacyBehavior>
        <a
          className={clsx(classes)}
          style={{ width, height }}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...linkProps}
        >
          {content}
        </a>
      </Link>
    );
  }
};

export default CustomButton;
