import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

import { Option, Some, None } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";

export interface GithubMetadata {
  owner: string;
  name: string;
  docsRoot: string;
  branch: string;
}

/**
 * Gets the github metadata specified in gatsby-config.ts,
 * used to show "Edit" buttons at the bottom of articles
 */
export function useGithubMetadata(): Option<GithubMetadata> {
  const data = useStaticQuery<GatsbyTypes.GitHubMetadataQuery>(graphql`
    query GitHubMetadata {
      site {
        siteMetadata {
          github {
            owner
            name
            docsRoot
            branch
          }
        }
      }
    }
  `);

  return useMemo(() => {
    const github = data?.site?.siteMetadata?.github;
    if (isDefined(github)) {
      const { owner, name, docsRoot, branch } = github;
      if (
        isDefined(owner) &&
        isDefined(name) &&
        isDefined(docsRoot) &&
        isDefined(branch)
      ) {
        return Some({
          owner,
          name,
          docsRoot,
          branch,
        });
      }
    }
    return None;
  }, [data]);
}
