import { ApiVersions } from "../api-versions";
import { None } from "@architus/lib/option";

export function useApiVersions(): ApiVersions {
  return {
    rest: None,
    gateway: None,
  };
}
