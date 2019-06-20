import React from "react";
import { Navbar } from "react-bootstrap";
import HeaderLinks from "../HeaderLinks";
import "./Header.scss";

function Header(props) {
  return (
    <Navbar expand="md" bg="primary" variant="dark" collapseOnSelect {...props}>
      <div className="container">
        <span className="navbar-brand">aut-bot</span>
        <Navbar.Toggle aria-controls="collapse-links" />
        <Navbar.Collapse id="collapse-links">
          <HeaderLinks />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
