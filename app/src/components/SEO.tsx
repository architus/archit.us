import React from "react";
import { Helmet } from "react-helmet";

import { description } from "@app/meta.json";
import {
  safariTabColor,
  applicationThemeColor,
  windowsTileColor,
} from "@app/theme";
import { withBasePath } from "@app/utility";

/**
 * SEO component that adds all relevant meta tags to the page via `react-helmet`
 */
const SEO: React.FC = () => (
  <Helmet>
    {/* Web crawler tags */}
    <meta name="robots" content="index, follow" />
    <link
      rel="sitemap"
      type="application/xml"
      href={withBasePath("/sitemap.xml")}
    />
    {/* PWA */}
    <link rel="manifest" href={withBasePath("/manifest.json")} />
    {/* Social media */}
    <meta property="og:type" content="website" />
    <meta property="og:image" content={withBasePath("/img/card.png")} />
    <meta property="og:description" content={description} />
    <meta name="twitter:card" content="summary" />
    <meta name="description" content={description} />
    {/* Misc. display meta */}
    <meta name="theme-color" content={applicationThemeColor} />
    <link
      rel="mask-icon"
      color={safariTabColor}
      href={withBasePath("/safari-pinned-tab.svg")}
    />
    <meta name="msapplication-TileColor" content={windowsTileColor} />
    <meta
      name="msapplication-config"
      content={withBasePath("/browserconfig.xml")}
    />
    {/* Favicons */}
    <link
      rel="apple-touch-icon"
      sizes="192x192"
      href={withBasePath("/android-chrome-192x192.png")}
    />
    <link
      rel="apple-touch-icon"
      sizes="256x256"
      href={withBasePath("/android-chrome-256x256.png")}
    />
    <link
      rel="apple-touch-icon"
      sizes="512x512"
      href={withBasePath("/android-chrome-512x512.png")}
    />
    <link
      href={withBasePath("/apple-touch-icon.png")}
      rel="apple-touch-icon"
      sizes="180x180"
    />
    <link href={withBasePath("/favicon.ico")} rel="icon" type="image/x-icon" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={withBasePath("/favicon-32x32.png")}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={withBasePath("/favicon-16x16.png")}
    />
  </Helmet>
);

export default SEO;
