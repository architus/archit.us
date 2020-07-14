import { graphql, useStaticQuery } from "gatsby";

export type ApiVersions = {
  restVersion?: string;
  gatewayVersion?: string;
};

/**
 * Hook to get the versions of the APIs from the site metadata,
 * used when displaying routes.
 */
export function useApiVersions(): ApiVersions {
  return (
    useStaticQuery<GatsbyTypes.ApiVersionQuery>(graphql`
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
    `).site?.siteMetadata?.api ?? {}
  );
}
