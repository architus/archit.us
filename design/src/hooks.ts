import { useContext } from "react";

import { ColorMode, ColorModeContext } from "./theme/color";

/**
 * Gets the current active color mode.
 * **Note**: care should be taken when using this to render on the server,
 * as there may be a flash upon initially rendering
 */
export function useColorMode(): ColorMode {
  return useContext(ColorModeContext).mode;
}
