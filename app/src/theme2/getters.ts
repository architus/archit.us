import { css } from "@xstyled/emotion";
import { th, ThemeGetterFunc, breakpoints } from "@xstyled/system";

import { Color, ColorInstance } from "./color";
import {
  WithBreakpointArgs,
  ColorMode,
  ColorKey,
  parseThemeColor,
} from "./tokens";
import { isNil, isDefined } from "@app/utility";

/**
 * Adds opacity to a color from the theme.
 *
 * **Note**: this adjustment is only possible for **static** theme colors (ones that
 * don't change depending on the current color mode (i.e. light/dark theme)). To create
 * custom colors dependent on the current color theme, see `useThemeColor`
 * @param key - Color key from the theme
 * @param amount - Amount of opacity to have in the final color (alpha level)
 */
export function opacity(key: ColorKey, amount: number): ThemeGetterFunc {
  const inner = th.color(key);
  return (props: unknown): string => {
    const resolvedColor = inner(props);
    const color = Color(parseThemeColor(resolvedColor).getOrElse("#000000"));
    color.setAlpha(color.getAlpha() * amount);
    return color.toString();
  };
}

/**
 * Adjusts a static color from the theme
 *
 * **Note**: this adjustment is only possible for **static** theme colors (ones that
 * don't change depending on the current color mode (i.e. light/dark theme)). To create
 * custom colors dependent on the current color theme, see `useThemeColor`
 * @param key - Color key from the theme
 * @param amount - Adjustment function to apply to the Color
 */
export function adjust(
  key: ColorKey,
  adjustment: (color: ColorInstance) => ColorInstance | void
): ThemeGetterFunc {
  const inner = th.color(key);
  return (props: unknown): string => {
    const resolvedColor = inner(props);
    const color = Color(resolvedColor);
    const result = adjustment(color);
    return isDefined(result)
      ? (result as ColorInstance).toString()
      : color.toString();
  };
}

/**
 * Spreads an optionally responsive prop (`WithBreakpointArgs<T>`) to a call to
 * Xstyled's `breakpoints` function, allowing custom props to have box-like optionally
 * responsive behavior.
 *
 * @example
 * ```tsx
 * const StyledBox = styled.divBox`
 *   & > span {
 *     ${renderResponsiveProps("innerOpacity", "opacity")};
 *   }
 * `
 *
 * type FancyBoxProps = {
 *   // Standard styled system prop
 *   opacity?: number | BreakpointObject<number>;
 *   // Custom prop
 *   innerOpacity?: number | BreakpointObject<number>;
 * }
 *
 * const FancyBox: React.FC<BoxLikeProps> = ({
 *   opacity = 1.0,
 *   innerOpacity = 0.5,
 * }) => <StyledBox opacity={opacity} innerOpacity={innerOpacity} />;
 * ```
 * @param sourceProp - Source prop key (to be extracted)
 * @param cssAttribute - Target css attribute to render to
 */
export function renderResponsiveProp<P extends string, C extends string>(
  sourceProp: P,
  cssAttribute: C
): ThemeGetterFunc {
  return (props: WithBreakpointArgs<{ [K in keyof P]: unknown }>): string => {
    const sourcePropValue = props[sourceProp as keyof typeof props];
    if (isNil(sourcePropValue)) return "";
    if (typeof sourcePropValue === "object") {
      const breakpointKeys = Object.keys(sourcePropValue as object);
      const builtObject: Record<string, unknown> = {};
      breakpointKeys.forEach((breakpoint) => {
        builtObject[breakpoint] = css`
          ${cssAttribute}: ${String(
            (sourcePropValue as Record<string, unknown>)[breakpoint]
          )}
        `;
      });
      return breakpoints(builtObject)(props);
    }

    return `${cssAttribute}: ${String(sourcePropValue)}`;
  };
}

/**
 * Scopes a block of attributes/selectors to be active only during a given color mode.
 * Useful for manual adjustments based on dark/light color modes in the app.
 *
 * **Note**: if the adjustment is related to color and could be used in more than one
 * place, consider adding the colors to `theme.colors` instead.
 * @param colorMode - Color mode for the inner styles to be active in
 * @param innerCss - Inner css (requires `css` wrapper and to use complete attributes)
 */
export function mode(
  colorMode: ColorMode,
  innerCss: string
): (props: unknown) => string[] {
  const bodyClass = `xstyled-color-mode-${colorMode}`;
  return (): string[] => [`body.${bodyClass} & {`, innerCss, `}`];
}
