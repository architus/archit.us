import { useState } from "react";

import { API_BASE } from "@app/api";
import { useLocation } from "@app/components/Router";
import { usePathPrefix } from "@app/data/path-prefix";
import { processIfNotEmptyOrNil, splitPath, isProduction } from "@app/utility";
import { Snowflake } from "@app/utility/types";
import { useEffectOnce } from "@architus/lib/hooks";
import { Option } from "@architus/lib/option";
import {
  locationMatches,
  withoutTrailing,
  withoutLeading,
  normalizePath,
} from "@architus/lib/path";
import { isDefined, trimPrefix } from "@architus/lib/utility";

export function useBasePath(path = "/"): string {
  let pathPrefix = usePathPrefix().getOrElse("/");
  if (pathPrefix !== "/") {
    pathPrefix = `/${withoutTrailing(withoutLeading(pathPrefix))}`;
  } else {
    pathPrefix = "";
  }

  return `${pathPrefix}/${withoutLeading(path)}`;
}

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
 * Gets the optional encoded return query param if not in production mode (where the
 * return URL is automatically the production URL)
 *
 * **Note: Causes a re-render due to `useEffectOnce`**
 */
export function useReturnQuery(): string {
  const appPath = useBasePath("/app");
  const [returnQuery, setReturnQuery] = useState<string>("");
  useEffectOnce(() => {
    if (!isProduction && returnQuery === "") {
      let returnPath = appPath;
      if (window.location.pathname.startsWith(appPath)) {
        // Enable deep-linking
        returnPath = window.location.pathname;
      }

      const returnUrl = `${window.location.protocol}//${window.location.host}${returnPath}`;
      const encoded = encodeURIComponent(returnUrl);
      setReturnQuery(`return=${encoded}`);
    }
  });
  return returnQuery;
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
 * Gets the fragments of the current location,
 * subtracting the prefix if given.
 * Note: always removes the global path prefix if configured
 */
export function useFragments(prefix?: string): string[] {
  const location = useLocation().pathname;
  const pathPrefix = usePathPrefix();
  const withoutPathPrefix = pathPrefix.isDefined()
    ? normalizePath(trimPrefix(location, pathPrefix.get))
    : location;
  const withoutPrefixes = isDefined(prefix)
    ? trimPrefix(withoutPathPrefix, prefix)
    : withoutPathPrefix;
  return splitPath(withoutPrefixes).filter(
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
