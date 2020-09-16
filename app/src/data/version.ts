import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

import { Option } from "@architus/lib/option";

/**
 * Extracts the information used to render the <CompositeBrand> component
 * in the header & footer of the site (the version if given)
 */
export function useVersion(): Option<string> {
  const data = useStaticQuery<GatsbyTypes.VersionQuery>(graphql`
    query Version {
      site {
        siteMetadata {
          version
        }
      }
    }
  `);

  return useMemo(() => Option.from(data?.site?.siteMetadata?.version), [data]);
}
