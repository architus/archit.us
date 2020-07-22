import { None, Option } from "@architus/lib/option";

export interface ApiVersions {
  rest: Option<string>;
  gateway: Option<string>;
}

export function useApiVersions(): ApiVersions {
  return {
    rest: None,
    gateway: None,
  };
}
