import { CreatePagesArgs, Reporter } from "gatsby";

import { GithubUser } from "@docs/build/github-types";
import { NavTree } from "@docs/templates/Docs/frontmatter";
import { Option, Some, None } from "@lib/option";
import { isDefined, isNil, withoutLeading } from "@lib/utility";

/**
 * Page authorship information extracted from GitHub
 */
export type PageAuthorship = Array<{
  committedDate: string;
  author: {
    user: GithubUser;
  };
}>;

/**
 * Attempts to load the page authorship information using the GitHub API,
 * returning `None` if the data couldn't be loaded for any reason
 * @param paths - List of `relativePath` fields extracted from the docs query
 * @param reporter - Gatsby plugin API reporter instance
 * @param graphql - Gatsby graphql query hook
 */
export async function load(
  paths: string[],
  reporter: Reporter,
  graphql: CreatePagesArgs["graphql"]
): Promise<Option<Map<string, PageAuthorship>>> {
  // Make sure token was passed in
  if (process.env.GITHUB_TOKEN == null) {
    [
      "Could not find Github token. Skipping authorship metadata sourcing.",
      "To enable author metadata, set the GITHUB_TOKEN environment variable",
    ].forEach((line) => reporter.warn(line));
    return None;
  }

  // Re-use activity variable
  const activity = reporter.activityTimer(
    `loading page authorship metadata via GitHub integration`
  );
  // activity.start();

  type GithubMetadataQueryResult = {
    site: {
      siteMetadata: {
        github?: {
          owner?: string;
          name?: string;
          docsRoot?: string;
          branch?: string;
        };
      };
    };
  };

  const { data: siteData, errors: siteErrors } = await graphql<
    GithubMetadataQueryResult
  >(`
    query GitHubSourceQuery {
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

  // Make sure no errors ocurred
  if (isDefined(siteErrors)) {
    reporter.warn(
      "An error ocurred while querying 'siteMetadata.github' for page authorship sourcing"
    );
    reporter.warn(siteErrors);
    activity.end();
    return None;
  }

  // Make sure github object was given
  const github = siteData?.site.siteMetadata.github;
  if (isNil(github)) {
    [
      "'github' is a required field in 'siteMetadata' to enable GitHub integration.",
      "Add it in 'gatsby-config.ts'",
    ].forEach((line) => reporter.warn(line));
    activity.end();
    return None;
  }

  // Make sure all fields were given
  const { owner, name, docsRoot, branch } = github;
  if (isNil(owner) || isNil(name) || isNil(docsRoot) || isNil(branch)) {
    [
      "One or more required fields for GitHub integration were missing from 'siteMetadata.github'.",
      "Add them in 'gatsby-config.ts'",
    ].forEach((line) => reporter.warn(line));
    activity.end();
    return None;
  }

  type GithubApiResults = {
    github: {
      repository: {
        object: {
          [key: string]: {
            nodes: PageAuthorship;
          };
        };
      };
    };
  };

  // Here, we use multiple GitHub commits for each docs file,
  // making the name of their query aliases 'f<index>'
  // (the 'f' is needed to make sure the key is not coerced to a number and rejected)
  const { data: githubData, errors: githubErrors } = await graphql<
    GithubApiResults
  >(
    `
      query githubMetadataQuery(
        $owner: String!
        $name: String!
        $branch: String!
        $limit: Int!
      ) {
        github {
          repository(owner: $owner, name: $name) {
            object(expression: $branch) {
              ... on GitHub_Commit {
                ${paths.map(
                  (p, i) => `f${i.toString()}: history(
                  first: $limit,
                  path: "${withoutLeading(docsRoot + p)}"
                ) {
                  nodes {
                    committedDate
                    author {
                      user {
                        name
                        avatarUrl
                        login
                        url
                      }
                    }
                  }
                }`
                )}
              }
            }
          }
        }
      }
    `,
    { owner, name, branch, limit: 100 }
  );

  // Make sure no errors ocurred
  if (isDefined(githubErrors) || isNil(githubData)) {
    reporter.warn(
      "An error ocurred while querying the GitHub API for page authorship sourcing"
    );
    reporter.warn(String(githubErrors));
    activity.end();
    return None;
  }

  // Map object to array with indices
  const pathMap: Map<string, PageAuthorship> = new Map();
  Object.entries(githubData.github.repository.object).forEach(
    ([key, value]) => {
      const idx = parseInt(key.slice(1), 10);
      const path = paths[idx];
      pathMap.set(path, value.nodes);
    }
  );

  activity.end();
  return Some(pathMap);
}

/**
 * Attaches authorship data from GitHub
 * @param subtree - navigation tree (mutated in place)
 * @param metadataMap - authorship data retrieved from the GitHub API
 */
export function attachAuthorship(
  subtree: NavTree,
  metadataMap: Map<string, PageAuthorship>
): void {
  if (isDefined(subtree.originalPath)) {
    const metadata = metadataMap.get(subtree.originalPath);
    if (isDefined(metadata)) {
      const lastModified =
        metadata.length >= 0 && metadata[0] != null
          ? new Date(metadata[0].committedDate)
          : new Date();

      // Build authors list (drop non-unique authors)
      const authors: GithubUser[] = [];
      const logins: Set<string> = new Set();
      metadata.forEach(({ author: { user } }) => {
        if (user != null) {
          if (!logins.has(user.login)) {
            logins.add(user.login);
            authors.push(user);
          }
        }
      });

      // eslint-disable-next-line no-param-reassign
      subtree.history = {
        lastModified: lastModified.getTime().toString(),
        authors,
      };
    }
  }

  subtree.children.forEach((s) => attachAuthorship(s, metadataMap));
}
