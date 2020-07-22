import { Option, None } from "@architus/lib/option";

export interface GithubMetadata {
  owner: string;
  name: string;
  docsRoot: string;
  branch: string;
}

export function useGithubMetadata(): Option<GithubMetadata> {
  return None;
}
