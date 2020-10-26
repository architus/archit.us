import React, { useCallback } from "react";

import { isDefined } from "@architus/lib/utility";
import { NavigationTreeNode } from "@docs/build/nav";
import NavLabel from "@docs/components/NavLabel";
import Select, { ValueType } from "@docs/components/Select";

type SideNavSelectorPropsBase = {
  value: string;
  onChange: (newValue: string) => void;
  items: Map<string, NavigationTreeNode>;
  className?: string;
  style?: React.CSSProperties;
};
export type SideNavSelectorProps = SideNavSelectorPropsBase &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof SideNavSelectorPropsBase>;

/**
 * Select box to use to change between top-level navigation trees on mobile
 * or other devices where displaying the header links is infeasible
 */
const SideNavSelector: React.FC<SideNavSelectorProps> = ({
  value,
  onChange,
  items,
  className,
  style,
  ...rest
}) => (
  <div className={className} style={style} {...rest}>
    <Select<NavigationTreeNode>
      value={items.get(value)}
      options={[...items.values()]}
      aria-label="Select navigation root"
      onChange={useCallback(
        (option: ValueType<NavigationTreeNode>): void => {
          if (isDefined(option)) {
            if (Array.isArray(option)) {
              if (option.length > 0) {
                onChange((option[0] as NavigationTreeNode).path);
              }
            } else {
              onChange((option as NavigationTreeNode).path);
            }
          }
        },
        [onChange]
      )}
      getOptionValue={(option: NavigationTreeNode): string => option.path}
      getOptionLabel={(option: NavigationTreeNode): string =>
        ((
          <NavLabel text={option.label} badge={option.badge} />
        ) as unknown) as string
      }
      isSearchable={false}
    />
  </div>
);

export default SideNavSelector;
