import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div className="container-fluid header-container">
      <text>aut-bot</text>
      <div className="header-item">
        <Link to="/">Login</Link>
      </div>
      <div className="header-item">
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
}

export default Header;
