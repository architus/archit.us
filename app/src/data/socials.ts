import { Option, None } from "@architus/lib/option";

export interface Socials {
  github: Option<string>;
  discord: Option<string>;
}

export function useSocials(): Socials {
  return {
    discord: None,
    github: None,
  };
}
