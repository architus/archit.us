import React, { useCallback, useEffect } from "react";
import { Head } from "react-static";
import tinycolor from "tinycolor2";
import styled, { css, useColorMode, useTheme } from "@xstyled/emotion";
import { ColorMode } from "Theme/tokens";
import useDarkMode from "use-dark-mode";
import { isNil, isDefined } from "Utility";
import { StyleObject } from "Utility/types";
import { siteName, description } from "global.json";
import { Switch, Icon, Header } from "Components";
import { Option, Some, None } from "Utility/option";

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

const CSS_VARIABLE_REGEX = /^var\(--[a-zA-Z0-9-]+,\s*(.*)\s*\)$/g;

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

  // Dark mode control hooks
  const { value, toggle } = useDarkMode(true);
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

  const theme = useTheme();
  const { primary, light } = theme.colors;
  const primaryColor = tinycolor(
    parseThemeColor(primary).getOrElse("aliceblue")
  );
  const lightHex = tinycolor(
    parseThemeColor(light).getOrElse("white")
  ).toString("hex");

  return (
    <Styled.Layout noHeader={noHeader} className={className} style={style}>
      {!noHeader && (
        <Header sticky={sticky} {...rest}>
          {headerChildren}
          {typeof window === "undefined" ? null : (
            <Switch
              onChange={toggleWrapper}
              checked={value}
              className="ml-3 ml-md-0 mr-md-3"
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

function parseThemeColor(themeColor: string): Option<string> {
  const matches = CSS_VARIABLE_REGEX.exec(themeColor);
  if (isDefined(matches)) {
    return Some(matches[0]);
  }

  return None;
}
