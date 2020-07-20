import React from "react";

import { AppDispatch } from "@app/dynamic/AppRoot/types";

export type NavigationContext = {
  defaultPath: string;
};

export const NavigationContext = React.createContext<NavigationContext>({
  defaultPath: "",
});

export type ScrollContext = {
  scrollHandler: () => void;
};

export const ScrollContext = React.createContext<ScrollContext>({
  scrollHandler: () => undefined,
});

export type AppContext = {
  dispatch: AppDispatch;
};

export const AppContext = React.createContext<AppContext>({
  dispatch: () => undefined,
});
