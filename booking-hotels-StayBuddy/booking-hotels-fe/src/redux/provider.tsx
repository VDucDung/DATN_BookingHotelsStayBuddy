"use client";

import { PropsWithChildren } from "react";
import ReduxProvider from "./redux-provider";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
