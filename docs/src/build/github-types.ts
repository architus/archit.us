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
  authors: Array<GithubUser>;
};
export const historyType = `
  type History @dontInfer {
    lastModified: String!
    authors: [GithubUser!]!
  }
`;
