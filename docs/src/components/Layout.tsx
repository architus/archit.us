import React, { useState } from "react";
import { styled } from "linaria/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { css } from "linaria";

import Header from "@docs/components/Header";
import SideNav from "@docs/components/SideNav";
import Footer from "@docs/components/Footer";
import { gap, down, transition, ZIndex } from "@design/theme";

export const global = css`
  :global() {
    /* Set global site padding */
    body {
      --site-padding: ${gap.milli};
      ${down("md", `--site-padding: ${gap.nano};`)}
    }

    #gatsby-focus-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  }
`;

// $collapse-breakpoint: md;
// $minimize-breakpoint: lg;
// $full-width: 325px;
// $minimized-width: 285px;
// .docs-root {

//   $this: &;
//   position: relative;

//   & > * {
//       pointer-events: initial;
//   }

//   &--overlay-button {
//       @extend %button-blank;
//       @include transitions("opacity");
//       padding: 0 !important;
//       opacity: 0;
//       position: absolute;
//       height: 100%;
//       width: 100%;
//       content: " ";
//       z-index: 1000;
//       top: 0;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       background-color: rgba(black, 0.5);
//       pointer-events: none;
//       cursor: default !important;
//   }

//   @include respond-below($collapse-breakpoint) {
//       &.show-drawer {
//           #{$this}--overlay-button {
//               pointer-events: initial;
//               opacity: 1;
//           }

//           #{$this}--nav {
//               transform: translateX(0);
//               opacity: 1;
//           }
//       }
//   }

//   &--main {
//       flex-grow: 1;
//       display: flex;
//       flex-direction: column;

//       & > *:not(.footer) {
//           flex-grow: 1;

//           @include respond-above($collapse-breakpoint) {
//               padding-left: 1.5rem;
//           }
//       }

//       & > .footer {
//           flex-grow: 0;
//       }

//       @include respond-above($minimize-breakpoint) {
//           margin-left: $full-width;
//           max-width: calc(100% - #{$full-width});
//       }

//       @include respond-between($collapse-breakpoint, $minimize-breakpoint) {
//           margin-left: $minimized-width;
//           max-width: calc(100% - #{$minimized-width});
//       }

//       @include respond-below($collapse-breakpoint) {
//           margin-left: 0;
//           max-width: 100%;
//       }
//   }

//   &--nav {
//       @extend %custom-scrollbar;
//       @include transitions("transform, opacity");

//       height: 100%;
//       width: $full-width;
//       position: fixed;
//       z-index: 1;
//       top: 0;
//       left: 0;
//       padding-top: 60px;

//       @include dark-bg($dark-250);
//       @include light-bg($light-300);
//       @include dark-border(transparent, $side: right);
//       @include light-border($light-200, $side: right);

//       @include dark {
//           box-shadow: $drop-shadow;
//       }

//       overflow-x: hidden;
//       overflow-y: auto;

//       @include respond-below($minimize-breakpoint) {
//           width: $minimized-width;
//       }

//       @include respond-below($collapse-breakpoint) {
//           height: 100%;
//           z-index: 1010;
//           transform: translateX(-100%);
//           opacity: 0;
//           width: $full-width;
//       }

//       @media (max-width: $full-width) {
//           width: 100%;
//       }
//   }
// }

// .drawer-expand {
//   position: absolute;
//   display: block;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   pointer-events: none;

//   @include respond-above($collapse-breakpoint) {
//       display: none !important;
//   }

//   &--button {
//       $size: 56px;
//       @extend %button-blank;
//       pointer-events: all;
//       position: fixed;
//       bottom: 24px;
//       right: 24px;
//       width: $size;
//       height: $size;
//       background-color: $-primary;
//       border-radius: 20rem;
//       color: white;
//       z-index: 20000;
//       box-shadow: $drop-shadow;

//       span {
//           position: relative;
//           top: -1px;
//       }
//   }
// }

// Move out of styled to use as selector
const Drawer = styled.div``;
const DrawerExpander = styled.div``;
const DrawerOverlay = styled.div`
  outline: none !important;
  border: none;
  background-color: none;
  padding: 0 !important;

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
  Drawer,
  DrawerExpander,
  DrawerOverlay,
  Layout: styled.div<{ drawerVisible: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: auto;
    position: relative;
    flex-grow: 1;

    ${DrawerOverlay} {
      --p-events: ${(p): string => (p.drawerVisible ? "default" : "none")};
      --opacity: ${(p): number => (p.drawerVisible ? 1 : 0)};
      ${down(
        "md",
        `
          pointer-events: var(--p-events);
          opacity: var(--opacity);
        `
      )}
    }
  `,
  Content: styled.main``,
};

const Layout: React.FC = ({ children }) => {
  // Ignored on large screens (always visible)
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <>
      <Header />
      <Styled.Layout drawerVisible={drawerVisible}>
        <Styled.Drawer>
          <SideNav />
        </Styled.Drawer>
        <Styled.DrawerExpander>
          <button onClick={(): void => setDrawerVisible(!drawerVisible)}>
            {drawerVisible ? <FaTimes /> : <FaBars />}
          </button>
        </Styled.DrawerExpander>
        <Styled.DrawerOverlay onClick={(): void => setDrawerVisible(false)} />
        <Styled.Content>
          <div>{children}</div>
          <Footer />
        </Styled.Content>
      </Styled.Layout>
    </>
  );
};

export default Layout;
