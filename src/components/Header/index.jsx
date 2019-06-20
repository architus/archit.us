import React from "react";

import { Navbar } from "react-bootstrap";
import HeaderLinks from "../HeaderLinks";
import { NavLink as RouterLink } from "react-router-dom";

import "./style.scss";

function Header(props) {
  return (
    <Navbar expand="md" bg="primary" variant="dark" collapseOnSelect {...props}>
      <div className="container">
        <RouterLink className="nav-link navbar-brand" to="/">aut-bot</RouterLink>
        <Navbar.Toggle aria-controls="collapse-links" />
        <Navbar.Collapse id="collapse-links">
          <HeaderLinks />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
