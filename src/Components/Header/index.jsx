import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "react-bootstrap";
import Links from "Components/Header/Links";
import SessionControl from "Components/Header/SessionControl";
import { Link as RouterLink } from "Components/Router";

import LogoSvg from "Assets/logo.inline.svg";
import "./style.scss";

function Header({
  children,
  noContainer = false,
  noLinks = false,
  sticky = true,
  ...rest
}) {
  return (
    <Navbar
      expand="md"
      variant="dark"
      collapseOnSelect
      {...rest}
      sticky={sticky ? "top" : null}
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
}

export default Header;

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  noContainer: PropTypes.bool,
  noLinks: PropTypes.bool,
  sticky: PropTypes.bool
};

const Brand = props => (
  <RouterLink className="nav-link brand" to="/" {...props}>
    <div dangerouslySetInnerHTML={{ __html: LogoSvg }} />
  </RouterLink>
);

Header.Brand = Brand;
