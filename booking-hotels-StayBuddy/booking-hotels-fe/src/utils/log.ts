/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const LogApp = (
  key: any,
  value?: any,
  ...optionalParams: any[]
): void => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    value ? console.log(key, value, ...optionalParams) : console.log(key);
  }
};
