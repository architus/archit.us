import { useColorMode, useTheme } from "@xstyled/emotion";
import { isDefined, isNil } from "Utility";
import { Theme, ColorMode } from "./tokens";

type ColorKey = Exclude<keyof Theme["colors"], "modes">;

export function useThemeColor(key: ColorKey): string {
  const theme = useTheme();
  const colorMode = useColorMode()[0] as ColorMode;
  const { colors } = theme;
  if (isNil(colors)) return "#000000";

  const { modes } = colors;
  if (isDefined(modes) && colorMode in modes) {
    const mode = modes[colorMode as keyof typeof modes];
    return mode[key as keyof typeof mode] ?? "#000000";
  }

  return colors[key] ?? "#000000";
}
