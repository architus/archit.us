import { PageProps } from "Components/Router";
import { useLocation } from "Utility";
import { Guild } from "Utility/types";
import { AnyAction } from "redux";
import { splitPath } from "Utility/primitives";
import { APP_PATH_ROOT } from "./config";

export interface AppTab {
  icon: string;
  name: string;
  contentClass?: string;
}

export type AppDispatch = (action: AnyAction) => void;

export interface AppPageProps extends PageProps {
  guild: Guild;
}

/**
 * Gets the fragments of the current location, removing the app path root if set
 */
export function getFragments(): string[] {
  const withoutPrefix = window.location.pathname.replace(APP_PATH_ROOT, "");
  return splitPath(withoutPrefix).filter(
    (fragment) => fragment.trim().length > 0
  );
}

/**
 * Gets the fragments of the current location, removing the app path root if set
 * Re-renders upon location change
 */
export function useFragments(): string[] {
  const { location } = useLocation();
  const withoutPrefix = location.pathname.replace(APP_PATH_ROOT, "");
  return splitPath(withoutPrefix).filter(
    (fragment) => fragment.trim().length > 0
  );
}
