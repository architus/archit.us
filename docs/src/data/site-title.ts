import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

import { Option } from "@architus/lib/option";

export interface SiteTitle {
  title: string;
  version: Option<string>;
}

/**
 * Extracts the information used to render the <CompositeBrand> component
 * in the header & footer of the site, including the version if given
 */
export function useSiteTitle(): SiteTitle {
  const data = useStaticQuery<GatsbyTypes.SiteTitleQuery>(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          headerTitle
          version
        }
      }
    }
  `);

  return useMemo(
    () => ({
      title: data?.site?.siteMetadata?.headerTitle ?? "Documentation",
      version: Option.from(data?.site?.siteMetadata?.version),
    }),
    [data]
  );
}
