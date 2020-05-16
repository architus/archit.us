import { PageProps } from "Components/Router";
import { Guild } from "Utility/types";
import { AnyAction } from "redux";

export interface AppTab {
  icon: string;
  name: string;
  contentClass?: string;
}

export type AppDispatch = (action: AnyAction) => void;

export interface AppPageProps extends PageProps {
  guild: Guild;
}
