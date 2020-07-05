import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FaGithub, FaDiscord } from "react-icons/fa";

import { FooterLink, FooterProps } from "@design/components/Footer";
import { isNil } from "@lib/utility";

/**
 * Gets the footer data from the site config
 */
export function useFooterData(): Pick<FooterProps, "links" | "about"> {
  const data = useStaticQuery<GatsbyTypes.SiteLayoutQuery>(graphql`
    query SiteLayout {
      site {
        siteMetadata {
          footer {
            about
            links {
              text
              href
              icon
            }
          }
        }
      }
    }
  `);

  // Transform footer links & resolve icons
  const footerLinks: FooterLink[] = useMemo(
    () =>
      data?.site?.siteMetadata?.footer?.links?.map((link) => {
        if (isNil(link)) return { text: "", href: "" };
        const { text, href, icon } = link;
        let resolvedIcon: React.ReactNode;
        switch (icon) {
          case "github":
            resolvedIcon = <FaGithub />;
            break;
          case "discord":
            resolvedIcon = <FaDiscord />;
            break;
        }
        return {
          text: text ?? "",
          href: href ?? "",
          icon: resolvedIcon,
        };
      }) ?? [],
    [data]
  );

  return {
    about: data?.site?.siteMetadata?.footer?.about ?? null,
    links: footerLinks,
  };
}
