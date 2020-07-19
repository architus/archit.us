import { FooterProps } from "@architus/facade/components/Footer";

export function useFooterData(): Pick<FooterProps, "links" | "about"> {
  return {
    links: [],
    about: "__about__",
  };
}
