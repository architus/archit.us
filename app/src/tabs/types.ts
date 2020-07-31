import { PageProps } from "@app/components/Router";
import { Guild } from "@app/utility/types";

export interface BaseAppProps extends PageProps {
  // Callback function is used to prevent the drawer from opening
  // in edge cases involving horizontal scrolling on mobile
  ignoreDrawerScroll: () => void;
  showGuildAddModal: () => void;
}

/**
 * Props injected to each tab component
 */
export interface TabProps extends BaseAppProps {
  guild: Guild;
}

/**
 * Props injected to each tab placeholder component
 */
export type PlaceholderProps = BaseAppProps;

/**
 * Definition of each application tab
 */
export interface TabDefinition {
  path: string;
  name: string;
  icon: React.ElementType;
  component: React.ElementType<TabProps>;
  placeholder?: React.ElementType<PlaceholderProps>;
  contentClass?: string;
  tooltip?: string;
}
