import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./Header.scss";

function Header(props) {
  return (
    <Navbar expand="md" bg="primary" variant="dark" collapseOnSelect {...props}>
      <div className="container">
        <span className="navbar-brand">aut-bot</span>
        <Navbar.Toggle aria-controls="collapse-links" />
        <Navbar.Collapse id="collapse-links">
          <ul className="navbar-nav">
            <Link to="/" exact>Login</Link>
            <Link to="/home">Home</Link>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

const Link = ({ to, children, ...rest }) => {
  return (
    <li className="nav-item">
      <NavLink to={to} className="nav-link" activeClassName="active" {...rest}>
        {children}
      </NavLink>
    </li>
  );
};

export default Header;
