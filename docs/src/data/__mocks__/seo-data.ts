import { SEOData } from "../seo-data";
import { None } from "@architus/lib/option";

export function useSEOData(): SEOData {
  return {
    pathPrefix: None,
    title: None,
    description: None,
    author: None,
    themeColor: None,
    msTileColor: None,
  };
}
