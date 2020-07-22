import { Option, None } from "@architus/lib/option";

export interface SEOData {
  pathPrefix: Option<string>;
  title: Option<string>;
  description: Option<string>;
  author: Option<string>;
  themeColor: Option<string>;
  msTileColor: Option<string>;
}

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
