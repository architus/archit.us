import { Option, None } from "@architus/lib/option";

import { GithubMetadata } from "../github-metadata";

export function useGithubMetadata(): Option<GithubMetadata> {
  return None;
}
