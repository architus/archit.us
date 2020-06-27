import { useContext } from "react";

import { ColorMode } from "@design/theme";
import { ColorModeContext } from "@docs/components/ColorModeProvider";

/**
 * Gets the current active color mode.
 * **Note**: care should be taken when using this to render on the server,
 * as there may be a flash upon initially rendering
 */
export function useColorMode(): ColorMode {
  return useContext(ColorModeContext).mode;
}
