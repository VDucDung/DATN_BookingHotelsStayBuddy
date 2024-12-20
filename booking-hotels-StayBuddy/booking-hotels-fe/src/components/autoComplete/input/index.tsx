import React, { forwardRef } from "react";
import clsx from "clsx";
import Loading from "@/components/loading";
import Icon from "@/components/icon";
interface InputProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  loading: boolean;
  showOptions: boolean;
  onClick: () => void;
  onBlur: () => void;
  disabled?: boolean;
  id?: string;
  height?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputValue,
      handleInputChange,
      clearInput,
      loading,
      showOptions,
      onClick,
      onBlur,
      disabled = false,
      id,
      height,
    },
    ref
  ) => {
    return (
      <div
        className={clsx("input-container flex items-center gap-4", {
          "bg-gray-100": disabled,
        })}
        onClick={onClick}
        style={{ height }}
      >
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          className="border-0 outline-none w-full bg-transparent box-border p-3 h-full"
        />
        <div className="flex items-center gap-x-2 mr-2">
          {loading && <Loading size="25px" color="text-gray-500" />}
          {inputValue && (
            <button
              type="button"
              onClick={clearInput}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-0 m-0 flex items-center"
            >
              <Icon name="close" size={2} color="text-gray-500" />
            </button>
          )}
          <Icon
            name="arrowDown"
            size={1.5}
            color="text-gray-500"
            className={clsx("transform transition-transform duration-300", {
              "rotate-180": showOptions,
            })}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
