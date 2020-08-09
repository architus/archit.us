import { lighten, darken } from "polished";
import React from "react";
import ReactSelect, { Theme, OptionTypeBase, Props } from "react-select";
import SelectBase, { Props as SelectProps } from "react-select/src/Select";

import { useColorMode } from "@architus/facade/hooks";
import {
  staticColor,
  ColorMode,
  dynamicColor,
  defaultMode,
} from "@architus/facade/theme/color";
import { useInitialRender } from "@architus/lib/hooks";

export * from "react-select";

// From @types/react-select
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StateProps<T extends SelectProps<any>> = Pick<
  T,
  Exclude<
    keyof T,
    | "inputValue"
    | "value"
    | "menuIsOpen"
    | "onChange"
    | "onInputChange"
    | "onMenuClose"
    | "onMenuOpen"
  >
>;

/**
 * Wrapper for react-select that incorporates design system theming.
 * Note: always re-renders once after hydration.
 */
function Select<
  // From @types/react-select
  OptionType extends OptionTypeBase = { label: string; value: string },
  T extends SelectBase<OptionType> = SelectBase<OptionType>
>(
  // From @types/react-select
  props: StateProps<SelectProps<OptionType>> &
    Props<OptionType> &
    SelectProps<OptionType>
): JSX.Element {
  // Force the select component to always re-render once after hydration
  // This seems to prevent some bugs with static building & incorrect default theme
  const initialRender = useInitialRender();

  // Subscribe to the current color mode
  const mode = useColorMode();
  const currentMode = initialRender ? defaultMode : mode;

  // Resolve the correct theme
  const propsTheme = props?.theme;
  let theme: Theme;
  if (typeof propsTheme === "function") {
    theme = propsTheme(mergeThemes(base, colorThemes[currentMode]));
  } else {
    theme = mergeThemes(base, colorThemes[currentMode], propsTheme ?? {});
  }

  return <ReactSelect<OptionType, T> {...props} theme={theme} />;
}

export default Select;

// ? =================
// ? Utility functions
// ? =================

/**
 * Merges two or more react-select theme definitions
 * @param themes - themes, fields in later values have priority
 */
function mergeThemes(...themes: Partial<Theme>[]): Theme {
  return themes.reduce(
    (prev: Partial<Theme>, next: Partial<Theme>) =>
      ({
        ...prev,
        ...next,
        spacing: {
          ...(prev?.spacing ?? {}),
          ...(next?.spacing ?? {}),
        },
        colors: {
          ...(prev?.colors ?? {}),
          ...(next?.colors ?? {}),
        },
      } as Theme),
    {}
  ) as Theme;
}

const base = {
  borderRadius: 6,
  spacing: {
    baseUnit: 4,
    controlHeight: 38,
    menuGutter: 8,
  },
  colors: {
    danger: staticColor("danger"),
    dangerLight: lighten(0.04, staticColor("danger")),
  },
};

// Theme definitions based on the ColorMode
const colorThemes = {
  [ColorMode.Light]: {
    colors: {
      primary: dynamicColor("primary", ColorMode.Light),
      primary75: dynamicColor("primary+10", ColorMode.Light),
      primary50: dynamicColor("primary+20", ColorMode.Light),
      primary25: dynamicColor("primary+30", ColorMode.Light),
      neutral0: dynamicColor("bg+10", ColorMode.Light),
      neutral5: dynamicColor("bg", ColorMode.Light),
      neutral10: dynamicColor("bg", ColorMode.Light),
      neutral20: dynamicColor("bg-10", ColorMode.Light),
      neutral30: dynamicColor("bg-20", ColorMode.Light),
      neutral40: dynamicColor("bg-30", ColorMode.Light),
      neutral50: dynamicColor("bg-40", ColorMode.Light),
      neutral60: lighten(0.12, dynamicColor("text", ColorMode.Light)),
      neutral70: lighten(0.09, dynamicColor("text", ColorMode.Light)),
      neutral80: lighten(0.06, dynamicColor("text", ColorMode.Light)),
      neutral90: lighten(0.03, dynamicColor("text", ColorMode.Light)),
    },
  },
  [ColorMode.Dark]: {
    colors: {
      primary: dynamicColor("primary", ColorMode.Dark),
      primary75: dynamicColor("primary-10", ColorMode.Dark),
      primary50: dynamicColor("primary-20", ColorMode.Dark),
      primary25: dynamicColor("primary-30", ColorMode.Dark),
      neutral0: dynamicColor("bg-10", ColorMode.Dark),
      neutral5: dynamicColor("bg", ColorMode.Dark),
      neutral10: dynamicColor("bg", ColorMode.Dark),
      neutral20: dynamicColor("bg+10", ColorMode.Dark),
      neutral30: dynamicColor("bg+20", ColorMode.Dark),
      neutral40: lighten(0.03, dynamicColor("bg+20", ColorMode.Dark)),
      neutral50: lighten(0.06, dynamicColor("bg+20", ColorMode.Dark)),
      neutral60: darken(0.12, dynamicColor("text", ColorMode.Dark)),
      neutral70: darken(0.09, dynamicColor("text", ColorMode.Dark)),
      neutral80: darken(0.06, dynamicColor("text", ColorMode.Dark)),
      neutral90: darken(0.03, dynamicColor("text", ColorMode.Dark)),
    },
  },
} as const;
