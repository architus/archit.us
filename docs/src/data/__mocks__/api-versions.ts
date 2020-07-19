import { None } from "@architus/lib/option";

import { ApiVersions } from "../api-versions";

export function useApiVersions(): ApiVersions {
  return {
    rest: None,
    gateway: None,
  };
}
