import { useColorMode as useEmotionColorMode } from "@xstyled/emotion";
import { styled } from "linaria/react";
import { darken } from "polished";
import React, { useCallback, useEffect, useContext } from "react";
import { BsMoon } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
import useDarkMode from "use-dark-mode";

import { StyledFooters } from "@app/components/Footers";
import Header from "@app/components/Header";
import SEO, { SEOProps } from "@app/components/SEO";
import Switch from "@app/components/Switch";
import { headerHeight } from "@app/layout";
import {
  Color,
  ColorMode,
  ColorModeContext,
  dynamicColor,
  hybridColor,
  color,
} from "@architus/facade/theme/color";

const Styled = {
  Layout: styled.div`
    ${StyledFooters} {
      flex-grow: 0 !important;
    }

    &[data-no-header="false"] {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      padding-top: ${headerHeight};

      & > nav {
        flex-grow: 0;
      }

      & > *:not(nav) {
        flex-grow: 1;
      }
    }
  `,
  Switch: styled(Switch)`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  UncheckedIcon: styled(IoMdSunny)`
    color: ${darken(0.35, dynamicColor("primary", ColorMode.Dark))};
  `,
  CheckedIcon: styled(BsMoon)`
    color: ${color("light")};
  `,
};

export type LayoutProps = {
  seo?: SEOProps;
  children?: React.ReactNode;
  headerChildren?: React.ReactNode;
  noHeader?: boolean;
  style?: React.CSSProperties;
  className?: string;
} & Partial<React.ComponentProps<typeof Header>>;

/**
 * Root layout component, handling site title and rendering the header/dark mode switch
 */
const Layout: React.FC<LayoutProps> = ({
  seo = {},
  children = null,
  headerChildren = null,
  noHeader = false,
  className,
  style,
  ...rest
}) => {
  // Dark mode control hooks
  const { value, toggle } = useDarkMode(false);
  const [, setEmotionColorMode] = useEmotionColorMode();
  const { mode, setMode } = useContext(ColorModeContext);
  const toggleWrapper = useCallback(
    (checked: boolean) => {
      const targetMode = checked ? ColorMode.Dark : ColorMode.Light;
      setMode(targetMode);
      setEmotionColorMode(targetMode);
      toggle();
    },
    [setMode, setEmotionColorMode, toggle]
  );

  // Attempt to maintain consistency between the three systems during the migration from
  // sass/emotion to linaria
  useEffect(() => {
    const isDark = mode === ColorMode.Dark;
    if (isDark !== value) {
      const targetMode = value ? ColorMode.Dark : ColorMode.Light;
      setMode(targetMode);
      setEmotionColorMode(targetMode);
    }
  });

  // Get the string representations of the current colors
  const primaryColor = Color(hybridColor("primary", mode));
  const lightHex = Color(hybridColor("light", mode)).toString("hex");

  return (
    <Styled.Layout
      data-no-header={String(noHeader)}
      className={className}
      style={style}
    >
      <SEO {...seo} />
      {!noHeader && (
        <Header {...rest}>
          {headerChildren}
          {typeof window === "undefined" ? null : (
            <Styled.Switch
              onChange={toggleWrapper}
              checked={value}
              aria-label="Dark mode switch"
              uncheckedIcon={<Styled.UncheckedIcon />}
              checkedIcon={<Styled.CheckedIcon />}
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
      {children}
    </Styled.Layout>
  );
};

export default Layout;
