import React from "react";
import clsx from "clsx";
import useParseDimension from "@/hooks/useParseDimension";
import Icon from "@/components/icon";

// Định nghĩa kiểu dữ liệu cho các prop
interface OptionsListProps<T> {
  isSelected: (option: T) => boolean;
  heightPerOption: string;
  loading: boolean;
  showOptions: boolean;
  optionsState: T[];
  row: number;
  handleOptionSelect: (option: T) => void;
  getOptionSubLabel: (option: T) => string | null;
  getOptionsLabel: (option: T) => string;
  removeSelectedOption: (option: T) => void;
  optionsListClassName?: string;
  optionsClassName?: string;
}

const OptionsList = <T,>({
  isSelected,
  heightPerOption,
  loading,
  showOptions,
  optionsState,
  row,
  handleOptionSelect,
  getOptionSubLabel,
  getOptionsLabel,
  removeSelectedOption,
  optionsListClassName,
  optionsClassName,
}: OptionsListProps<T>) => {
  const height = useParseDimension(heightPerOption);

  return (
    <>
      {loading && showOptions ? (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full p-2 text-center">
          Đang tải...
        </div>
      ) : (
        <ul
          className={clsx(
            `absolute z-[1000] mt-1 bg-white-100 border border-gray-300 rounded-sm shadow-md transition-all duration-300 ease-in-out w-full bg-white`,
            optionsListClassName
          )}
          style={{
            height: showOptions
              ? optionsState?.length > 0
                ? `${Math.min(optionsState.length, row) * height.value + 2}${
                    height.unit
                  }`
                : "auto"
              : "0px",
            overflow: showOptions
              ? optionsState?.length > 0
                ? "auto"
                : "hidden"
              : "hidden",
            opacity: showOptions ? "1" : "0",
          }}
        >
          {optionsState?.length > 0 ? (
            optionsState.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{ height: heightPerOption }}
                className={clsx(
                  "cursor-pointer p-2 flex items-center transition duration-300 hover:text-yellow-500",
                  {
                    "bg-emerald text-white hover:!text-white": isSelected(
                      option
                    ),
                  },
                  {
                    "border-b-2": index !== optionsState.length - 1,
                  },
                  optionsClassName
                )}
              >
                <span className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                  {getOptionsLabel(option)}
                </span>
                {getOptionSubLabel(option) && (
                  <span className="option-subLabel text-gray-500 text-sm">
                    {" - "} {getOptionSubLabel(option)}
                  </span>
                )}
                {isSelected(option) && (
                  <Icon
                    name="close"
                    size="1.5em"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedOption(option);
                    }}
                  />
                )}
              </li>
            ))
          ) : (
            <li className="p-2 text-center">Không có kết quả phù hợp</li>
          )}
        </ul>
      )}
    </>
  );
};

export default OptionsList;
