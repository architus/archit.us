import { Option, Some } from "@architus/lib/option";

export function usePathPrefix(): Option<string> {
  return Some("/");
}
