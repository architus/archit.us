import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "react-bootstrap";
import Links from "components/Header/Links";
import SessionControl from "components/Header/SessionControl";
import { Link as RouterLink } from "components/Router";

import LogoSvg from "assets/logo.inline.svg";
import "./style.scss";

function Header({ children, noContainer = false, noLinks = false, ...rest }) {
  return (
    <Navbar
      expand="md"
      variant="dark"
      collapseOnSelect
      {...rest}
      sticky={"top"}
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
  noLinks: PropTypes.bool
};

const Brand = props => (
  <RouterLink className="nav-link brand" to="/" {...props}>
    <div dangerouslySetInnerHTML={{ __html: LogoSvg }} />
  </RouterLink>
);

Header.Brand = Brand;
