import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

import { Option } from "@architus/lib/option";

export interface SEOData {
  pathPrefix: Option<string>;
  title: Option<string>;
  description: Option<string>;
  author: Option<string>;
  themeColor: Option<string>;
  msTileColor: Option<string>;
}

/**
 * Gets the SEO data used when rendering the <SEO> component
 * from the site metadata (injected from gatsby-config.ts)
 */
export function useSEOData(): SEOData {
  const { site } = useStaticQuery<GatsbyTypes.SEOQuery>(
    graphql`
      query SEO {
        site {
          pathPrefix
          siteMetadata {
            title
            description
            author
            themeColor
            msTileColor
          }
        }
      }
    `
  );

  return useMemo(
    () => ({
      pathPrefix: Option.from(site?.pathPrefix),
      title: Option.from(site?.siteMetadata?.title),
      description: Option.from(site?.siteMetadata?.description),
      author: Option.from(site?.siteMetadata?.author),
      themeColor: Option.from(site?.siteMetadata?.themeColor),
      msTileColor: Option.from(site?.siteMetadata?.msTileColor),
    }),
    [site]
  );
}
