import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import { isDefined } from "@lib/utility";
import { withPathPrefix } from "@docs/site";

type SEOProps = {
  description?: string;
  title?: string;
  meta?: React.ComponentProps<typeof Helmet>["meta"];
  lang?: string;
};

const SEO: React.FC<SEOProps> = ({ description, meta, title, lang = `en` }) => {
  type SEOQueryResult = {
    site: {
      pathPrefix: string | null;
      siteMetadata: {
        title: string;
        description: string;
        author: string;
        themeColor: string;
        msTileColor: string;
      };
    };
  };

  const { site } = useStaticQuery<SEOQueryResult>(
    graphql`
      query SEOQuery {
        site {
          pathPrefix
          siteMetadata {
            title
            description
            author
            themeColor
            msTileColor
          }
        }
      }
    `
  );

  const { author, themeColor, msTileColor } = site.siteMetadata;
  const siteTitle = site.siteMetadata.title;
  const derivedTitle = isDefined(title) ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description ?? site.siteMetadata.description;
  const pathPrefix = (base: string): string =>
    withPathPrefix(site.pathPrefix, base);

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
          property: `og:description`,
          content: metaDescription,
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
