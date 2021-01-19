import { useStaticQuery, graphql } from "gatsby";

import { Option, Some, None } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";

export type UmamiAnalytics = {
  websiteId: string;
  base: string;
};

/**
 * Gets the site's Umami analytics parameters if they exist
 */
export function useUmamiAnalytics(): Option<UmamiAnalytics> {
  // this seems to be required due to a bug with useStaticQuery in gatsby v2.23.11
  if (process.env.NODE_ENV !== "production") return None;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryResult = useStaticQuery<
    GatsbyTypes.UseUmamiAnalyticsQuery
  >(graphql`
    query UseUmamiAnalytics {
      site {
        siteMetadata {
          umami {
            websiteId
            base
          }
        }
      }
    }
  `);

  const umami = queryResult.site?.siteMetadata?.umami;
  if (
    isDefined(umami) &&
    isDefined(umami.websiteId) &&
    isDefined(umami.base) &&
    (umami.websiteId.length ?? 0) > 0
  ) {
    return Some({
      websiteId: umami.websiteId,
      base: umami.base,
    });
  }

  return None;
}
