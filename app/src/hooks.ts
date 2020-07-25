import { API_BASE } from "@app/api";
import { useLocation } from "@app/components/Router";
import { usePathPrefix } from "@app/data/path-prefix";
import { useReturnQuery, processIfNotEmptyOrNil } from "@app/utility";
import { locationMatches } from "@architus/lib/path";

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

/**
 * Constructs an oauth URL used to login to Discord
 */
export function useOauthUrl(): string {
  const returnQuery = useReturnQuery();
  return `${API_BASE}/session/login${processIfNotEmptyOrNil(
    returnQuery,
    (q) => `?${q}`
  )}`;
}
