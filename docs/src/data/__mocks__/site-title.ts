import { None } from "@architus/lib/option";

import { SiteTitle } from "../site-title";

export function useSiteTitle(): SiteTitle {
  return {
    title: "Documentation",
    version: None,
  };
}
