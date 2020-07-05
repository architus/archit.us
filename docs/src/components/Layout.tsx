import React, { useState } from "react";
import { styled } from "linaria/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { css } from "linaria";

import Header from "@docs/components/Header";
import SideNav from "@docs/components/SideNav";
import Footer, { FooterContent } from "@design/components/Footer";
import SEO from "@docs/components/SEO";
import {
  headerHeight,
  minimizeBreakpoint,
  collapseBreakpoint,
  sitePaddingVariable,
  contentWidthVariable,
  sitePadding,
  contentWidth,
  fullDrawerWidth,
  minimizedDrawerWidth,
} from "@docs/layout";
import {
  gap,
  blankButton,
  down,
  transition,
  ZIndex,
  shadow,
  color,
  up,
  mediaMaxWidth,
  scrollBarAuto,
  mode,
  ColorMode,
  between,
} from "@design/theme";
import CompositeBrand from "@docs/components/CompositeBrand";
import SecondaryFooter from "@docs/components/SecondaryFooter";
import { useFooterData } from "@docs/data/footer";

export const global = css`
  :global() {
    /* Set global site padding */
    body {
      ${`${sitePaddingVariable}: ${gap.milli};`}
      ${down("sm")} {
        ${`${sitePaddingVariable}: ${gap.nano};`}
      }

      ${`${contentWidthVariable}: 1080px;`}
      overflow-x: hidden;
    }

    #gatsby-focus-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  }
`;

const Drawer = styled.div`
  height: 100%;
  width: ${fullDrawerWidth};
  position: fixed;
  z-index: ${ZIndex.Drawer};
  padding-top: ${headerHeight};
  top: 0;
  left: 0;

  border-right: 1px solid ${color("contrastBorder")};
  ${mode(ColorMode.Light)} {
    background-color: ${color("bg-10")};
  }
  ${mode(ColorMode.Dark)} {
    background-color: ${color("bg+10")};
    box-shadow: ${shadow("z1")};
  }

  ${scrollBarAuto()}
  overflow-x: hidden;
  overflow-y: auto;

  ${transition(["transform"])}
  transform: none;

  ${down(minimizeBreakpoint)} {
    width: ${minimizedDrawerWidth};
  }

  ${down(collapseBreakpoint)} {
    height: 100%;
    width: ${fullDrawerWidth};
  }

  ${mediaMaxWidth(fullDrawerWidth)} {
    width: 100%;
  }
`;
const DrawerOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  content: " ";
  z-index: ${ZIndex.ModalOverlay};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: default !important;
  background-color: rgba(0, 0, 0, 0.5);

  ${transition(["opacity"])};
  opacity: 0;
  pointer-events: none;
`;

const Styled = {
  ContentExpand: styled.div`
    flex-grow: 1;
  `,
  Drawer,
  DrawerOverlay,
  DrawerExpander: styled.div`
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;

    ${up(collapseBreakpoint)} {
      display: none;
    }

    --size: 48px;
    --offset: 24px;
    button {
      ${blankButton()}
      pointer-events: all;
      position: fixed;
      bottom: var(--offset);
      right: var(--offset);
      width: var(--size);
      height: var(--size);
      background-color: ${color("primary")};
      border-radius: 20rem;
      color: white;
      z-index: ${ZIndex.Modal};
      box-shadow: ${shadow("z2")};
      font-size: 1.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
  Layout: styled.div<{ drawerVisible: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: auto;
    position: relative;
    flex-grow: 1;
    overflow-x: auto;

    ${down("md")} {
      ${DrawerOverlay} {
        pointer-events: ${(p): string =>
          p.drawerVisible ? "default" : "none"};
        opacity: ${(p): number => (p.drawerVisible ? 1 : 0)};
      }

      ${Drawer} {
        transform: ${(p): string =>
          p.drawerVisible ? "translateX(0)" : "translateX(-100%)"};
      }
    }
  `,
  Content: styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-top: ${headerHeight};

    & > * {
      padding-left: ${sitePadding};
      padding-right: ${sitePadding};
    }

    ${FooterContent} {
      max-width: ${contentWidth};
    }

    ${up(minimizeBreakpoint)} {
      margin-left: ${fullDrawerWidth};
      max-width: calc(100% - ${fullDrawerWidth});
    }

    ${between(collapseBreakpoint, minimizeBreakpoint)} {
      margin-left: ${minimizedDrawerWidth};
      max-width: calc(100% - ${minimizedDrawerWidth});
    }

    ${down(collapseBreakpoint)} {
      margin-left: 0;
      max-width: 100%;
    }
  `,
};

type LayoutProps = {
  /**
   * ID of the currently active NavigationTree root node to use to display on
   * the left side
   */
  activeNavRoot?: string;
  lead?: string;
  title?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Layout: React.FC<LayoutProps> = ({
  activeNavRoot,
  title,
  description,
  className,
  style,
  children,
}) => {
  // Ignored on large screens (always visible)
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <Styled.Layout drawerVisible={drawerVisible}>
        <Styled.Drawer>
          <SideNav activeNavRoot={activeNavRoot} />
        </Styled.Drawer>
        <Styled.DrawerExpander>
          <button onClick={(): void => setDrawerVisible(!drawerVisible)}>
            {drawerVisible ? <FaTimes /> : <FaBars />}
          </button>
        </Styled.DrawerExpander>
        <Styled.DrawerOverlay onClick={(): void => setDrawerVisible(false)} />
        <Styled.Content>
          <Styled.ContentExpand className={className} style={style}>
            {children}
          </Styled.ContentExpand>
          <Footer brand={<CompositeBrand showVersion />} {...useFooterData()} />
          <SecondaryFooter />
        </Styled.Content>
      </Styled.Layout>
    </>
  );
};

export default Layout;
