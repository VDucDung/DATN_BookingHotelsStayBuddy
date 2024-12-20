"use client";

import { breakpoints } from "@/configs/breakpointConfig";
import { useEffect, useMemo } from "react";

type Breakpoint = keyof typeof breakpoints;

const useBreakpoint = (breakpoint: Breakpoint = "sm"): boolean => {
  const mediaQuery = useMemo(() => {
    return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
  }, [breakpoint]);

  useEffect(() => {
    const handleResize = () => {
      return mediaQuery.matches;
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [mediaQuery]);

  return mediaQuery.matches;
};

export default useBreakpoint;
