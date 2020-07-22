import { Option, None } from "@architus/lib/option";

export interface SiteTitle {
  title: string;
  version: Option<string>;
}

export function useSiteTitle(): SiteTitle {
  return {
    title: "Documentation",
    version: None,
  };
}
