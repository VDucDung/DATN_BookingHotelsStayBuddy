import { useMemo } from "react";

const useParseDimension = (dimensionString: string): { value: number; unit: string } => {
  return useMemo(() => {
    const value = parseFloat(dimensionString);

    if (isNaN(value)) {
      return { value: 0, unit: "rem" };
    }

    const unit = dimensionString.replace(value.toString(), "").trim() || "rem";

    return { value, unit };
  }, [dimensionString]);
};

export default useParseDimension;
