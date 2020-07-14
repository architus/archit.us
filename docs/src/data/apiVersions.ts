import { graphql, useStaticQuery } from "gatsby";

export type ApiVersions = {
  restVersion?: string;
  gatewayVersion?: string;
};

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
