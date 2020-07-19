import { useContext } from "react";

import { ColorMode } from "@architus/facade/theme/color";
import { ColorModeContext } from "@docs/components/ColorModeProvider";
import { useLocation } from "@docs/components/Router";
import { usePathPrefix } from "@docs/data/path-prefix";
import { locationMatches } from "@docs/site";

/**
 * Gets the current active color mode.
 * **Note**: care should be taken when using this to render on the server,
 * as there may be a flash upon initially rendering
 */
export function useColorMode(): ColorMode {
  return useContext(ColorModeContext).mode;
}

/**
 * Determines if the current location matxhes the given path,
 * taking the site prefix into account if applicable.
 * @param path - Absolute site path
 * @returns A tuple containing `[fullMatch, partialMatch]`
 */
export function useLocationMatch(path: string): [boolean, boolean] {
  const location = useLocation();
  const pathPrefix = usePathPrefix();
  const fullMatch = locationMatches({
    pathPrefix: pathPrefix.orNull(),
    path,
    location: location.pathname,
    partial: false,
  });
  const partialMatch = locationMatches({
    pathPrefix: pathPrefix.orNull(),
    path,
    location: location.pathname,
    partial: true,
  });
  return [fullMatch, partialMatch];
}
