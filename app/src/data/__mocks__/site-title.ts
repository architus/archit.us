import { SiteTitle } from "../site-title";
import { None } from "@architus/lib/option";

export function useSiteTitle(): SiteTitle {
  return {
    title: "Documentation",
    version: None,
  };
}
