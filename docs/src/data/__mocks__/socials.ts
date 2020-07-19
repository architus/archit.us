import { None } from "@architus/lib/option";

import { Socials } from "../socials";

export function useSocials(): Socials {
  return {
    discord: None,
    github: None,
  };
}
