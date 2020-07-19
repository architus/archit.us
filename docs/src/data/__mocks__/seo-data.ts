import { None } from "@architus/lib/option";

import { SEOData } from "../seo-data";

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
