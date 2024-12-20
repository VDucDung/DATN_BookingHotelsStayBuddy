import { useState, useRef, useEffect, ReactNode } from "react";
import clsx from "clsx";
import useResponsiveStyle from "@/hooks/useResponsiveStyle";
import useParseDimension from "@/hooks/useParseDimension";
import CustomButton from "../button/CustomButton";
import Icon from "../icon";

interface AccordionProps {
  children: ReactNode; 
  minHeight?: string; 
  maxHeight?: string; 
  className?: string; 
  buttonClassName?: string; 
  iconClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  minHeight = "100px",
  maxHeight = "",
  className,
  buttonClassName,
  iconClassName,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { "max-height": newMaxHeightStyle } = useResponsiveStyle(
    maxHeight,
    "max-h"
  );

  const { "min-height": newMinHeightStyle } = useResponsiveStyle(
    minHeight,
    "min-h"
  );

  const { value: newMinHeightStyleValue } =
    useParseDimension(newMinHeightStyle);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const showToggleButton = contentHeight > newMinHeightStyleValue;

  return (
    <div className={clsx("w-full", className)}>
      <div
        ref={contentRef}
        className="transition-max-height duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen
            ? newMaxHeightStyle || `${contentHeight}px`
            : newMinHeightStyle,
        }}
      >
        {children}
      </div>

      {showToggleButton && (
        <CustomButton
          type="button"
          onClick={toggleAccordion}
          variant="text"
          bgHoverColor="transparent"
          className={clsx("mx-auto", buttonClassName)}
          startIcon={
            <Icon
              name="arrowDown"
              size="1em"
              className={clsx(
                "transition-transform ease-in-out duration-500",
                {
                  "rotate-180": isOpen,
                  "rotate-0": !isOpen,
                },
                iconClassName
              )}
            />
          }
        >
          {isOpen ? "Thu gọn" : "Xem thêm"}
        </CustomButton>
      )}
    </div>
  );
};

export default Accordion;
