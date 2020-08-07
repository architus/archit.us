import { lighten, darken } from "polished";
import React, { useCallback } from "react";
import Select, { ValueType, Theme } from "react-select";

import { useColorMode } from "@architus/facade/hooks";
import {
  color,
  staticColor,
  ColorMode,
  ColorKey,
  hybridColor,
} from "@architus/facade/theme/color";
import { isDefined } from "@architus/lib/utility";
import { NavigationTreeNode } from "@docs/build/nav";
import NavLabel from "@docs/components/NavLabel";

export type SideNavSelectorProps = {
  value: string;
  onChange: (newValue: string) => void;
  items: Map<string, NavigationTreeNode>;
  className?: string;
  style?: React.CSSProperties;
};

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
}) => {
  const mode = useColorMode();
  return (
    <div className={className} style={style}>
      <Select<NavigationTreeNode>
        value={items.get(value)}
        options={[...items.values()]}
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
        theme={(theme: Theme): Theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: color("primary"),
            primary75: colorSwitch(mode, "primary+10", "primary-10"),
            primary50: colorSwitch(mode, "primary+20", "primary-20"),
            primary25: colorSwitch(mode, "primary+30", "primary-30"),
            danger: color("danger"),
            dangerLight: lighten(0.02, staticColor("danger")),
            neutral0: colorSwitch(mode, "bg+10", "bg-10"),
            neutral5: colorSwitch(mode, "bg", "bg"),
            neutral10: colorSwitch(mode, "bg", "bg"),
            neutral20: colorSwitch(mode, "bg-10", "bg+10"),
            neutral30: colorSwitch(mode, "bg-20", "bg+20"),
            neutral40: colorSwitch(mode, "bg-30", "bg+20", {
              modifyDark: (c: string): string => lighten(0.03, c),
            }),
            neutral50: colorSwitch(mode, "bg-40", "bg+20", {
              modifyDark: (c: string): string => lighten(0.06, c),
            }),
            neutral60: colorSwitch(mode, "text", "text", {
              modifyLight: (c: string): string => lighten(0.03, c),
              modifyDark: (c: string): string => darken(0.03, c),
            }),
            neutral70: colorSwitch(mode, "text", "text", {
              modifyLight: (c: string): string => lighten(0.06, c),
              modifyDark: (c: string): string => darken(0.06, c),
            }),
            neutral80: colorSwitch(mode, "text", "text", {
              modifyLight: (c: string): string => lighten(0.09, c),
              modifyDark: (c: string): string => darken(0.09, c),
            }),
            neutral90: colorSwitch(mode, "text", "text", {
              modifyLight: (c: string): string => lighten(0.12, c),
              modifyDark: (c: string): string => darken(0.12, c),
            }),
          },
        })}
      />
    </div>
  );
};

export default SideNavSelector;

// ? ================
// ? Helper functions
// ? ================

/**
 * Conditionally switches a color based on the two given keys
 * @param mode - Current color mode of the app
 * @param light - Color key to use in light mode
 * @param dark - COlor key to use in dark mode
 */
function colorSwitch(
  mode: ColorMode,
  light: ColorKey,
  dark: ColorKey,
  {
    modifyDark,
    modifyLight,
  }: {
    modifyDark?: (color: string) => string;
    modifyLight?: (color: string) => string;
  } = {}
): string {
  const apply = (
    actualMode: ColorMode,
    key: ColorKey,
    modifyFn?: (color: string) => string
  ): string => {
    const base = hybridColor(key, actualMode);
    return isDefined(modifyFn) ? modifyFn(base) : base;
  };
  return mode === ColorMode.Light
    ? apply(ColorMode.Light, light, modifyLight)
    : apply(ColorMode.Dark, dark, modifyDark);
}
