import React, { useState } from "react";
import clsx from "clsx";
import useColorClasses from "@/hooks/useColorClasses";

interface CustomCheckBoxProps {
  label?: string; 
  checked?: boolean; 
  onChange?: (checked: boolean) => void;
  borderWidth?: string; 
  size?: string;
  className?: string;
  labelClassName?: string; 
  borderColor?: string; 
  error?: string;  
}

const Checkbox: React.FC<CustomCheckBoxProps> = ({
  label = "Checkbox",
  checked = false,
  onChange,
  borderWidth = "2px",
  size = "20px",
  className,
  labelClassName,
  borderColor = "black",
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  return (
    <div className={clsx("flex items-center text-lg", className)}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="appearance-none w-0 h-0 opacity-0 invisible display-none"
        />
        <div
          className={clsx("relative ", newBorderColor)}
          style={{
            borderWidth,
            width: size,
            height: size,
          }}
        >
          <span
            className={clsx("absolute bg-black transition-transform")}
            style={{
              width: `calc(${borderWidth} * 3)`,
              height: borderWidth,
              transform: `rotate(45deg) translate(calc(${borderWidth} / -2), calc(${borderWidth} / -2)) scaleX(${
                isChecked ? 1 : 0
              })`,
              top: "50%",
              left: "20%",
              transformOrigin: "left center",
            }}
          ></span>

          <span
            className={clsx("absolute bg-black transition-transform")}
            style={{
              width: `calc(${borderWidth} * 5)`,
              height: borderWidth,
              transform: `rotate(-45deg) translateY(calc(${borderWidth} * 2)) scaleX(${
                isChecked ? 1 : 0
              })`,
              top: "50%",
              left: "20%",
              transformOrigin: "left center",
            }}
          ></span>
        </div>
        <span className={clsx("ml-2", labelClassName)}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
