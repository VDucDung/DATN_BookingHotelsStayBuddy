/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useRef, useId, memo, useCallback } from "react";
import clsx from "clsx";
import { useFormikContext } from "formik";
import useDebounce from "@/hooks/useDebouce";
import useResponsiveStyle from "@/hooks/useResponsiveStyle";
import SelectedTags from "./selectedTags";
import OptionsList from "./optionsList";
import Input from "./input";

interface AutocompleteProps {
  options?: any[];
  asyncRequest?: ((inputValue: string) => Promise<any>) | null;
  getOptionsLabel?: (option: any) => string;
  getOptionSubLabel?: (option: any) => string | null;
  isEqualValue?: (val: any, opt: any) => boolean;
  isCloseAfterSelect?: boolean;
  asyncRequestHelper?: (res: any) => any;
  multiple?: boolean;
  width?: string;
  heightPerOption?: string;
  row?: number;
  className?: string;
  autoFetch?: boolean;
  height?: string;
  onChange?: (value: any) => void;
  onBlur?: any;
  error?: string;
  label?: string;
  labelWidth?: string;
  labelClassName?: string;
  optionsListClassName?: string;
  optionsClassName?: string;
  orientation?: 'vertical' | 'horizontal';
  asyncRequestDeps?: string;
  errorClass?: string;
  filterActive?: boolean;
  value: any;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options = [],
  asyncRequest = null,
  getOptionsLabel = (option) => option?.label,
  getOptionSubLabel = () => null,
  isEqualValue = (val, opt) => val?.id === opt?.id,
  isCloseAfterSelect = true,
  asyncRequestHelper = (res) => res,
  multiple = false,
  width = "100%",
  heightPerOption = "50px",
  row = 5,
  className = "",
  autoFetch = true,
  height = "50px",
  onChange = () => {},
  onBlur = () => {},
  error = "",
  label = "",
  labelWidth = "70px",
  labelClassName = "",
  optionsListClassName = "",
  optionsClassName = "",
  orientation = "vertical",
  asyncRequestDeps = "",
  errorClass,
  filterActive = false,
  value,
  name,
  disabled,
  required,
}) => {
  const { values } = useFormikContext<any>();

  const [optionsState, setOptions] = useState<any[]>(options);
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInputValue = useDebounce(inputValue, 500);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<any>(multiple ? [] : value);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const labelRef = useRef<HTMLLabelElement>(null);
  const id = useId();

  const heightStyle = useResponsiveStyle(height as string, "h");
  const widthStyle = useResponsiveStyle(width as string, "w");

  useEffect(() => {
    if (options?.length > 0) {
      setOptions(options);
    }
  }, [options]);

  const fetchData = useCallback(async () => {
    if (!asyncRequest) return;
  
    setLoading(true);
    const result = await asyncRequest(inputValue);
    const transformedData = asyncRequestHelper(result);
    setOptions(transformedData);
    setLoading(false);
  }, [asyncRequest, asyncRequestHelper, inputValue, setLoading, setOptions]);

  useEffect(() => {
    if (autoFetch) {
      if (asyncRequestDeps && values[asyncRequestDeps]) {
        fetchData();
      } else if (!asyncRequestDeps) {
        fetchData();
      }
    }
  }, [asyncRequestDeps, autoFetch, fetchData, values]);

  useEffect(() => {
    if (filterActive) return;
    if (debouncedInputValue?.trim() && isUserInput) {
      fetchData();
    }
  }, [debouncedInputValue, fetchData, filterActive, isUserInput]);

  const handleFocus = () => {
    setShowOptions(true);
    if (!autoFetch && !showOptions && !isUserInput) {
      fetchData();
    }
  };

  useEffect(() => {
    const filterOptions = () => {
      if (inputValue && (!asyncRequest || optionsState?.length > 0)) {
        setFilteredOptions(
          optionsState.filter((option) =>
            getOptionsLabel(option)
              ?.toLowerCase()
              ?.trim()
              ?.includes(inputValue.toLowerCase())
          )
        );
      } else {
        setFilteredOptions(optionsState);
      }
    };

    filterOptions();
  }, [asyncRequest, getOptionsLabel, inputValue, optionsState]);

  useEffect(() => {
    setSelectedValues(value);
    setInputValue(getOptionsLabel(value) || "");
  }, [getOptionsLabel, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowOptions(true);
    setIsUserInput(true);
  };

  const handleOptionSelect = (option: any) => {
    let newSelectedValues: any;

    if (multiple) {
      if (selectedValues.some((selected: any) => isEqualValue(selected, option))) {
        newSelectedValues = selectedValues.filter(
          (item: any) => !isEqualValue(item, option)
        );
      } else {
        newSelectedValues = [...selectedValues, option];
        setShowOptions(!isCloseAfterSelect);
      }
    } else {
      newSelectedValues = option;
      setInputValue(getOptionsLabel(option));
      setShowOptions(!isCloseAfterSelect);
      setIsUserInput(false);
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearInput = () => {
    setSelectedValues(multiple ? [] : null);
    setInputValue("");
    setIsUserInput(true);
    onChange("");
  };

  const clearAllSelected = () => {
    setSelectedValues([]);
    setInputValue("");
    onChange("");
  };

  const removeSelectedOption = (option: any) => {
    const newSelectedValues = multiple
      ? selectedValues.filter((selected: any) => !isEqualValue(selected, option))
      : null;
    setSelectedValues(newSelectedValues);
    setInputValue("");
    onChange(multiple ? newSelectedValues : null);
    setIsUserInput(true);
  };

  const isSelected = (option: any) => {
    return multiple
      ? selectedValues.some((selected: any) => isEqualValue(selected, option))
      : selectedValues && isEqualValue(selectedValues, option);
  };

  const visibleTags = multiple ? selectedValues?.slice(0, 2) : [];
  const hiddenTagCount =
    selectedValues?.length > 2 ? selectedValues.length - 2 : 0;

  const verticalAutocomplete = () => {
    return (
      <div
        className={clsx(
          "relative h-full text-lg",
          { "pointer-events-none": disabled },
          className
        )}
        ref={inputContainerRef}
        style={{ ...widthStyle, ...heightStyle }}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <label
          htmlFor={id}
          className={clsx(
            "absolute left-2 transition-all duration-300 ease-in-out z-[100]",
            labelClassName,
            {
              "text-black top-0 -translate-y-full": showOptions || inputValue,
              "top-1/2 -translate-y-1/2 text-gray-500":
                !showOptions && !inputValue,
              "text-gray-300": disabled,
            }
          )}
        >
          {required && <span className="text-red-500">*</span>}
          <span> {label}</span>
        </label>
        <div
          className={clsx(
            "relative transition-all duration-300 border-b-2 w-full",
            {
              "border-gray-300": !showOptions && !error && !disabled,
              "border-red-500": error && !disabled,
            }
          )}
        >
          {multiple && (
            <SelectedTags
              visibleTags={visibleTags}
              getOptionsLabel={getOptionsLabel}
              hiddenTagCount={hiddenTagCount}
              clearAllSelected={clearAllSelected}
              selectedValues={selectedValues}
              removeSelectedOption={removeSelectedOption}
            />
          )}

          <Input
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            clearInput={clearInput}
            loading={loading}
            showOptions={showOptions}
            height={height}
            onClick={handleFocus}
            onBlur={onBlur}
            disabled={disabled}
            ref={inputRef}
            id={id}
          />

          <OptionsList
            isSelected={isSelected}
            heightPerOption={heightPerOption}
            loading={loading}
            showOptions={showOptions}
            optionsState={filterActive ? filteredOptions : optionsState}
            row={row}
            handleOptionSelect={handleOptionSelect}
            getOptionSubLabel={getOptionSubLabel}
            getOptionsLabel={getOptionsLabel}
            removeSelectedOption={removeSelectedOption}
            optionsListClassName={optionsListClassName}
            optionsClassName={optionsClassName}
          />
        </div>

        <div
          className={clsx(
            "w-full absolute bottom-[2px] left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
            {
              "scale-x-0": !showOptions && !inputValue,
              "scale-x-100": showOptions || inputValue,
            }
          )}
        />

        {error && (
          <div className={clsx("text-red-500 text-sm mt-1 ml-2", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );
  };

  return verticalAutocomplete();
};

export default memo(Autocomplete);
