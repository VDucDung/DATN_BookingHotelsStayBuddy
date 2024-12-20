"use client";

import { breakpointsWithoutPx } from "@/configs/breakpointConfig";
import { useMemo, useEffect, useState } from "react";

const valueMapping: Record<string, string> = {
  0: "0px",
  full: "100%",
  "1/2": "50%",
  "1/3": "33.3333%",
  "1/4": "25%",
  "1/5": "20%",
  "1/6": "16.6667%",
};

const propertyMapping: Record<string, string> = {
  w: "width",
  h: "height",
  "min-w": "min-width",
  "min-h": "min-height",
  "max-w": "max-width",
  "max-h": "max-height",
};

interface AppliedStyle {
  value: string;
  breakpoint: number;
}

const parseStyleString = (
  styleString: string,
  windowWidth: number,
  failBackProperty: string
): Record<string, string> => {
  const style: Record<string, string> = {};

  if (typeof styleString !== 'string') {
    console.warn("styleString must be a string");
    return style; 
  }
  
  const entries = styleString?.split(" ") || [];

  const appliedStyles: Record<string, AppliedStyle> = {};
  const defaultStyles: Record<string, string> = {};

  entries.forEach((entry) => {
    const [breakpoint, classValue] = entry?.split(":") || [];

    if (breakpoint && classValue && breakpointsWithoutPx[breakpoint]) {
      let property = "";
      let value = "";

      const classValueArray = classValue?.split("-") || [];
      property =
        classValueArray.length === 2
          ? classValueArray[0]
          : classValueArray.slice(0, -1).join("-");

      value = classValueArray[classValueArray.length - 1];

      if (breakpointsWithoutPx[breakpoint] <= windowWidth) {
        const cssProperty = propertyMapping[property];
        const cssValue = valueMapping[value] || value?.slice(1, -1);
        if (
          !appliedStyles[cssProperty] ||
          breakpointsWithoutPx[breakpoint] >
            appliedStyles[cssProperty]?.breakpoint
        ) {
          appliedStyles[cssProperty] = {
            value: cssValue,
            breakpoint: breakpointsWithoutPx[breakpoint],
          };
        }
      }
    } else if (!breakpointsWithoutPx[breakpoint]) {
      let property = "";
      let value = "";

      const entryArray = entry?.split("-") || [];
      property = entryArray.slice(0, -1).join("-");
      value = entryArray[entryArray.length - 1];

      if (property && value) {
        const cssProperty = propertyMapping[property];
        const cssValue = valueMapping[value] || value?.slice(1, -1);
        defaultStyles[cssProperty] = cssValue;
      } else {
        const cssProperty = propertyMapping[failBackProperty];
        const cssValue = entry;
        defaultStyles[cssProperty] = cssValue;
      }
    }
  });

  Object.keys(appliedStyles).forEach((cssProperty) => {
    style[cssProperty] = appliedStyles[cssProperty].value;
  });

  Object.keys(defaultStyles).forEach((cssProperty) => {
    if (!style[cssProperty]) {
      style[cssProperty] = defaultStyles[cssProperty];
    }
  });

  return style;
};
const getWindow = () => {
  if (typeof window !== "undefined") {
    return window;
  }
  return null;
};
const useResponsiveStyle = (
  styleString: string,
  failBackProperty: string
): Record<string, string> => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const window = getWindow();
      if (window) {
        setWindowWidth(window.innerWidth);
        
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }
  }, []);

  const style = useMemo(
    () => {
      if (typeof window === "undefined") {
        return {};
      }
      return parseStyleString(styleString as string, windowWidth, failBackProperty);
    },
    [styleString, windowWidth, failBackProperty]
  );

  return style;
};

export default useResponsiveStyle;
