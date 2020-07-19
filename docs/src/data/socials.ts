import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

import { Option } from "@architus/lib/option";

export interface Socials {
  github: Option<string>;
  discord: Option<string>;
}

/**
 * Gets the social media types specified in gatsby-config.ts
 */
export function useSocials(): Socials {
  const data = useStaticQuery<GatsbyTypes.HeaderActionBarQuery>(graphql`
    query HeaderActionBar {
      site {
        siteMetadata {
          socials {
            github
            discord
          }
        }
      }
    }
  `);

  return useMemo(
    () => ({
      github: Option.from(data?.site?.siteMetadata?.socials?.github),
      discord: Option.from(data?.site?.siteMetadata?.socials?.discord),
    }),
    [data]
  );
}
