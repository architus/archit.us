import React from "react";
import PropTypes from "prop-types";
import { isNil } from "utility";
import { siteName, description } from "global.json";

import { Head } from "react-static";

function Layout({ title, children }) {
  const builtTitle = isNil(title) ? siteName : `${siteName} | ${title}`;
  return (
    <>
      <Head>
        <title>{builtTitle}</title>
        <meta property="og:title" content={builtTitle} />
      </Head>
      {children}
    </>
  );
}

export default Layout;

Layout.propTypes = {
  title: PropTypes.string
};

export function SEO() {
  return (
    <Head>
      {/* Web crawler tags */}
      <meta name="robots" content="index, follow" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      {/* Social media */}
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/img/card.png" />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="description" content={description} />
      {/* Misc. display meta */}
      <meta name="theme-color" content="#2b5797" />
      <link rel="mask-icon" color="#6192be" href="/safari-pinned-tab.svg" />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/android-chrome-256x256.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/android-chrome-512x512.png"
      />
      <link
        href="/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link href="/favicon.ico" rel="icon" type="image/x-icon" />
      <link
        rel="icon"
        type="image/png"
        size="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        size="16x16"
        href="/favicon-16x16.png"
      />
    </Head>
  );
}
