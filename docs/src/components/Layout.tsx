import React, { useState } from "react";
import { styled } from "linaria/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { css } from "linaria";

import Header from "@docs/components/Header";
import SideNav from "@docs/components/SideNav";
import Footer from "@docs/components/Footer";
import { gap, down } from "@design/theme";

// Set global site padding
export const global = css`
  :global() {
    body {
      --site-padding: ${gap.milli};
      ${down("md", `--site-padding: ${gap.nano};`)}
    }
  }
`;

// Move out of styled to use as selector
const Drawer = styled.div``;
const DrawerExpander = styled.div``;

const Styled = {
  Drawer,
  DrawerExpander,
  Layout: styled.div<{ drawerVisible: boolean }>``,
  DrawerOverlay: styled.div``,
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
        <Styled.DrawerOverlay />
        <Styled.Content>
          <div>{children}</div>
          <Footer />
        </Styled.Content>
      </Styled.Layout>
    </>
  );
};

export default Layout;
