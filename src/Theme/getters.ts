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
