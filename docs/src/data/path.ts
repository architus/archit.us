import { graphql, useStaticQuery } from "gatsby";

import { Option } from "@lib/option";

/**
 * Gets the site's `pathPrefix` if it is set, else None
 */
export function usePathPrefix(): Option<string> {
  const queryResult = useStaticQuery<GatsbyTypes.UsePathPrefixQuery>(graphql`
    query UsePathPrefix {
      site {
        pathPrefix
      }
    }
  `);

  return Option.from(queryResult.site?.pathPrefix);
}
