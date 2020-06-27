import { Link } from "gatsby";
import React from "react";
import { css } from "linaria";
import { styled } from "linaria/react";

import Logo from "@design/components/Logo";
import { color, gap, transition } from "@design/theme";
import HeaderLinks from "@docs/components/HeaderLinks";
import HeaderActionBar from "@docs/components/HeaderActionBar";

const logoLink = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 21px 5px;
  background-color: transparent;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  transition-property: opacity;
  text-decoration: none;
  color: white;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const logo = css`
  fill: currentColor;
`;

const Styled = {
  Header: styled.nav`
    background-color: #6496c4;
    color: white;
    height: 58px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  `,
  SiteTitle: styled.h1`
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 13px;
  `,
  RightComponents: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
  `,
};

/**
 * Site header, including navigation links and an action bar on the right side
 */
const Header: React.FC<{ siteTitle: string }> = ({
  siteTitle = "Documentation",
}) => (
  <Styled.Header>
    <Link to="/" className={logoLink}>
      <Logo.Symbol height={36} className={logo} />
      <Styled.SiteTitle>{siteTitle}</Styled.SiteTitle>
    </Link>
    <HeaderLinks />
    <Styled.RightComponents>
      <HeaderActionBar />
    </Styled.RightComponents>
  </Styled.Header>
);

export default Header;
