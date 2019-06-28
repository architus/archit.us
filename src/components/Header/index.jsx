import React from "react";

import { Navbar } from "react-bootstrap";
import Links from "./Links";
import SessionControl from "./SessionControl";
import { NavLink as RouterLink } from "react-router-dom";

import "./style.scss";

function Header(props) {
  return (
    <Navbar
      expand="md"
      bg="primary"
      variant="dark"
      collapseOnSelect
      {...props}
      sticky={"top"}
    >
      <div className="container">
        <Brand />
        <Navbar.Toggle aria-controls="collapse-links" />
        <Navbar.Collapse id="collapse-links">
          <Links className="mr-auto" />
          <SessionControl />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;

const Brand = props => (
  <RouterLink className="nav-link brand" to="/" exact {...props}>
    aut-bot
  </RouterLink>
);

Header.Brand = Brand;
