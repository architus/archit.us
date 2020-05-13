import tinycolor from "tinycolor2";
import { th, ThemeGetterFunc } from "@xstyled/system";

export function opacity(key: string, amount: number): ThemeGetterFunc {
  const inner = th.color(key);
  return (props: unknown): string => {
    const color = tinycolor(inner(props));
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
