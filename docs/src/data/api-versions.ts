import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { Option } from "@architus/lib/option";

export interface ApiVersions {
  rest: Option<string>;
  gateway: Option<string>;
}

/**
 * Hook to get the versions of the APIs from the site metadata,
 * used when displaying routes.
 */
export function useApiVersions(): ApiVersions {
  const data = useStaticQuery<GatsbyTypes.ApiVersionQuery>(graphql`
    query ApiVersion {
      site {
        siteMetadata {
          api {
            restVersion
            gatewayVersion
          }
        }
      }
    }
  `);

  return useMemo(
    () => ({
      rest: Option.from(data?.site?.siteMetadata?.api?.restVersion),
      gateway: Option.from(data?.site?.siteMetadata?.api?.gatewayVersion),
    }),
    [data]
  );
}
