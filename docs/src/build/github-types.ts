/**
 * GitHub user passed via page authorship history
 */
export type GithubUser = {
  name?: string;
  avatarUrl?: string;
  login: string;
  url: string;
};
export const githubUserType = `
  type GithubUser @dontInfer {
    name: String
    avatarUrl: String
    login: String!
    url: String!
  }
`;

/**
 * Optional GitHub History retrieved from the GitHub API integration
 */
export type History = {
  lastModified: string;
  authors: readonly GithubUser[];
};
export const historyType = `
  type History @dontInfer {
    # This is a number-like, but GraphQL doesn't support 64-bit integers
    lastModified: String!
    authors: [GithubUser!]!
  }
`;
