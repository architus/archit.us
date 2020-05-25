import React, { useCallback, useEffect } from "react";
import { Head } from "react-static";
import styled, { css, useColorMode } from "@xstyled/emotion";
import {
  Color,
  ColorMode,
  useThemeColor,
  safariTabColor,
  applicationThemeColor,
  windowsTileColor,
} from "Theme";
import useDarkMode from "use-dark-mode";
import { isNil, withBasePath } from "Utility";
import { StyleObject } from "Utility/types";
import Header from "Components/Header";
import Switch from "Components/Switch";
import Icon from "Components/Icon";
import { siteName, description } from "meta.json";

const Styled = {
  Layout: styled.div<{ noHeader: boolean }>`
    ${(props): string =>
      !props.noHeader
        ? css`
            display: flex;
            min-height: 100vh;
            flex-direction: column;

            & > nav {
              flex-grow: 0;
            }

            & > *:not(nav) {
              flex-grow: 1;
            }
          `
        : ""}
  `,
};

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  headerChildren?: React.ReactNode;
  style?: StyleObject;
  noHeader?: boolean;
  sticky?: boolean;
} & Partial<React.ComponentProps<typeof Header>>;

/**
 * Root layout component, handling site title and rendering the header/dark mode switch
 */
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

  // Dark mode control hooks
  const { value, toggle } = useDarkMode(false);
  const [colorMode, setColorMode] = useColorMode();
  const toggleWrapper = useCallback(
    (checked: boolean) => {
      setColorMode(checked ? ColorMode.Dark : ColorMode.Light);
      toggle();
    },
    [setColorMode, toggle]
  );

  // Attempt to maintain consistency between the two systems during the migration from
  // sass to xstyled/emotion
  useEffect(() => {
    const isDark = colorMode === ColorMode.Dark;
    if (isDark !== value) {
      setColorMode(value ? ColorMode.Dark : ColorMode.Light);
    }
  });

  // Get the string representations of the current colors
  const primaryColor = Color(useThemeColor("primary")[0]);
  const lightHex = Color(useThemeColor("light")[0]).toString("hex");

  return (
    <Styled.Layout noHeader={noHeader} className={className} style={style}>
      {!noHeader && (
        <Header sticky={sticky} {...rest}>
          {headerChildren}
          {typeof window === "undefined" ? null : (
            <Switch
              boxProps={{ mr: { xs: "nano", md: "micro" } }}
              onChange={toggleWrapper}
              checked={value}
              aria-label="Dark mode switch"
              uncheckedIcon={<Icon name="sun" color="dark" />}
              checkedIcon={<Icon name="moon" color="light" />}
              offHandleColor={lightHex}
              onHandleColor={lightHex}
              offColor={primaryColor.clone().lighten(35).toString("hex")}
              onColor={primaryColor.clone().darken(30).toString("hex")}
              height={28}
              width={56}
            />
          )}
        </Header>
      )}
      <Head>
        <title>{builtTitle}</title>
        <meta property="og:title" content={builtTitle} />
      </Head>
      {children}
    </Styled.Layout>
  );
};

export default Layout;

/**
 * SEO component that adds all relevant meta tags to the page via `react-helmet`
 */
export const SEO: React.FC = () => (
  <Head>
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
  </Head>
);
