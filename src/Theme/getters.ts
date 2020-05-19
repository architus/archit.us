import tinycolor from "tinycolor2";
import { th, ThemeGetterFunc, breakpoints } from "@xstyled/system";
import { isNil } from "Utility";
import { css } from "@xstyled/emotion";
import { WithBreakpointArgs } from "./tokens";

export function opacity(key: string, amount: number): ThemeGetterFunc {
  const inner = th.color(key);
  return (props: unknown): string => {
    const resolvedColor = inner(props);
    const color = tinycolor(resolvedColor);
    color.setAlpha(color.getAlpha() * amount);
    return color.toString();
  };
}

export function blendColors(
  keyA: string,
  keyB: string,
  mu: number
): (props: unknown) => tinycolor.Instance {
  const aGetter = th.color(keyA);
  const bGetter = th.color(keyB);
  return (props: unknown): tinycolor.Instance => {
    const colorA = tinycolor(aGetter(props)).toRgb();
    const colorB = tinycolor(bGetter(props)).toRgb();
    const oneMinusMu = 1 - mu;
    const r = colorA.r * mu + colorB.r * oneMinusMu;
    const g = colorA.g * mu + colorB.g * oneMinusMu;
    const b = colorA.b * mu + colorB.b * oneMinusMu;
    const a = colorA.a * mu + colorB.a * oneMinusMu;
    return tinycolor({ r, g, b, a });
  };
}

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
