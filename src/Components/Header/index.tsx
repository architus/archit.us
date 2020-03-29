import React from "react";
import { Navbar } from "react-bootstrap";
import Links from "Components/Header/Links";
import SessionControl from "Components/Header/SessionControl";
import { Link } from "Components";
import { LinkProps } from "Components/Router";
import LogoSvg from "Assets/logo.inline.svg";
import { attach } from "Utility";
import "./style.scss";

type HeaderProps = {
  children?: React.ReactNode;
  noContainer?: boolean;
  noLinks?: boolean;
  sticky?: boolean;
} & Omit<Partial<React.ComponentProps<typeof Navbar>>, "sticky">;

const Header: React.FC<HeaderProps> = ({
  children,
  noContainer = false,
  noLinks = false,
  sticky = true,
  ...rest
}) => (
  <Navbar
    expand="md"
    variant="dark"
    collapseOnSelect
    sticky={sticky ? "top" : undefined}
    {...rest}
  >
    <div className={noContainer ? "container-fluid" : "container"}>
      <Brand />
      <Navbar.Toggle aria-controls="collapse-links" />
      <Navbar.Collapse id="collapse-links">
        {noLinks ? null : <Links className="mr-auto" />}
        <div className="header-children">
          {children}
          <SessionControl />
        </div>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

type BrandProps = Partial<LinkProps>;

const Brand: React.FC<BrandProps> = props => (
  <Link {...props} className="nav-link brand" to="/">
    <div dangerouslySetInnerHTML={{ __html: LogoSvg }} />
  </Link>
);

export default attach(Header, { Brand });
