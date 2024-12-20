/* eslint-disable react/display-name */
import React, { forwardRef, useId, useState, Ref } from "react";
import clsx from "clsx";
import useResponsiveStyle from "@/hooks/useResponsiveStyle";
import Icon from "../icon";

interface TextFieldProps {
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  className?: string;
  width?: string;
  height?: string;
  labelWidth?: string;
  allow?: RegExp | null; 
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; 
  inputClassName?: string;
  labelClassName?: string;
  errorClass?: string;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  rightIconClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  orientation?: "vertical" | "horizontal"; 
  helperText?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      value = "",
      placeholder = "",
      type = "text",
      onChange = () => {},
      error = "",
      label = "",
      className = "",
      width = "100%",
      height = "50px",
      labelWidth = "120px",
      allow,
      inputProps,
      inputClassName = "",
      labelClassName = "",
      errorClass = "",
      disabled = false,
      rightIcon = null,
      rightIconClassName = "",
      onFocus = () => {},
      onBlur = () => {},
      required = false,
      orientation = "vertical",
    },
    inputRef: Ref<HTMLInputElement>
  ) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const widthStyle = useResponsiveStyle(width as string, "w");
    const heightStyle = useResponsiveStyle(height as string, "h");
    const labelWidthStyle = useResponsiveStyle(labelWidth as string, "w");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (allow && allow instanceof RegExp) {
        const filteredValue = event.target.value.replace(allow, "");
        event.target.value = filteredValue;
      }
      onChange(event); 
    };

    const handleFocus = () => {
      onFocus();
      setIsFocused(true);
    };

    const handleBlur = () => {
      onBlur();
      setIsFocused(false);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    const renderRightIcon = () => {
      if (type === "password") {
        return (
          <div
            className={clsx(
              "absolute right-0 p-2 inset-y-0 flex items-center cursor-pointer",
              rightIconClassName
            )}
            onClick={togglePasswordVisibility}
          >
            <Icon
              name={showPassword ? "hidePassword" : "showPassword"}
              strokeWidth={0.1}
              size="1.5em" width={20} height={20}            />
          </div>
        );
      }

      return (
        rightIcon && (
          <div
            className={clsx(
              "absolute right-0 p-2 inset-y-0 flex items-center",
              rightIconClassName
            )}
          >
            {rightIcon}
          </div>
        )
      );
    };

    const verticalInput = (
      <div className={clsx(className)} style={{ ...widthStyle }}>
        <div className={clsx("relative text-lg")}>
          <label
            htmlFor={id}
            className={clsx(
              "absolute left-2 flex items-center transition-all duration-300 ease-in-out z-[100]",
              labelClassName,
              {
                "text-gray-500": !isFocused && !value,
                "text-black top-0 -translate-y-full": isFocused || value,
                "top-1/2 -translate-y-1/2": !isFocused && !value,
              }
            )}
          >
            {required && <p className="text-red-500 mr-1">*</p>}
            <p>{label}</p>
          </label>

          <div className={clsx("relative overflow-hidden", inputClassName)}>
            <input
              id={id}
              ref={inputRef}
              type={inputType}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              className={clsx(
                "w-full border-b-2 bg-transparent outline-none p-2",
                {
                  "cursor-not-allowed bg-gray-200 text-gray-500": disabled,
                  "border-red-500": error,
                  "border-gray-300": !error,
                }
              )}
              style={{ ...heightStyle }}
              {...inputProps}
            />
            {renderRightIcon()}

            {/* underline */}
            {!error && (
              <div
                className={clsx(
                  "w-full absolute bottom-0 left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
                  {
                    "scale-x-0": !isFocused && !value,
                    "scale-x-100": isFocused || value,
                  }
                )}
              />
            )}
          </div>
        </div>

        {error && (
          <div className={clsx("text-red-500 text-sm mt-2", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );

    const horizontalInput = (
      <div>
        <div
          className={clsx(className, "relative flex items-center text-lg")}
          style={{ ...widthStyle }}
        >
          <label
            htmlFor={id}
            style={{ ...labelWidthStyle }}
            className={clsx("flex items-center", labelClassName)}
          >
            {required && <p className="text-red-500 mr-1">*</p>}
            <p>{label}</p>
          </label>
          <div
            className={clsx(
              "flex-shrink-0 flex-grow relative ml-4",
              { "cursor-not-allowed bg-gray-100 text-gray-500": disabled },
              inputClassName
            )}
          >
            <input
              id={id}
              ref={inputRef}
              type={inputType}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              className={clsx(
                "w-full border-b-2 bg-transparent outline-none p-2",
                {
                  "cursor-not-allowed bg-gray-200 text-gray-500": disabled,
                  "border-red-500": error,
                  "border-gray-300": !error,
                }
              )}
              style={{ ...heightStyle }}
              {...inputProps}
            />

            {/* underline */}
            {!error && (
              <div
                className={clsx(
                  "w-full absolute bottom-0 left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
                  {
                    "scale-x-0": !isFocused && !value,
                    "scale-x-100": isFocused || value,
                  },
                  {
                    "bg-gray-300": disabled,
                  }
                )}
              />
            )}

            {renderRightIcon()}
          </div>
        </div>
        {error && (
          <div className={clsx("text-red-500 text-sm mt-1", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );

    return orientation === "vertical" ? verticalInput : horizontalInput;
  }
);

export default TextField;
