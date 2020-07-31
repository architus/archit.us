import { API_BASE } from "@app/api";
import { useLocation } from "@app/components/Router";
import { usePathPrefix } from "@app/data/path-prefix";
import {
  useReturnQuery,
  processIfNotEmptyOrNil,
  splitPath,
} from "@app/utility";
import { Snowflake } from "@app/utility/types";
import { Option } from "@architus/lib/option";
import { locationMatches } from "@architus/lib/path";
import { isDefined, trimPrefix } from "@architus/lib/utility";

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

export interface AppLocation {
  guild: Option<Snowflake>;
  tab: Option<string>;
}

/**
 * Gets the fragments of the current location
 */
export function useFragments(prefix?: string): string[] {
  const location = useLocation();
  const withoutPrefix = isDefined(prefix)
    ? trimPrefix(location.pathname, prefix)
    : location.pathname;
  return splitPath(withoutPrefix).filter(
    (fragment) => fragment.trim().length > 0
  );
}

/**
 * Gets the current app tab-based location
 */
export function useAppLocation(appPrefix: string): AppLocation {
  const fragments = useFragments(appPrefix);
  const guildFragment = fragments.length >= 1 ? fragments[0] : null;
  const tabFragment = fragments.length >= 2 ? fragments[1] : null;
  return {
    guild: Option.from(guildFragment as Snowflake | null),
    tab: Option.from(tabFragment),
  };
}
