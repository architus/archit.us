import React from "react";
import { isNil } from "Utility";
import { StyleObject } from "Utility/types";
import { siteName, description } from "global.json";
import classNames from "classnames";
import { Header } from "Components";
import { Head } from "react-static";
import "./style.scss";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  headerChildren?: React.ReactNode;
  style?: StyleObject;
  noHeader?: boolean;
  sticky?: boolean;
} & Partial<React.ComponentProps<typeof Header>>;

const Layout: React.FC<LayoutProps> = ({
  title = null,
  children = null,
  className = "",
  headerChildren = null,
  style = {},
  noHeader = false,
  sticky = true,
  ...rest
}) => {
  const builtTitle = isNil(title) ? siteName : `${siteName} | ${title}`;
  return (
    <div
      className={classNames("layout", className, { "with-header": !noHeader })}
      style={style}
    >
      {noHeader ? null : (
        <Header sticky={sticky} {...rest}>
          {headerChildren}
        </Header>
      )}
      <Head>
        <title>{builtTitle}</title>
        <meta property="og:title" content={builtTitle} />
      </Head>
      {children}
    </div>
  );
};

export default Layout;

export const SEO: React.FC = () => (
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
    <meta name="theme-color" content="#6496C4" />
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
    <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
    <link href="/favicon.ico" rel="icon" type="image/x-icon" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  </Head>
);
