import { locationMatches } from "@architus/lib/path";
import { useLocation } from "@docs/components/Router";
import { usePathPrefix } from "@docs/data/path-prefix";

/**
 * Determines if the current location matches the given path,
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
