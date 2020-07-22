import React from "react";
import { Helmet } from "react-helmet";

import { Option } from "@architus/lib/option";
import { useSEOData } from "@app/data/seo-data";
import { withPathPrefix } from "@architus/lib/path";

export type SEOProps = {
  description?: string;
  title?: string;
  meta?: React.ComponentProps<typeof Helmet>["meta"];
  lang?: string;
};

const SEO: React.FC<SEOProps> = ({ description, meta, title, lang = `en` }) => {
  const seoData = useSEOData();
  const author = seoData.author.getOrElse("");
  const themeColor = seoData.themeColor.getOrElse("#ff00ff");
  const msTileColor = seoData.themeColor.getOrElse("#ff00ff");
  const siteTitle = seoData.title.getOrElse("Documentation");
  const derivedTitle = Option.from(title)
    .map((t) => `${t} | ${siteTitle}`)
    .getOrElse(siteTitle);
  const metaDescription = Option.from(description)
    .or(seoData.description)
    .getOrElse("");
  const pathPrefix = (base: string): string =>
    withPathPrefix(base, seoData.pathPrefix.orUndefined());

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={derivedTitle}
      meta={[
        {
          httpEquiv: "Content-Type",
          content: "text/html; charset=UTF-8",
        },
        // Misc. display meta
        {
          name: "msapplication-square150x150logo",
          content: pathPrefix("/img/mstile-150x150.png"),
        },
        {
          name: "msapplication-config",
          content: "none",
        },
        {
          name: "msapplication-TileColor",
          content: msTileColor,
        },
        // Open Graph (Facebook)
        {
          property: "og:type",
          content: "website",
        },
        {
          property: `og:title`,
          content: derivedTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: "og:image",
          content: pathPrefix("/img/logo_hex.png"),
        },
        {
          property: `og:site_name`,
          content: siteTitle,
        },
        // Twitter
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: derivedTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        // Other
        {
          name: `description`,
          content: metaDescription,
        },
        // Web crawler
        // Disable indexing for staging
        ...(process.env.GATSBY_PUBLIC === "true"
          ? [
              {
                name: "robots",
                content: "index, follow",
              },
            ]
          : [
              {
                name: `robots`,
                content: `noindex`,
              },
            ]),
        ...(meta ?? []),
      ]}
      link={[
        // Favicons
        {
          rel: "mask-icon",
          color: themeColor,
          href: pathPrefix("/img/safari-pinned-tab.svg"),
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: pathPrefix("/img/apple-touch-icon.png"),
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: pathPrefix("/img/favicon-32x32.png"),
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: pathPrefix("/img/favicon-16x16.png"),
        },
        {
          rel: "shortcut icon",
          href: pathPrefix("/img/favicon.ico"),
        },
      ]}
    />
  );
};

export default SEO;
