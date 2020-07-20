import styled, { css, useColorMode } from "@xstyled/emotion";
import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import useDarkMode from "use-dark-mode";

import Header from "@app/components/Header";
import Icon from "@app/components/Icon";
import Switch from "@app/components/Switch";
import { Color, ColorMode, useThemeColor } from "@app/theme";
import { isNil } from "@app/utility";
import { StyleObject } from "@app/utility/types";

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
  const siteName = process.env.SITE_NAME ?? "Architus";
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
      <Helmet>
        <title>{builtTitle}</title>
        <meta property="og:title" content={builtTitle} />
      </Helmet>
      {children}
    </Styled.Layout>
  );
};

export default Layout;
